import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Contacts from './components/contacts/Contacts';
import Header from './components/layout/Header';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import Test from './components/tests/Test';

import { Provider } from './context';

class App extends Component {
  render() {
    return (
      // Wrapping the Provider component around the whole app for accessing states
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component=
                {Contacts} />

                <Route exact path="/contact/add" component=
                {AddContact} />

                <Route exact path="/contact/edit/:id" component=
                {EditContact} />

                {/* Adding params to route */}
                {/* <Route exact path="/about/:id" component=
                {About} /> */}

                <Route exact path="/about" component=
                {About} />

                <Route exact path="/test" component=
                {Test} />
                
                {/* 404 page, acts like default in a switch statement */}
                <Route component=
                {NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;