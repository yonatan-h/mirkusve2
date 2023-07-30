import React from 'react';
import { createRoot } from 'react-dom/client';

//Css style tags are inserted to the shadow root
// so do that after shadow root is created first
import './create-shadow-dom.js';
import ViewSelector from './ViewSelector.jsx';

//to avoid overriding <style> tags?
const div = document.createElement('div');
const shadowRoot = document.getElementById('mirkusve-shadow-host').shadowRoot;
shadowRoot.appendChild(div);

const root = createRoot(div);
root.render(<ViewSelector />);
