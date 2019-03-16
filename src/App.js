import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Alert} from 'antd';
import {getPersons, getDatas} from './Store/Actions/Action';
import Layout from './HOC/Layout';
import LeftPanel from './Components/UI/LeftPanel/LeftPanel';
import RightPanel from './Components/UI/RightPanel/RightPanel';
import Spinner from './Components/UI/Spinner/Spinner';

import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.fetchPersons();
    this.props.fetchDatas();
  }

  render() {

    let errorMessage = this.props.error ? (<div className="error-message"><Alert message={this.props.error} type="error" closable showIcon/></div>) : null;

    let content = <Spinner />;

    if(!this.props.loading) {
      content = (<>
                  {errorMessage}
                  <LeftPanel />
                  <Layout />
                  {this.props.loading ? null : <RightPanel />}
                </>);
    }

    return (
      <div className="App">
        {content}
      </div>
    );

  }
}

const mapStateToProps = state => {
  return {
    persons: state.persons,
    error: state.error,
    loading: state.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPersons: () => dispatch(getPersons()),
    fetchDatas: () => dispatch(getDatas())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
