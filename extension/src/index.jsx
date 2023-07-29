import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import FolderTree from './answer-submit/components/FolderTree.jsx';
import './assets/style.css';
import './answer-submit/style.css';
import CreateNewFolder from './answer-submit/components/CreateNewFolder.jsx';

function App() {
  const [state, setState] = useState(0);

  return (
    <div className="m-submit-card m-card-exposed">
      <div>sdf</div>
      <div className="m-flex-1">
        <p>adsf</p>
        <p>adsf</p>
        <p>adsf</p>
        <p>adsf</p>

        <CreateNewFolder />

        <FolderTree
          folderPaths={[
            //
            '/',
            'abebe/kebede/lemma',
            'abebe/kebede',
            'abebe',
            'abe3be',
            'abeb4e',
            'a5bebe',
            'ab6ebe',
            'abe7be',
            'abeb8e',
          ]}
          data={{ folderPath: 'abebe/kebede' }}
        />
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
