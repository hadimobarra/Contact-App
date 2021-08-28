import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import { createStore } from 'redux';
import contactReducer from './components/redux/reducers/ContactReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

const store = createStore(contactReducer, composeWithDevTools());


const App = () => {
  return (
    <Provider store={store} >
      <Router>
        <ToastContainer />
        <Navbar />
        <Switch>
          <Route exact path='/' component={() => <Home />} />
          <Route path='/add'>
            <AddContact />
          </Route>
          <Route path='/edit/:id'>
            <EditContact />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
