import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout'
import Auth from './containers/Auth/Auth';
import Notes from './containers/Notes/Notes';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';


class App extends Component {
  componentWillMount(){
    const data = localStorage.getItem('user');
    if(data){
        this.props.getUserFromLocalStorage(data);
    }
  }
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Notes} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/logout" exact component={Logout} />
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserFromLocalStorage: (data) => dispatch(actions.getUserFromLocalStorage(data))
  }
}

export default connect(null, mapDispatchToProps)(App);
