// 0||undefined is undefined
//but 0??undefined is 0

import React, { useState, useEffect } from 'react'
import './style.css'
import FolderTree from './components/FolderTree.jsx'
import CreateNewFolder from './components/CreateNewFolder.jsx'
import LabelledInput from './components/LabelledInput.jsx'
import FileView from './components/FileView.jsx'
import mapUrl from '../utils/mapUrl.js'
import CustomErrorView from './components/CustomErrorView.jsx'
import {
  CustomError,
  DisablingError,
  EmptyInputError,
  InputError,
} from '../utils/custom-errors'
import waitToLoad from './wait-to-load.js'
import getScrapedData from './get-scraped-data'
import fetchFilesAndFolders from './fetch-repo.js'
import determineFileName from './determine-file-name.js'
import { getQuestionName, getSubmissionSpans } from '../utils/web-scrape'
import submitAnswer from './submit-answer.js'
import InputsBlock from './components/InputsBlock.jsx'
import { storeDuration } from '../utils/duration'

const cancelIcon = mapUrl('/media/icons/cancel.svg')
const folderIcon = mapUrl('/media/icons/folder.svg')
const leftIcon = mapUrl('/media/icons/left.svg')
const rightIcon = mapUrl('/media/icons/right.svg')
const saveIcon = mapUrl('/media/icons/save.svg')
const sendIcon = mapUrl('/media/icons/send.svg')
const timeIcon = mapUrl('/media/icons/time.svg')
const tryIcon = mapUrl('/media/icons/try.svg')

function SubmitCard({ inView }) {
  const [isHidden, setIsHidden] = useState(false)
  const [fileVisible, setFileVisible] = useState(false)
  const [url, setUrl] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [hasAutoFilled, setHasAutoFilled] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [custom_Error, setCustomError] = useState(undefined)
  const [repoContent, setRepoContent] = useState({
    folderPaths: [],
    filePaths: [],
  })
  const [data, setData] = useState({
    submissions: '',
    minutes: '',
    fileName: '',
    fileExtension: '',
    folderPath: '',

    //non user inputs
    file: '',
    questionName: '',
  })

  const isDisabled = custom_Error && custom_Error instanceof DisablingError

  const validators = {
    submissions(value) {
      if (!value && value !== 0) throw new EmptyInputError('submissions')
    },
    minutes(value) {
      if (!value && value !== 0) throw new EmptyInputError('minutes')
    },

    fileName(value) {
      if (!value) throw new EmptyInputError('fileName')
      if (value.includes('/'))
        throw new InputError(`file name ${value} can't have a '/'`)
    },

    fileExtension(value) {
      if (!value) throw new EmptyInputError('fileExtension')
      if (value.includes('/'))
        throw new InputError(`fileExtension ${value} can't have a '/'`)
    },

    folderPath(value) {
      //assume bad path is prevented by FolderTree
      if (!value) throw new EmptyInputError('folderPath')
    },

    questionName(value) {
      if (!value) throw new EmptyInputError('quesionName')
      if (value.includes('/'))
        throw new InputError(`questionName ${value} can't have a '/'`)
    },

    file(value) {
      if (!value) throw new EmptyInputError('file')
    },
  }

  const updateData = (newData) => setData({ ...data, ...newData })

  //

  useEffect(() => {
    const changeUrl = (event) => setUrl(event.destination.url)
    navigation.addEventListener('navigate', changeUrl)
    return () => navigation.removeEventListener('navigate', changeUrl)
  }, [])

  //

  useEffect(() => {
    if (!hasAutoFilled) return
    setCustomError(undefined)

    for (const name in data) {
      if (name === 'folderPath') continue
      try {
        validators[name](data[name]) //validate
      } catch (error) {
        if (error instanceof CustomError) setCustomError(error)
        else throw name
      }
    }
  }, [data, url])

  //

  useEffect(() => {
    if (!inView) return
    if (hasSubmitted) return

    let collectedData = {}
    let collectedRepo = {}

    const scrape = async () => {
      await waitToLoad()
      await Promise.all([
        getScrapedData().then((data) => (collectedData = data)),
        fetchFilesAndFolders().then((content) => (collectedRepo = content)),
      ])

      collectedData.fileName = determineFileName(collectedRepo.filePaths)

      //To not loose the keys, used to validate all inputs later
      collectedData = { ...copyWithEmptyStrings(data), ...collectedData }

      setData(collectedData)
      setRepoContent(collectedRepo)
      setHasAutoFilled(true)
      setIsLoading(false)
    }

    scrape().catch((error) => {
      if (error instanceof CustomError) setCustomError(error)
      else throw error
    })
  }, [inView, url])

  //

  const onInputChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value ?? target.innerText
    updateData({ [name]: value })
  }

  //

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      for (const name in data) {
        validators[name](data[name]) //validate
      }
      await submitAnswer(data)
      setHasSubmitted(true)
      storeDuration(getQuestionName(url), 0)
    } catch (error) {
      if (error instanceof CustomError) setCustomError(error)
      else throw error
    } finally {
      setIsLoading(false)
    }
  }

  let cardClassName = ' submit-card '
  if (!isHidden) cardClassName += ' card-exposed '
  if (isDisabled) cardClassName += ' card-disabled '
  if (isLoading) cardClassName += ' card-loading-animation '

  return (
    <>
      <div className={cardClassName}>
        <div className="vertical-center">
          <button
            className="drawer-button"
            onClick={() => setIsHidden(!isHidden)}
          >
            <img src={isHidden ? leftIcon : rightIcon} />
          </button>
        </div>
        <div className="flex-1 vertical-spaced-flex gap-1">
          <h2 className="card-title">Submit Via Mirkusve</h2>
          {custom_Error ? (
            <CustomErrorView custom_Error={custom_Error} key={Math.random()} />
          ) : null}

          <InputsBlock
            data={data}
            onInputChange={onInputChange}
            setFileVisible={setFileVisible}
          />

          <FolderTree
            folderPaths={repoContent.folderPaths}
            folderPath={data.folderPath}
            updateData={updateData}
            setCustomError={setCustomError}
          />

          <button
            type="submit"
            className="primary-button submit-button-width"
            onClick={() => onSubmit()}
          >
            Submit
          </button>
        </div>
      </div>

      {fileVisible ? (
        <FileView file={data.file} exitView={() => setFileVisible(false)} />
      ) : null}
    </>
  )
}

export default SubmitCard

function copyWithEmptyStrings(object) {
  const copied = {}
  for (const key in object) copied[key] = ''
  return copied
}
