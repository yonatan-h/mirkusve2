import React, { useState, useEffect } from 'react';
import './style.css';
import FolderTree from './components/FolderTree.jsx';
import CreateNewFolder from './components/CreateNewFolder.jsx';
import LabelledInput from './components/LabelledInput.jsx';
import mapUrl from '../utils/mapUrl.js';
import CustomErrorView from './components/CustomErrorView.jsx';
import { EmptyInputError } from '../utils/custom-errors';

const cancelIcon = mapUrl('/media/icons/cancel.svg');
const folderIcon = mapUrl('/media/icons/folder.svg');
const leftIcon = mapUrl('/media/icons/left.svg');
const rightIcon = mapUrl('/media/icons/right.svg');
const saveIcon = mapUrl('/media/icons/save.svg');
const sendIcon = mapUrl('/media/icons/send.svg');
const timeIcon = mapUrl('/media/icons/time.svg');
const tryIcon = mapUrl('/media/icons/try.svg');

function SubmitCard() {
  const [isHidden, setIsHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [customError, setCustomError] = useState(undefined);
  const [data, setData] = useState({});
  const url = window.location.href;

  useEffect(() => {
    const load = async () => {};
    load();
  }, [url]);

  const setDatum = (name, value) => setData({ ...data, [name]: value });
  const onChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value || target.innerText;
    setDatum(name, value);
  };

  return (
    <div className={`m-submit-card ${isHidden ? '' : 'm-card-exposed'}`}>
      <div className="m-vertical-center">
        <button
          className="m-drawer-button"
          onClick={() => setIsHidden(!isHidden)}
        >
          <img src={isHidden ? leftIcon : rightIcon} />
        </button>
      </div>
      <div className="m-flex-1">
        {customError ? <CustomErrorView customError={customError} /> : null}

        <form>
          <div className="m-spaced-flex">
            <LabelledInput
              input={
                <input
                  type="number"
                  min="0"
                  name="submissions"
                  className="m-flex-1"
                  onChange={onChange}
                  required={true}
                  value={data.submissions || ''}
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
                  onChange={onChange}
                  required={true}
                  value={data.minutes || ''}
                />
              }
              label="Minutes"
              className="m-flex-1"
            />
          </div>
          <div className="m-spaced-flex">
            <LabelledInput
              input={
                <input
                  type="text"
                  name="fileName"
                  onChange={onChange}
                  required={true}
                  value={data.fileName || ''}
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
                  onChange={onChange}
                  required={true}
                  value={data.fileExtension || ''}
                />
              }
              label="Extension"
              className="m-flex-1"
            />
          </div>

          <FolderTree />
          <CreateNewFolder />

          <button type="submit" onClick={(e) => 1 + 1}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitCard;
