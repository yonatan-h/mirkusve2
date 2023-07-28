import React, { useState, useEffect } from 'react';
import Next from './Next.jsx';
import { EmptyInputError } from '../../utils/custom-errors';
import { groupFinderUrl } from '../../utils/keys.js';
import robustFetch from '../../utils/robust-fetch.js';
import removeExcessSlash from '../../utils/excess-slash.js';

function NameAndGroup({ data, updateData, runBeforeNext, nextIsDisabled }) {
  const setNameAndGroup = async () => {
    if (!data.name) throw new EmptyInputError('name');
    const groupUrl = await fetchGroupUrl(data.name);
    updateData({ groupUrl });
  };

  return (
    <div>
      <h2>Name</h2>
      <p>Write your name exactly as in the A2SV sheets</p>
      <input
        type="text"
        placeholder="eg) Abebe Kebede"
        className="m-small-top w-100"
        onChange={(event) => updateData({ name: event.target.value })}
      />
      <Next
        onClick={() => runBeforeNext(setNameAndGroup)}
        nextIsDisabled={nextIsDisabled}
      />
    </div>
  );
}

export default NameAndGroup;

async function fetchGroupUrl(name) {
  const data = await robustFetch(
    removeExcessSlash(`${groupFinderUrl}&name=${name}`)
  );
  const { url } = data;
  return url;
}
