import React, { useState, useEffect } from 'react';
import mapUrl from '../utils/mapUrl.js';
import './style.css';

import { getQuestionName } from '../utils/web-scrape.js';
import {
  loadDuration,
  storeDuration,
  calculateMinutes,
} from '../utils/duration.js';

const pauseIcon = mapUrl('/media/pause.svg');
const playIcon = mapUrl('/media/play.svg');

// const loadDuration = (name) => new Promise((s) => s(0));
// const storeDuration = (name, time) => {};
// const getQuestionName = () => 'abebe';
// const calculateMinutes = (x) => x % 100;

function Timer({ inView }) {
  console.log(`timer-is-in-view==${inView}`);
  //assuming load duration and store duration are almost instantanous
  //other wise, load, and store race conditions can happen
  const [countingState, setCountingState] = useState({
    isCounting: false,
    byUser: false,
  });
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!countingState.isCounting) return;

    const startTime = Date.now();
    const oldDurationPromise = loadDuration(
      getQuestionName(window.location.href)
    ).then((duration) => duration || 0); //incase it's the first time it's running

    const updateTime = async () => {
      console.log('updating-time');
      const duration = (await oldDurationPromise) + Date.now() - startTime;
      setDuration(duration);
      storeDuration(getQuestionName(window.location.href), duration);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => {
      clearInterval(intervalId);
      updateTime();
    };
  }, [countingState]);

  useEffect(() => {
    const helpUser = () => {
      //Timer playing when not visible is danger
      if (!inView && countingState.isCounting) {
        setCountingState({ isCounting: false, byUser: false });
      }

      //Let the automatically paused timer resume
      if (inView && !countingState.isCounting && !countingState.byUser) {
        setCountingState({ isCounting: true, byUser: false });
      }
    };
    helpUser();
  }, [inView]);

  return (
    <div className="m-timer ">
      {countingState.isCounting ? (
        <button
          className="m-play-pause-button m-timer-playing"
          onClick={() =>
            setCountingState({
              isCounting: false,
              byUser: true,
            })
          }
        >
          <img src={pauseIcon} alt="pause" />
        </button>
      ) : (
        <button
          className="m-play-pause-button m-timer-paused"
          onClick={() =>
            setCountingState({
              isCounting: true,
              byUser: true,
            })
          }
        >
          <img src={playIcon} alt="play" />
        </button>
      )}
      <div>
        <span className="m-medium-fs "> {calculateMinutes(duration)} </span>
        <span className="m-small-fs">min</span>
      </div>
    </div>
  );
}

export default Timer;
