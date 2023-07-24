import React, { useState, useEffect } from 'react';

function Finish() {
  const [hasFinished, setHasFinished] = useState(false);

  return (
    <div>
      {hasFinished ? (
        <p>You are good to go!</p>
      ) : (
        <button onClick={() => setHasFinished(true)}>Done</button>
      )}
    </div>
  );
}

export default Finish;
