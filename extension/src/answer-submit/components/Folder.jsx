import React, { useState, useEffect } from 'react';
import mapUrl from '../../utils/mapUrl.js';

const folderIcon = mapUrl('/media/icons/folder.svg');
const addIcon = mapUrl('/media/icons/add.svg');
const deleteIcon = mapUrl('/media/icons/delete.svg');

function Folder({
  folderPath,
  onSelect,
  onNewFolder,
  isSelected,
  //
  isNew = false,
  onDelete = () => {},
  isUnique = () => {},
}) {
  //new folder
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderNameProblem, setNewFolderNameProblem] = useState('');
  const onChange = (event)=>{
    const name = event.target.value;
    const path = folderPath+'/'+name;
    

  }


  //normal folder
  const isRoot = folderPath === '/';
  const nodes = folderPath.split('/');
  const folderName = isRoot ? 'root' : nodes[nodes.length - 1];
  const indents = isRoot ? 0 : nodes.length;
  const style = { marginLeft: `${indents}rem` };

  return (
    <div className="m-folder">
      <button
        onClick={() => onSelect()}
        style={style}
        className={`m-folder-label m-spaced-flex ${
          isSelected ? 'm-selected-folder-label' : ''
        }`}
      >
        <img className="m-medium-icon" src={folderIcon} />
        {folderName}
      </button>

      {isNew ? (
        <button className="m-new-folder-button">
          <img src={deleteIcon} />
        </button>
      ) : null}

      <button onClick={() => onNewFolder()} className="m-new-folder-button">
        <img className="m-medium-icon" src={addIcon} />
      </button>

      {isNew && newFolderName ? <div>
        <input type="text" onChange={(event)=>new} />
      </div> : null}
    </div>
  );
}

export default Folder;

function findProblem(path, isUnique) {
  if (path.includes('.')) {
    throw new CustomError(
      `There is a '.' in the folder path. Please enter only the path of the folder, don't include any file.`
    );
  }

  if (path.includes('//')) {
    throw new CustomError(
      `There is a double slash '//' in the folder path. Remove it.`
    );
  }

  if (path.includes(' ')) {
    throw new CustomError(
      `Please don't include space characters in the folder path.`
    );
  }

  try {
    const url = new URL('https://abebe.com/' + path);
  } catch (error) {
    throw new CustomError(
      `The folder path is not url safe somehow. Please modify it.`
    );
  }
}
