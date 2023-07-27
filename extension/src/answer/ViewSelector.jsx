import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Timer from '../timer/Timer.jsx';
import SubmitCard from '../answer-submit/SubmitCard.jsx';

import '../assets/style.css';

function ViewSelector() {
  //enumish
  const PageStates = {
    inQuestionPage: 'in-question-page',
    inSubmissionsPage: 'in-submissions-page',
    inNietherPage: 'in-niether-page',
  };
  const [currentPage, setCurrentPage] = useState(PageStates.inNietherPage);

  useEffect(() => {
    console.log('use-effect-view-selector');
    const setPage = (url) => {
      if (matchesQuestionPage(url)) {
        setCurrentPage(PageStates.inQuestionPage);
      } else if (matchesSubmissionPage(url)) {
        setCurrentPage(PageStates.inSubmissionsPage);
      } else {
        setCurrentPage(PageStates.inSubmissionsPage);
      }
    };
    setPage(window.location.href);
    navigation.addEventListener('navigate', (event) =>
      setPage(event.destination.url)
    );
  }, []);

  if (currentPage == PageStates.inQuestionPage) {
    return <Timer />;
  } else if (currentPage == PageStates.inSubmissionsPage) {
    return <SubmitCard />;
  } else {
    return null;
  }
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
