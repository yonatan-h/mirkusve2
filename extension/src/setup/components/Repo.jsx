import React, { useState, useEffect } from 'react';
import { EmptyInputError, CustomError, BadStatusError, BadUrlError } from '../../utils/custom-errors.js';
import Next from './Next.jsx';

function Repo({ data, setDatum, runBeforeNext, nextIsDisabled }) {
  const setRepoInfo = async () => {
    const repoLink = data.repoLink;
    if (!repoLink) throw new EmptyInputError('a2sv repo link');
    errorIfBadUrl(repoLink);
    errorIfWrongOrigin(repoLink, 'https://github.com');
    errorIfBadPath(repoLink);

    //online checks
    const { userName, repoName } = getUserAndRepoName(repoLink);
    const response = await getRepoResponse(userName, repoName);
    errorIfRepoMissing(response, userName, repoName);
    await errorIfTooManyTries(response);
    if (!response.ok) throw new BadStatusError(response);


    setDatum('userName', userName);
    setDatum('repoName', repoName);
  };
  return (
    <div>
      <h2 className='m-big-fs'>A2SV Repo</h2>
      <p className="m-small-top">
        Copy-Paste the link of your A2SV github repository
      </p>
      <p className="smaller-font">
        eg) https://github.com/abebe-kebede/competitive-programming
      </p>
      <input
        className="w-100  m-small-top"
        placeholder="A2SV repo"
        onChange={(event) => setDatum('repoLink', event.target.value)}
      />

      <Next onClick={()=>runBeforeNext(setRepoInfo)} nextIsDisabled={nextIsDisabled} />
    </div>
  );
}

export default Repo;

function errorIfBadUrl(url) {
  try {
    new URL(url);
  } catch (error) {
    throw new BadUrlError(url);
  }
}

function errorIfWrongOrigin(url, correctOrigin) {
  const origin = new URL(url).origin;
  if (origin !== correctOrigin) {
    throw new CustomError(`'${url}' should begin with '${correctOrigin}'`);
  }
}

function errorIfBadPath(repoLink) {
  const path = new URL(repoLink).pathname;
  const pathNodes = path.split('/').filter((node) => node !== '');

  if (pathNodes.length !== 2) {
    throw new CustomError(
      `'${repoLink}' should've been like \r\n 'https://github.com/USER_NAME/REPO_NAME'`
    );
  }
}

function getUserAndRepoName(repoLink) {
  const path = new URL(repoLink).pathname;
  const nonEmpty = (node) => node !== '';
  const [userName, repoName] = path.split('/').filter(nonEmpty);
  return { userName, repoName };
}

async function getRepoResponse(userName, repoName) {
  const repoUrl = `https://api.github.com/repos/${userName}/${repoName}`;
  try {
    return await fetch(repoUrl);
  } catch (error) {
    if (error instanceof TypeError) throw new NetworkError(error);
    else throw error;
  }
}

function errorIfRepoMissing(response, userName, repoName) {
  if (response.status !== 404) return;
  const message = `Mistyped the link? We could'nt find the repo in github (github.com/${userName}/${repoName})`;
  const { ok, status, statusText, url } = response;
  throw new CustomError(
    message,
    JSON.stringify({ ok, status, statusText, url })
  );
}

async function errorIfTooManyTries(response) {
  if (response.status !== 403) return;

  const data = await response.json();
  const message = `Too many tries! Try again in a few hours. You can switch to another wifi and try again too.`;
  const code = JSON.stringify(data);
  throw new CustomError(message, code);
}
