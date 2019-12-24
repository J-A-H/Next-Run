import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import CourtDetailsContainer from './components/CourtDetailsContainer';

// Import serviceWork for PWA
// import * as serviceWorker from './serviceWorker';

// Import semantic UI CSS
import "semantic-ui-css/semantic.min.css";

<<<<<<< HEAD
import Navbar from 'react-bootstrap/Navbar'
=======
const routing = (
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route path="/courtDetails" component={CourtDetailsContainer} />
    </div>
  </Router>
)
>>>>>>> 922b4f5cae3e25845320847a6f68a3021592b041

ReactDOM.render(
  routing,
  document.getElementById('root')
);

<<<<<<< HEAD
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
=======

//TODO: Use to acitivate service worker for PWA
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
>>>>>>> 922b4f5cae3e25845320847a6f68a3021592b041
