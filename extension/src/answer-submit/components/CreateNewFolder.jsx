import React, { useState, useEffect } from 'react';
import mapUrl from '../../utils/mapUrl';
import FolderTree from './FolderTree.jsx';
const cancelIcon = mapUrl('/media/icons/cancel.svg');

function CreateNewFolder({ updateData, setInNewFolderMode, folderPath }) {
  const [path, setPath] = useState('');
  const onChange = (event) => {
    const value = event.target.value;
    // updateData({ folderPath: value });
    setPath(value);
  };

  const onCancel = () => {
    updateData({ folderPath: '' });
    setInNewFolderMode(false);
  };
  return (
    <div>
      <p>eg) abebe/kebede/chala</p>
      <div className="spaced-flex">
        <input
          type="text"
          className="flex-1"
          onChange={onChange}
          value={[path]}
        />
        <button className="cancel-new-folder" onClick={onCancel}>
          <img src={cancelIcon} alt="cancel" />
        </button>
      </div>
      <div>
        <FolderTree
          folderPaths={[path]}
          folderPath={undefined}
          setInNewFolderMode={() => {}}
          updateData={() => {}}
        />
      </div>
    </div>
  );
}

export default CreateNewFolder;
