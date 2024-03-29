import React, { useState, useEffect } from 'react';
const a2svLogo = '/media/a2sv-logo.png';
const folderChoiceImage = '/media/folder-choice.svg';
const githubLogo = '/media/github-logo.png';
const leetcodeLogo = '/media/leetcode-logo.png';
const lockImage = '/media/lock.svg';
const mirkusveLogo = '/media/mirkusve-logo.svg';
const sheetsLogo = '/media/sheets-logo.png';

function Welcome() {
  const pClass = 'dark-grey-color ';
  return (
    <div className="welcome-width">
      <p className="very-large-fs m-top">
        A Little Help of a{' '}
        <span className="hoverable">
          <span className="hover-appetizer">Mirkuz </span>
          <img src={mirkusveLogo} className="hover-pop-image" />
        </span>
        on your journey to
        <b> Silicon Valley</b>
      </p>
      <p className="m-small-top">
        Welcome to Mirkisve! We simplify submitting Leetcode answers to A2SV.
        Instead of doing the manual work of copy-pasting and typing, you can
        submit your answers in 2 clicks.
      </p>
      <div>
        <button className="secondary-button m-small-top">Watch Demo</button>
      </div>
      <div>
        <div className="image-text-grid m-top">
          <div className="circular-container">
            <img src={sheetsLogo} />
          </div>

          <p className={pClass}>
            We submit your leetcode answers to A2SV sheets.
          </p>

          <div className="circular-container">
            <img src={githubLogo} />
          </div>

          <p className={pClass}>We upload answer files to Github </p>
          <div className="circular-container">
            <img src={folderChoiceImage} />
          </div>
          <p className={pClass}>
            You choose the Github folder for your answer file.
          </p>

          <div className="circular-container">
            <img src={lockImage} />
          </div>

          <p className={pClass}>
            We only require access to your A2SV repo, not your github account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
