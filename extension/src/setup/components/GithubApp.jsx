import React, { useState, useEffect } from 'react';
import Next from './Next.jsx';
import { githubAppLink } from '../../utils/keys.js';

function GithubApp({ runBeforeNext, nextIsDisabled }) {
  const [hasClickedInstall, setHasClickedInstall] = useState(false);

  const openInstallLink = () => {
    window.open(
      githubAppLink,
      'Mirkusve Github App',
      'width=1600,height=800,status=yes,scrollbars=yes'
    );
  };

  return (
    <div>
      <div>
        <h2>Mirkusve Github App</h2>
        <p className="m-small-top">
          You have to install Mirkusve's Github app on your Github account.
          <br />
          That way, Mirkusve can only access your A2SV repo.
        </p>
        <p className="m-small-top">
          Please <b>only</b> enable access to your <b> A2SV Repo</b>!
        </p>
      </div>

      {hasClickedInstall ? (
        <div className="m-small-top">
          <p>
            ⚠️ If GithubApp was already installed previously , <br /> no
            problem, just ensure it only accesses your A2SV repo.
          </p>
        </div>
      ) : null}

      <button
        className="m-secondary-button m-small-top"
        onClick={() => {
          setHasClickedInstall(true);
          openInstallLink();
        }}
      >
        Install Link
      </button>

      <Next
        onClick={() => runBeforeNext(()=>{})}
        nextIsDisabled={nextIsDisabled}
      />
    </div>
  );
}

export default GithubApp;
