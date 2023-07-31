import React, { useState, useEffect } from 'react';
import Next from './Next.jsx';

function Finish({ data }) {
  const [hasFinished, sethasFinished] = useState(false);

  return hasFinished ? (
    <TryOut />
  ) : (
    <Next
      onClick={async () => {
        await save(data);
        sethasFinished(true);
      }}
      content={'Finish Setup'}
    />
  );
}

function TryOut() {
  return (
    <div>
      <h2>Setup Finished!</h2>
      <p className="m-small-top">
        Try it out! Pick a leetcode question from A2SV sheets <br /> and use
        Mirkusve to submit your answer.
      </p>
    </div>
  );
}

export default Finish;

async function save(keyValueObject) {
  try {
    await chrome.storage.local.set(keyValueObject);
    const things = await chrome.storage.local.get(keyValueObject);
    alert(JSON.stringify(things));
  } catch (error) {
    throw new CustomError('Could not save setup', error.message);
  }
}
