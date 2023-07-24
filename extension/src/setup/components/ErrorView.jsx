import React, { useState, useEffect } from 'react';

function CustomErrorView({customError}) {
  return (
    <div className='error-box'>
      <p className='m-error-color'>{customError.descriptionAndSolution}</p>
      <code className='m-error-color'>{customError.errorAsString}</code>
    </div>
  );
}

export default CustomErrorView;
