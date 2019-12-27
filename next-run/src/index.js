import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import './index.css';
import CourtDetailsContainer from './components/CourtDetailsContainer';

// // Import serviceWork for PWA
// import * as serviceWorker from '../public/serviceWorker';

// Import semantic UI CSS
import "semantic-ui-css/semantic.min.css";

const routing = (
  <Router>
    <div>
      <li>
        <Link to="/">Update Location</Link>
      </li>
      <Route path="/" component={App} />
      <Route path="/courts/:courtID" component={CourtDetailsContainer}/>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);


// //TODO: Use to acitivate service worker for PWA
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
