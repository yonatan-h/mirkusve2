import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Timer from '../timer/Timer.jsx';
import SubmitCard from '../answer-submit/SubmitCard.jsx';

import '../assets/style.css';

function ViewSelector() {
  //enumish
  const QUESTION_PAGE = 'question-page';
  const SUBMISSION_PAGE = 'answer-page';
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    const setPage = (url) => {
      if (matchesQuestionPage(url)) {
        setCurrentPage(QUESTION_PAGE);
      } else if (matchesSubmissionPage(url)) {
        setCurrentPage(SUBMISSION_PAGE);
      } else {
        setCurrentPage(QUESTION_PAGE);
      }
    };
    setPage(window.location.href);
    navigation.addEventListener('navigate', (event) =>
      setPage(event.destination.url)
    );
  }, []);
  return (
    <>
      <div className={currentPage === QUESTION_PAGE ? '' : 'm-d-none'}>
        {/* more convinient if it counts only in the question page  */}
        <Timer key={Math.random()} />
      </div>
      <div className={currentPage === SUBMISSION_PAGE ? '' : 'm-d-none'}>
        <SubmitCard />
      </div>
    </>
  );
}

function matchesSubmissionPage(url) {
  //https://leetcode.com/problems/two-sum/submissions/54654
  //https://leetcode.com/problems/two-sum/submissions/

  const questionPageRegex = /problems\/[^\/]+\/submissions\/[^\/]*[\/]?$/;
  return url.match(questionPageRegex) != null;
}

function matchesQuestionPage(url) {
  //https://leetcode.com/problems/two-sum/description/
  //https://leetcode.com/problems/two-sum/

  const questionPageRegex = /problems\/[^\/]+\/(description)?[\/]?$/;
  return url.match(questionPageRegex) != null;
}

//add to leetcode page
const div = document.createElement('div');
document.body.appendChild(div);

const root = createRoot(div);
root.render(<ViewSelector />);
