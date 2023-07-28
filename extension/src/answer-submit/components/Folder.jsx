import React, { useState, useEffect } from 'react';

function Folder({ folderPath, onSelect, onNewFolder }) {
  const nodes = folderPath.split('/');
  //assuming they are not named abc/
  const folderName = nodes[nodes.length - 1];
  const indents = nodes.length - 1;
  const style = {
    marginLeft: `${0.5 * indents}rem`,
  };

  return (
    <div>
      <button style={style}>{folderName === '' ? 'root' : folderName}</button>
      <button>+</button>
    </div>
  );
}

export default Folder;

function errorIfBadFolderPath(path) {
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
