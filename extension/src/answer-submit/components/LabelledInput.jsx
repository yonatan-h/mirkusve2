import React, { useState, useEffect } from 'react';

function LabelledInput({ input, label, className }) {
  return (
    <div className={`labelled-input-container ${className || ''}`}>
      {input}
      <span className="label m-top-left-label">{label}</span>
    </div>
  );
}

export default LabelledInput;
