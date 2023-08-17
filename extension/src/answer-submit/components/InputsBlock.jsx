import React, { useState, useEffect } from 'react'
import LabelledInput from './LabelledInput.jsx'
import FileView from './FileView.jsx'
import IconButton from './IconButton.jsx'

function InputsBlock({ data, onInputChange, setFileVisible }) {

  return (
    <div className="vertical-spaced-flex">
      {/* Should've been a form, but buttons were type=submit by default  */}
      <div className="spaced-flex mw-2-inputs">
        <LabelledInput
          input={
            <input
              type="number"
              min="0"
              name="submissions"
              className="flex-1"
              onChange={onInputChange}
              required={true}
              value={data.submissions}
            />
          }
          label="Submissions"
          className="flex-1"
        />
        <LabelledInput
          input={
            <input
              type="number"
              min="0"
              name="minutes"
              onChange={onInputChange}
              required={true}
              value={data.minutes}
            />
          }
          label="Minutes"
          className="flex-1"
        />
      </div>
      <div className="spaced-flex mw-2-inputs">
        <IconButton
        iconName={'eye'}
        alt='view file'
        onClick={()=>setFileVisible(true)}
        
        />
        
        <LabelledInput
          input={
            <input
              type="text"
              name="fileName"
              onChange={onInputChange}
              required={true}
              value={data.fileName}
            />
          }
          label="Filename"
          className="flex-2"
        />
        <LabelledInput
          input={
            <input
              type="text"
              name="fileExtension"
              onChange={onInputChange}
              required={true}
              value={data.fileExtension}
            />
          }
          label="Extension"
          className="flex-1"
        />
      </div>
    </div>
  )
}

export default InputsBlock
