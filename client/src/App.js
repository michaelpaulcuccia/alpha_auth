import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import Header from './components/layout/Header';
import Landing from './components/layout/Landing';
import Dashboard from './components/layout/Dashboard';


const App = ({ fetchUser }) => {

  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path='/' component={Landing} />
          <Route exact path='/dashboard' component={Dashboard} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default connect(null, actions)(App);