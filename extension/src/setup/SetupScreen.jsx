import React, { useState, useEffect } from 'react';

import { CustomError } from '../utils/custom-errors';
import '../assets/style.css';
import './style.css';

import Welcome from './components/Welcome.jsx';
import NameAndGroup from './components/NameAndGroup.jsx';
import Repo from './components/Repo.jsx';
import InstallGithubApp from './components/InstallGithubApp.jsx';
import GithubAppSignin from './components/GithubAppSignin.jsx';
import Finish from './components/Finish.jsx';
import CustomErrorView from './components/ErrorView.jsx';

function SetupScreen() {
  const screenFunctions = [
    NameAndGroup,
    Repo,
    InstallGithubApp,
    GithubAppSignin,
    Finish,
  ];

  const [screenIndex, setScreenIndex] = useState(0);
  const [data, setData] = useState({});
  const [custom_Error, setCustomError] = useState(undefined);
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

  const updateData = (updated) => {
    //user is taking action to correct the error
    setCustomError(undefined);
    setData({ ...data, ...updated });
  };

  //all screens created here so that num of use[hook] calls are the same for every render
  const screens = screenFunctions.map((screenFunction) =>
    screenFunction({
      data,
      updateData,
      runBeforeNext,
      nextIsDisabled,
      goPrevious, //optional
    })
  );

  return (
    <div className="split vh-100 ff ">
      <div className="container flex-2 ">
        <Welcome />
      </div>
      <div className="container flex-3 smooth-left wbg">
        <div>
          <h2 className="grey-color">Setup Mirkusve</h2>
          <p className="grey-color">
            {screenIndex + 1}/{screenFunctions.length}
          </p>

          {custom_Error && (
            //random keys to play the fade in animation again. to let users know the same error is happening again
            <CustomErrorView custom_Error={custom_Error} key={Math.random()} />
          )}
          <br />
          {screens[screenIndex]}
        </div>
      </div>
    </div>
  );
}

export default SetupScreen;
