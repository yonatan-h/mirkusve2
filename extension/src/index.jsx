import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [state, setState] = useState(0);

  return (
    <div>
      <button onClick={() => setState(state + 1)}>{state}</button>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
