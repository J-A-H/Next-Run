import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

// Import serviceWork for PWA
// import * as serviceWorker from './serviceWorker';

// Import semantic UI CSS
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


//TODO: Use to acitivate service worker for PWA
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
