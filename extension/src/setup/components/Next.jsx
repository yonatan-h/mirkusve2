import React, { useState, useEffect } from 'react';

function Next({ onClick, nextIsDisabled, content }) {
  return (
    <div className="align-end m-small-top">
      <button
        className={`primary-button ${nextIsDisabled ? 'disabled-button' : ''}`}
        onClick={() => !nextIsDisabled && onClick()}
        disabled={nextIsDisabled ? true : false}
      >
        {content || 'Next'}
      </button>
    </div>
  );
}

export default Next;
