import React, { useState, useEffect } from 'react';
import Folder from './Folder.jsx';
import removeExcessSlash from '../../utils/excess-slash.js';
import joinWithPath from '../../utils/join-path.js';
import mapUrl from '../../utils/mapUrl.js';

function FolderTree({
  folderPaths: existingFolderPaths,
  folderPath: selectedFolderPath,
  updateData,
  setCustomError,
}) {
  if (!existingFolderPaths) return null;

  const [newFolderPaths, setNewFolderPaths] = useState([]);

  const existingFolders = existingFolderPaths.map((path) => ({
    path,
    isNew: false,
  }));
  const newFolders = newFolderPaths.map((path) => ({ path, isNew: true }));

  const allFolders = sortFolders([...existingFolders, ...newFolders]);
  return (
    <ul className="folder-tree">
      {allFolders.map(({ path, isNew }) => (
        <li key={path}>
          <Folder
            isSelected={selectedFolderPath === path}
            isOnSelectedPath={selectedFolderPath?.startsWith(path)}
            //
            //options for both old and new
            //
            folderPath={path}
            onSelect={() => updateData({ folderPath: path })}
            onNewFolder={(folderName) => {
              const newPath = joinWithPath(path, folderName);
              setNewFolderPaths([...newFolderPaths, newPath]);
            }}
            //
            //new folder options
            //
            isNew={isNew}
            setCustomError={setCustomError}
            onDelete={() => {
              const remaining = newFolderPaths.filter((otherPath) => {
                return !otherPath.startsWith(path);
              });

              const selectedInRemaining = remaining.find(
                (path) => path === selectedFolderPath
              );

              if (!selectedInRemaining) {
                updateData({ folderPath: undefined });
              }
              setNewFolderPaths(remaining);
            }}
            isUnique={(folderName) => {
              const potentialPath = joinWithPath(path, folderName);
              const allPaths = allFolders.map((folder) => folder.path);
              const result = allPaths.find((path) => path === potentialPath);
              return result === undefined;
            }}
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

  return folders;
}

function removeFolderWithChildren(removedPath, paths) {
  const remaining = paths.filter((path) => path.startsWith(removedPath));
  return remaining;
}
