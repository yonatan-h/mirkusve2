import React, { useState, useEffect } from 'react'
import mapUrl from '../../utils/mapUrl.js'

function IconButton({ onClick, iconName, alt = 'button' }) {
  const path = mapUrl(`/media/icons/${iconName}.svg`)
  return (
    <button className="folder-icon-button" onClick={onClick}>
      <img src={path} alt={alt} />
    </button>
  )
}

export default IconButton
