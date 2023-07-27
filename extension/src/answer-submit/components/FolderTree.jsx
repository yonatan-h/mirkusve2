import React, { useState, useEffect } from 'react';
import Folder from './Folder.jsx';

function FolderTree() {
  return (
    <div>
      <Folder />
      <Folder />
      <Folder />
    </div>
  );
}

export default FolderTree;
