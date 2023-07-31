// 0||undefined is undefined
//but 0??undefined is 0

import React, { useState, useEffect } from 'react';
import './style.css';
import FolderTree from './components/FolderTree.jsx';
import CreateNewFolder from './components/CreateNewFolder.jsx';
import LabelledInput from './components/LabelledInput.jsx';
import mapUrl from '../utils/mapUrl.js';
import CustomErrorView from './components/CustomErrorView.jsx';
import {
  CustomError,
  DisablingError,
  EmptyInputError,
  InputError,
} from '../utils/custom-errors';
import waitToLoad from './wait-to-load.js';
import getScrapedData from './get-scraped-data';
import fetchFilesAndFolders from './fetch-repo.js';
import determineFileName from './determine-file-name.js';
import { getSubmissionSpans } from '../utils/web-scrape';
import submitAnswer from './submit-answer.js';
import InputsBlock from './components/InputsBlock.jsx';

const cancelIcon = mapUrl('/media/icons/cancel.svg');
const folderIcon = mapUrl('/media/icons/folder.svg');
const leftIcon = mapUrl('/media/icons/left.svg');
const rightIcon = mapUrl('/media/icons/right.svg');
const saveIcon = mapUrl('/media/icons/save.svg');
const sendIcon = mapUrl('/media/icons/send.svg');
const timeIcon = mapUrl('/media/icons/time.svg');
const tryIcon = mapUrl('/media/icons/try.svg');

function SubmitCard({ inView }) {
  const [isHidden, setIsHidden] = useState(false);
  const [url, setUrl] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [custom_Error, setCustomError] = useState(undefined);
  const isDisabled = custom_Error && custom_Error instanceof DisablingError;
  const [repoContent, setRepoContent] = useState({
    folderPaths: [],
    filePaths: [],
  });
  const [data, setData] = useState({
    submissions: '',
    minutes: '',
    file: '',
    fileName: '',
    fileExtension: '',
    folderPath: '',
  });

  const updateData = (newData) => {
    if (isDisabled) return;
    //Assuming this error is the one the user is trying to correct
    //All unsolved errors will be reintroduced on submit
    setCustomError(undefined);
    setData({ ...data, ...newData });
  };

  //

  useEffect(() => {
    const changeUrl = (event) => setUrl(event.destination.url);
    navigation.addEventListener('navigate', changeUrl);
    return () => navigation.removeEventListener('navigate', changeUrl);
  }, []);

  //

  useEffect(() => {
    if (!inView) return;
    if (hasSubmitted) return;

    let collectedData = {};
    let collectedRepo = {};

    const load = async () => {
      await waitToLoad();
      await Promise.all([
        getScrapedData().then((data) => (collectedData = data)),
        fetchFilesAndFolders().then((content) => (collectedRepo = content)),
      ]);

      collectedData.fileName = determineFileName(collectedRepo.filePaths);

      //To not loose the keys, used to validate all inputs later
      collectedData = { ...copyWithEmptyStrings(data), ...collectedData };
      setData(collectedData);
      setRepoContent(collectedRepo);
    };

    load().catch((error) => {
      if (error instanceof CustomError) setCustomError(error);
      else throw error;
    });
  }, [inView, url]);

  //

  const onInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value ?? target.innerText;
    updateData({ [name]: value });
    try {
      errorIfIllegalInput(name, value);
      setCustomError(undefined);
    } catch (error) {
      if (error instanceof InputError) setCustomError(error);
      else throw error;
    }
  };

  //

  const onSubmit = async () => {
    try {
      for (const name in data) {
        const value = data[name];
        errorIfIllegalInput(name, value);
      }
      await submitAnswer(data);
    } catch (error) {
      if (error instanceof CustomError) setCustomError(error);
      else throw error;
    }
  };

  let cardClassName = ' submit-card ';
  if (!isHidden) cardClassName += ' card-exposed ';
  if (isDisabled) cardClassName += ' card-disabled ';

  return (
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

        <InputsBlock data={data} onInputChange={onInputChange} />

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
  );
}

export default SubmitCard;

function errorIfIllegalInput(name, value) {
  if (value === 0) return;

  if (!value && name === 'folderPath') {
    throw new InputError(`Please select a folder to upload your file to!`);
  }
  if (!value) throw new EmptyInputError(name);

  if (name !== 'folderPath' && name !== 'file' && `${value}`.includes('/')) {
    throw new InputError(`please remove / from input ${name}`);
  }
}

function copyWithEmptyStrings(object) {
  const copied = {};
  for (const key in object) copied[key] = '';
  return copied;
}
