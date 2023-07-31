import React, { useState, useEffect } from 'react';

function CustomErrorView({ custom_Error }) {
  return (
    <div className="error-box">
      <p className="error-color">{custom_Error.descriptionAndSolution}</p>
      <code className="error-color">{custom_Error.errorAsString}</code>
    </div>
  );
}

export default CustomErrorView;
