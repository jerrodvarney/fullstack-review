import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
const useEffect = React.useEffect;

const App = () => {

  const [repos, setRepos] = useState([]);


  const search = (term) => {
    console.log(`${term} was searched`);
    post(term, () => {
      get((data) => {
        setRepos(data);
      })
    });
  };

  // HTTP Request Handlers
  const post = (username, successCB, errorCB) => {
    $.ajax({
      url: 'http://127.0.0.1:1128/repos',
      method: 'POST',
      data: JSON.stringify( { 'user': username } ),
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function() {console.log('error posting new user to server')}
    });
  };

  const get = (successCB, errorCB) => {
    $.ajax({
      url: 'http://127.0.0.1:1128/repos',
      method: 'GET',
      dataType: 'json',
      success: successCB,
      error: errorCB || function() {console.log('error getting data from server')}
    });
  };

  useEffect(() => {
    get((data) => {
      console.log(data);
      setRepos(data);
    })
  }, []);

  return (
    <div>
      <Search onSearch={search}/>
      <RepoList repos={repos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));