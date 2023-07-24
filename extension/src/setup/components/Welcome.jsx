import React, { useState, useEffect } from 'react';

function Welcome() {
  return (
    <div>
      <h1>Welcome to mirkusve</h1>
      <div className="m-top">
        <h2>Old Days</h2>
        <div >
          <p className="m-small-top">
            Submitting leetcode questions to A2SV can be a hastle. You have to:
          </p>
          <ul >
            <li>Create a GitHub file</li>
            <li>Submit the file link</li>
            <li>Write number of tries</li>
            <li>Write time spent on the question </li>
          </ul>
        </div>
      </div>

      <div className="m-top">
        <h2>But now...</h2>
        <div >

        <p className="m-small-top">
          With Mirkusve, you can do this all in two clicks!
        </p>
        </div>
      </div>

      <div className="m-top">
        <h2>How</h2>
        <div >

        <figure className="m-small-top">
          <img src="" alt="time" />
          <figcaption>Keep Track Of Time</figcaption>
        </figure>
        <figure>
          <img src="" alt="time" />
          <figcaption>Choose Github Folder</figcaption>
        </figure>
        <figure>
          <img src="" alt="time" />
          <figcaption>Submit to A2SV sheets & Github</figcaption>
        </figure>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
