import React, { useState, useEffect } from 'react';
import Next from './Next.jsx';
import robustFetch from '../../utils/robust-fetch.js';
import { EmptyInputError, CustomError } from '../../utils/custom-errors.js';
import { codeForTokenUrl, githubAppId } from '../../utils/keys.js';
import removeExcessSlash from '../../utils/excess-slash.js';

function GithubAppSignin({
  data,
  updateData,
  runBeforeNext,
  nextIsDisabled,
  goPrevious,
}) {
  const getTokenAndCheckError = async () => {
    const token = await signInAndGetToken(data.userName);
    if (!token) throw EmptyInputError('sign in');

    try {
      await errorIfAccessProblems({
        token,
        repoName: data.repoName || 'competitive-programming',
        githubAppId,
      });
    } catch (error) {
      if (error instanceof GithubAppAccessError) {
        goPrevious();
      }
      throw error;
    }

    updateData({ token });
  };

  return (
    <div>
      <h2>Sign In</h2>
      <p className="m-small-top">
        Sign in to Github, then authorize Mirkusve's Github app.
        <br />
        We need permission so that we can upload your leetcode answer files to
        your repo.
      </p>

      <button
        className={`secondary-button m-small-top ${
          nextIsDisabled ? 'disabled-button' : ''
        }`}
        onClick={() => nextIsDisabled && goPrevious()}
      >
        Back{' '}
      </button>
      <Next
        onClick={() => runBeforeNext(getTokenAndCheckError)}
        nextIsDisabled={nextIsDisabled}
        content={'Sign In'}
      />
    </div>
  );
}

export default GithubAppSignin;

class GithubAppAccessError extends CustomError {
  constructor(descriptionAndSolution, errorAsString) {
    super(descriptionAndSolution, errorAsString);
  }
}

class NotInstalledError extends GithubAppAccessError {
  constructor() {
    super(`You have to Install Mirkusve's Github App first!`);
  }
}

class NoAccessToRepoError extends GithubAppAccessError {
  constructor(repoName) {
    super(
      `Please give Mirkusve's Github App access to ${repoName} (your A2SV repo)`
    );
  }
}

class AccessToOtherReposError extends GithubAppAccessError {
  constructor(repoName, repos) {
    const numPeekRepos = 3;
    const peekRepos = repos.slice(0, Math.min(numPeekRepos, repos.length));

    const addDotDot = repos.length > numPeekRepos;
    super(
      `Please ONLY give access to your A2SV repo (${repoName}). You've given access to ${
        repos.length
      } repos such as ${peekRepos}${addDotDot ? '...' : ''}`
    );
  }
}

async function signInAndGetToken(userName) {
  const redirectedUrl = await getRedirectedUrl(userName);

  const search = new URL(redirectedUrl).search;
  const code = new URLSearchParams(search).get('code');

  const token = await exchangeForToken(code);
  return token;
}

async function errorIfAccessProblems({ token, repoName, githubAppId }) {
  const installationInfo = await getInstallationInfo({ token, githubAppId });

  if (!installationInfo) {
    throw new NotInstalledError();
  }

  const installationId = installationInfo.id;
  const accessibleRepos = await getAccessibleRepos({ installationId, token });

  if (accessibleRepos.length > 1) {
    throw new AccessToOtherReposError(repoName, accessibleRepos);
  }

  if (accessibleRepos.length != 1 || accessibleRepos[0] !== repoName) {
    throw new NoAccessToRepoError(repoName);
  }
}

///

async function getRedirectedUrl(userName) {
  const response = await chrome.runtime.sendMessage({
    message: 'sign-in',
    userName: userName,
  });

  if (response.error) {
    const { descriptionAndSolution, errorAsString } = response.error;
    throw new CustomError(descriptionAndSolution, errorAsString);
  }

  if (!response.redirectedUrl) {
    const message = 'Signin failed. Try signing in again?';
    throw new CustomError(message, responseString);
  }

  return response.redirectedUrl;
}

async function exchangeForToken(code) {
  const tokenUrl = removeExcessSlash(`${codeForTokenUrl}&code=${code}`);
  const data = await robustFetch(tokenUrl);
  return data.accessToken;
}

async function getInstallationInfo({ token, githubAppId }) {
  const data = await robustFetch(`https://api.github.com/user/installations`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
    },
  });
  const mirkusveInstallation = data.installations.find(
    (installation) => installation.app_id === githubAppId
  );

  return mirkusveInstallation;
}

async function getAccessibleRepos({ installationId, token }) {
  const data = await robustFetch(
    `https://api.github.com/user/installations/${installationId}/repositories`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const repoNames = data.repositories.map((repo) => repo.name);
  return repoNames;
}
