import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Timer from '../timer/Timer.jsx';

function ViewSelector() {
  const PageStates = {
    //enumish
    inQuestionPage: 'in-question-page',
    inSubmissionsPage: 'in-submissions-page',
    inNietherPage: 'in-niether-page',
  };
  const [currentPage, setCurrentPage] = useState(PageStates.inNietherPage);

  return <Timer />;
}

//add to leetcode page
const div = document.createElement('div');
document.body.appendChild(div);

const root = createRoot(div);
root.render(<ViewSelector />);
