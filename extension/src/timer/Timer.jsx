import React, { useState, useEffect } from 'react';
import mapUrl from '../utils/mapUrl.js';

import getQuestionName from '../utils/get-question-name.js';
import {
  loadDuration,
  storeDuration,
  calculateMinutes,
} from '../utils/duration.js';

import './style.css';

const pauseIcon = mapUrl('/media/pause.svg');
const playIcon = mapUrl('/media/play.svg');

// const loadDuration = (name) => new Promise((s) => s(0));
// const storeDuration = (name, time) => {};
// const getQuestionName = () => 'abebe';
// const calculateMinutes = (x) => x % 100;

function Timer() {
  //assuming load duration and store duration are almost instantanous
  //other wise, load, and store race conditions can happen
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const startTime = Date.now();
    const oldDurationPromise = loadDuration(
      getQuestionName(window.location.href)
    ).then((duration) => duration || 0); //incase it's the first time it's running

    const updateTime = async () => {
      const duration = (await oldDurationPromise) + Date.now() - startTime;
      setDuration(duration);
      storeDuration(getQuestionName(window.location.href), duration);
    };

    const intervalId = setInterval(updateTime, 1000);

    return () => {
      clearInterval(intervalId);
      updateTime();
    };
  }, [isPlaying]);

  return (
    <div className="m-timer-super-container">
      <div
        className={`m-timer-container ${isPlaying ? 'm-animated-timer' : ''}`}
      >
        <div className="m-timer">
          {isPlaying ? (
            <button
              className="m-play-pause-button"
              onClick={() => setIsPlaying(false)}
            >
              <img src={pauseIcon} alt="pause" />
            </button>
          ) : (
            <button
              className="m-play-pause-button"
              onClick={() => setIsPlaying(true)}
            >
              <img src={playIcon} alt="play" />
            </button>
          )}
          <p className="m-secondary-underline">
            <span className="m-large-fs "> {calculateMinutes(duration)} </span>
            min
          </p>
        </div>
      </div>
    </div>
  );
}

export default Timer;
