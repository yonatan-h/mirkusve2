import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { CustomError } from '../utils/custom-errors';
import '../assets/style.css';
import './style.css';

import Welcome from './components/Welcome.jsx';
import NameAndGroup from './components/NameAndGroup.jsx';
import Repo from './components/Repo.jsx';
import GithubApp from './components/GithubApp.jsx';
import GithubSignin from './components/GithubSignin.jsx';
import Finish from './components/Finish.jsx';
import CustomErrorView from './components/ErrorView.jsx';

function SetupScreen() {
  const screensFunctions = [
    NameAndGroup,
    Repo,
    GithubApp,
    GithubSignin,
    Finish,
  ];

  const [screenIndex, setScreenIndex] = useState(3);
  const [data, setData] = useState({});
  const [customError, setCustomError] = useState(undefined);
  const [nextIsDisabled, setNextIsDisabled] = useState(false);

  const runBeforeNext = async (task) => {
    try {
      setNextIsDisabled(true);
      await task();
      setScreenIndex(screenIndex + 1);
      setCustomError(undefined);
    } catch (error) {
      if (error instanceof CustomError) setCustomError(error);
      else throw error;
    } finally {
      setNextIsDisabled(false);
    }
  };

  const goPrevious = () => {
    setScreenIndex(screenIndex - 1);
  };

  const setDatum = (key, value) => {
    setCustomError(undefined); //user is taking action to change
    setData({ ...data, [key]: value });
  };

  const screens = screensFunctions.map((screenFunction) =>
    screenFunction({
      data,
      setDatum,
      runBeforeNext,
      nextIsDisabled,
      goPrevious, //optional
    })
  );

  return (
    <div className="split vh-100 m-ff ">
      <div className="container flex-2 ">
        <Welcome />
      </div>
      <div className="container flex-3 smooth-left wbg">
        <div>
          <h2 className="m-smaller-header m-grey-color">Setup Mirkusve</h2>
          <p className="m-grey-color">
            {screenIndex + 1}/{screens.length}
          </p>

          <p>{JSON.stringify(data)}</p>
          {customError && (
            //random keys to play the fade in animation again. to let users know the same error is happening again
            <CustomErrorView customError={customError} key={Math.random()} />
          )}
          <br />
          {screens[screenIndex]}
        </div>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<SetupScreen />);
