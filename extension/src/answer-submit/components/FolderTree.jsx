import React, { useState, useEffect } from 'react';
import Folder from './Folder.jsx';

function FolderTree({ folderPaths, setInSelectFolderMode, updateData }) {
  if (!folderPaths) return <p>Loading folders...</p>;
  const sortedFolderPaths = [...folderPaths].sort((a, b) => (a < b ? -1 : 1));

  return (
    <ul className='m-folder-tree'>
      {sortedFolderPaths.map((folderPath) => (
        <li key={folderPath}>
          <Folder

            folderPath={folderPath}
            onSelect={() => updateData({ folderPath })}
            onNewFolder={() => setInSelectFolderMode(true)}
          />
        </li>
      ))}
    </ul>
  );
}

export default FolderTree;
