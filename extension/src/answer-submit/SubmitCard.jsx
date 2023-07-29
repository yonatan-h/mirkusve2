// 0||undefined is undefined
//but 0??undefined is 0

import React, { useState, useEffect } from 'react';
import './style.css';
import FolderTree from './components/FolderTree.jsx';
import CreateNewFolder from './components/CreateNewFolder.jsx';
import LabelledInput from './components/LabelledInput.jsx';
import mapUrl from '../utils/mapUrl.js';
import CustomErrorView from './components/CustomErrorView.jsx';
import {
  CustomError,
  DisablingError,
  EmptyInputError,
} from '../utils/custom-errors';
import waitToLoad from './wait-to-load.js';
import autoFill from './auto-fill';
import fetchFilesAndFolders from './fetch-repo.js';
import determineFileName from './determine-file-name.js';
import { getSubmissionSpans } from '../utils/web-scrape';

const cancelIcon = mapUrl('/media/icons/cancel.svg');
const folderIcon = mapUrl('/media/icons/folder.svg');
const leftIcon = mapUrl('/media/icons/left.svg');
const rightIcon = mapUrl('/media/icons/right.svg');
const saveIcon = mapUrl('/media/icons/save.svg');
const sendIcon = mapUrl('/media/icons/send.svg');
const timeIcon = mapUrl('/media/icons/time.svg');
const tryIcon = mapUrl('/media/icons/try.svg');

function SubmitCard({ inView }) {
  const [isHidden, setIsHidden] = useState(false);
  const [url, setUrl] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [customError, setCustomError] = useState(undefined);
  const [data, setData] = useState({});
  const isDisabled = customError && customError instanceof DisablingError;

  const updateData = (newData) => setData({ ...data, ...newData });

  useEffect(() => {
    const changeUrl = (event) => setUrl(event.destination.url);
    navigation.addEventListener('navigate', changeUrl);
    return () => navigation.removeEventListener('navigate', changeUrl);
  }, []);

  useEffect(() => {
    if (!inView) return;
    let collected = {};
    const collectData = (updated) => (collected = { ...collected, ...updated });

    const load = async () => {
      await waitToLoad();

      await Promise.all([
        autoFill(collectData),
        fetchFilesAndFolders().then(collectData),
      ]);

      collectData({ fileName: determineFileName(collected.filePaths) });
      setData(collected);
    };

    load().catch((error) => {
      if (error instanceof CustomError) setCustomError(error);
      else throw error;
    });
  }, [inView, url]);

  const onInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value ?? target.innerText;

    updateData({ [name]: value });

    //May accidentally clear another inputs Error. Its okay, every thing is evaluated on submission
    if (value === '') setCustomError(new EmptyInputError(name));
    else setCustomError(undefined);
  };

  let cardClassName = ' m-submit-card ';
  if (!isHidden) cardClassName += ' m-card-exposed ';
  if (isDisabled) cardClassName += ' m-card-disabled ';

  return (
    <div className={cardClassName}>
      <div className="m-vertical-center">
        <button
          className="m-drawer-button"
          onClick={() => setIsHidden(!isHidden)}
        >
          <img src={isHidden ? leftIcon : rightIcon} />
        </button>
      </div>
      <div className="m-flex-1 m-vertical-spaced-flex m-gap-1">
        <h2 className="m-card-title">Submit Via Mirkusve</h2>
        {customError ? (
          <CustomErrorView customError={customError} key={Math.random()} />
        ) : null}

        <div className="m-vertical-spaced-flex">
          {/* Should've been a form, but buttons were type=submit by default  */}
          <div className="m-spaced-flex m-mw-2-inputs">
            <LabelledInput
              input={
                <input
                  type="number"
                  min="0"
                  name="submissions"
                  className="m-flex-1"
                  onChange={onInputChange}
                  required={true}
                  value={data.submissions ?? ''}
                />
              }
              label="Tries"
              className="m-flex-1"
            />
            <LabelledInput
              input={
                <input
                  type="number"
                  min="0"
                  name="minutes"
                  onChange={onInputChange}
                  required={true}
                  value={data.minutes ?? ''}
                />
              }
              label="Minutes"
              className="m-flex-1"
            />
          </div>
          <div className="m-spaced-flex m-mw-2-inputs">
            <LabelledInput
              input={
                <input
                  type="text"
                  name="fileName"
                  onChange={onInputChange}
                  required={true}
                  value={data.fileName ?? ''}
                />
              }
              label="Filename"
              className="m-flex-2"
            />
            <LabelledInput
              input={
                <input
                  type="text"
                  name="fileExtension"
                  onChange={onInputChange}
                  required={true}
                  value={data.fileExtension ?? ''}
                />
              }
              label="Extension"
              className="m-flex-1"
            />
          </div>
        </div>
        
        <FolderTree
          folderPaths={data.folderPaths}
          folderPath={data.folderPath}
          updateData={updateData}
          setCustomError={setCustomError}
        />
        <button
          type="submit"
          className="m-primary-button m-submit-button-width"
          onClick={(e) => 1 + 1}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default SubmitCard;
