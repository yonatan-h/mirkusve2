import React, { useState, useEffect } from 'react';
import Folder from './Folder.jsx';

function FolderTree({
  folderPaths: existingFolderPaths,
  folderPath: selectedFolderPath,
  updateData,
}) {
  if (!existingFolderPaths) return null;
  const [newFolderPaths, setNewFolderPaths] = useState(['abebe/sancho']);

  const existingFolders = existingFolderPaths.map((path) => ({ path, isNew: false }));
  const newFolders = newFolderPaths.map((path) => ({ path, isNew: true }));

  const allFolders = sortFolders([...existingFolders, ...newFolders]);

  return (
    <ul className="m-folder-tree">
      {allFolders.map(({ path, isNew }) => (
        <li key={path}>
          <Folder
            //options for both old and new
            folderPath={path}
            onSelect={() => updateData({ path })}
            onNewFolder={() => setInNewFolderMode(true)}
            isSelected={selectedFolderPath === path}

            //new folder options
            isNew={isNew}
            onDelete={()=>{}}
            isUnique={(path)=>{}}
          />
        </li>
      ))}
    </ul>
  );
}

export default FolderTree;

function sortFolders(folders) {
  folders.sort((folder1, folder2) => {
    if (folder1.path < folder2.path) {
      return -1;
    } else {
      return 1;
    }
  });

  return folders
}
