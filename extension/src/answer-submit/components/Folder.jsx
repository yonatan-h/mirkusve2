import React, { useState, useEffect } from 'react'
import mapUrl from '../../utils/mapUrl.js'
import { InputError } from '../../utils/custom-errors.js'
import joinWithPath from '../../utils/join-path.js'
import IconButton from './IconButton.jsx'

const folderIcon = mapUrl('/media/icons/folder.svg')

function Folder({
  folderPath,
  onSelect,
  onNewFolder,

  //
  isOnSelectedPath,
  isSelected,
  //
  isNew = false,
  onDelete = () => {},
  isUnique = () => {},
  setCustomError = () => {},
}) {
  //new folder
  const [newFolderName, setNewFolderName] = useState(undefined)
  const inNewFolderMode = newFolderName !== undefined

  const onChange = (event) => {
    const name = event.target.value
    setNewFolderName(name)
    try {
      errorIfPathProblem({ newFolderName: name, folderPath, isUnique })
      setCustomError(undefined)
    } catch (error) {
      if (error instanceof InputError) setCustomError(error)
      else throw error
    }
  }

  const onSave = () => {
    try {
      errorIfPathProblem({ newFolderName, folderPath, isUnique })
      onNewFolder(newFolderName)
      setNewFolderName(undefined)
    } catch (error) {
      if (error instanceof InputError) setCustomError(error)
      else throw error
    }
  }

  //normal folder
  const isRoot = folderPath === '/'
  const nodes = folderPath.split('/')
  const folderName = isRoot ? 'root' : nodes[nodes.length - 1]
  const indents = isRoot ? 0 : nodes.length - 1

  //dont forget ' thespaces '
  let labelClassName = ' folder-label spaced-flex '
  if (isSelected) labelClassName += ' selected-folder-label '
  if (isNew && !isOnSelectedPath) labelClassName += ' less-opacity '

  return (
    <>
      <div className="folder">
        <button
          onClick={() => onSelect()}
          style={{ marginLeft: `${indents}rem` }}
          className={labelClassName}
        >
          <img src={folderIcon} />
          {folderName}
        </button>

        {isNew ? (
          <IconButton
            onClick={() => onDelete()}
            iconName="delete"
            alt="delete folder"
          />
        ) : null}

        {inNewFolderMode ? null : (
          <IconButton
            onClick={() => setNewFolderName('')}
            iconName="add"
            alt="add new folder"
          />
        )}
      </div>

      {inNewFolderMode ? (
        <div
          style={{ marginLeft: `${indents + 1}rem` }}
          className="spaced-flex align-center"
        >
          <input
            type="text"
            onChange={onChange}
            value={newFolderName}
            className="flex-1"
            placeholder="Name of New Folder"
          />

          <IconButton
            onClick={() => onSave()}
            iconName="done"
            alt="save this new folder"
          />

          <IconButton
            onClick={() => {
              setNewFolderName(undefined)
              setCustomError(undefined)
            }}
            iconName="cancel"
            alt="cancel creating new folder"
          />
        </div>
      ) : null}
    </>
  )
}

export default Folder

function errorIfPathProblem({ newFolderName, isUnique, folderPath }) {
  if (!newFolderName) {
    throw new InputError(`Folder name is empty! It should'nt be empty`)
  }

  const newFolderPath = joinWithPath(folderPath, newFolderName)
  if (!isUnique(newFolderName)) {
    throw new InputError(
      `There is another folder with path '${newFolderPath}'. You can't have identical folders.`
    )
  }

  if (newFolderName.includes('.')) {
    throw new InputError(
      `There is a '.' in the name of the folder'${newFolderName}'. Only create folders, not files.`
    )
  }

  if (newFolderName.includes('/')) {
    throw new InputError(
      `There is slash '/' in '${newFolderName}', Please Remove it.`
    )
  }

  try {
    const url = new URL('https://abebe.com/' + newFolderName)
  } catch (error) {
    throw new InputError(
      `The folder '${newFolderName}' is not url safe somehow. Please modify it.`
    )
  }
}
