import React, { useState, useEffect } from 'react'
import mapUrl from '../../utils/mapUrl.js'
import IconButton from './IconButton.jsx'

function FileView({ file, exitView }) {
  return (
    <div className="file-view-container vertical-spaced-flex">
      <div className="file-view vertical-spa">
        <div className="spaced-flex">
          <div className="flex-1"></div>
          <IconButton
            onClick={() => exitView()}
            iconName="cancel"
            alt="save this new folder"
          />
        </div>
        {/* Either use code or pre, not both. The webscraper might mistake this for a leetcode answer!  */}
        <pre>{file}</pre>
      </div>
    </div>
  )
}

export default FileView
