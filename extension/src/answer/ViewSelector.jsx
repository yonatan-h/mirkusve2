import '../assets/style.css';
import React, { useState, useEffect } from 'react';
import Timer from '../timer/Timer.jsx';
import SubmitCard from '../answer-submit/SubmitCard.jsx';

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
    const setPageFromEvent = (event) => setPage(event.destination.url);

    navigation.addEventListener('navigate', setPageFromEvent);
    setPage(window.location.href);

    return () => navigator.removeEventListener('navigate', setPageFromEvent);
  }, []);

  return (
    <>
      <div className={currentPage === QUESTION_PAGE ? '' : 'd-none'}>
        <Timer inView={currentPage === QUESTION_PAGE} />
      </div>
      <div className={currentPage === SUBMISSION_PAGE ? '' : 'd-none'}>
        <SubmitCard inView={currentPage === SUBMISSION_PAGE} />
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

export default ViewSelector;
