import React, { useState, useEffect } from 'react';
import mapUrl from '../../utils/mapUrl.js';
import { InputError } from '../../utils/custom-errors.js';
import joinWithPath from '../../utils/join-path.js';

const folderIcon = mapUrl('/media/icons/folder.svg');
const addIcon = mapUrl('/media/icons/add.svg');
const deleteIcon = mapUrl('/media/icons/delete.svg');
const doneIcon = mapUrl('/media/icons/done.svg');
const cancelIcon = mapUrl('/media/icons/cancel.svg');

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
  const [newFolderName, setNewFolderName] = useState(undefined);
  const inNewFolderMode = newFolderName !== undefined;

  const onChange = (event) => {
    const name = event.target.value;
    setNewFolderName(name);
    try {
      errorIfPathProblem({ newFolderName: name, folderPath, isUnique });
      setCustomError(undefined);
    } catch (error) {
      if (error instanceof InputError) setCustomError(error);
      else throw error;
    }
  };

  const onSave = () => {
    try {
      errorIfPathProblem({ newFolderName, folderPath, isUnique });
      onNewFolder(newFolderName);
      setNewFolderName(undefined);
    } catch (error) {
      if (error instanceof InputError) setCustomError(error);
      else throw error;
    }
  };

  //normal folder
  const isRoot = folderPath === '/';
  const nodes = folderPath.split('/');
  const folderName = isRoot ? 'root' : nodes[nodes.length - 1];
  const indents = isRoot ? 0 : nodes.length - 1;

  //dont forget ' thespaces '
  let labelClassName = ' m-folder-label m-spaced-flex ';
  if (isSelected) labelClassName += ' m-selected-folder-label ';
  if (isNew && !isOnSelectedPath) labelClassName += ' m-less-opacity ';

  return (
    <>
      <div className="m-folder">
        <button
          onClick={() => onSelect()}
          style={{ marginLeft: `${indents}rem` }}
          className={labelClassName}
        >
          <img src={folderIcon} className="m-medium-icon" />
          {folderName}
        </button>

        {isNew ? (
          <button onClick={() => onDelete()} className="m-folder-icon-button">
            <img src={deleteIcon} alt="delete folder" />
          </button>
        ) : null}

        {inNewFolderMode ? null : (
          <button
            onClick={() => setNewFolderName('')}
            className="m-folder-icon-button"
          >
            <img src={addIcon} alt="add new folder" />
          </button>
        )}
      </div>

      {inNewFolderMode ? (
        <div
          style={{ marginLeft: `${indents + 1}rem` }}
          className="m-spaced-flex m-align-center"
        >
          <input
            type="text"
            onChange={onChange}
            value={newFolderName}
            className="flex-1"
          />

          <button className="m-folder-icon-button" onClick={() => onSave()}>
            <img src={doneIcon} alt="save this new folder" />
          </button>

          <button
            className="m-folder-icon-button"
            onClick={() => setNewFolderName(undefined)}
          >
            <img src={cancelIcon} alt="cancel creating new folder" />
          </button>
        </div>
      ) : null}
    </>
  );
}

export default Folder;

function errorIfPathProblem({ newFolderName, isUnique, folderPath }) {
  if (!newFolderName) {
    throw new InputError(`Folder name is empty! It should'nt be empty`);
  }

  const newFolderPath = joinWithPath(folderPath, newFolderName);
  if (!isUnique(newFolderName)) {
    throw new InputError(
      `There is another folder with path '${newFolderPath}'. You can't have identical folders.`
    );
  }

  if (newFolderName.includes('.')) {
    throw new InputError(
      `There is a '.' in the name of the folder'${newFolderName}'. Only create folders, not files.`
    );
  }

  if (newFolderName.includes('/')) {
    throw new InputError(
      `There is slash '/' in '${newFolderName}', Please Remove it.`
    );
  }

  if (newFolderName.includes(' ')) {
    throw new InputError(
      `Please don't include space characters in the folder '${newFolderName}'.`
    );
  }

  try {
    const url = new URL('https://abebe.com/' + newFolderName);
  } catch (error) {
    throw new InputError(
      `The folder '${newFolderName}' is not url safe somehow. Please modify it.`
    );
  }
}
