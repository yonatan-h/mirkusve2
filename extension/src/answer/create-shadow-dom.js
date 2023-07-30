//To avoid fighting leetcodes css
const shadowHost = document.createElement('div');
shadowHost.id = 'mirkusve-shadow-host';

const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

document.body.appendChild(shadowHost);
