import React, { useState } from 'react';

const Search = ({ onSearch }) => {

  const[term, setTerm] = useState('');

  const onChange = (e) => {
    setTerm(e.target.value);
  };

  const search = () => {
    if (term.length) {
      onSearch(term);
      setTerm('');
    }
  };

  return (
    <div className="search">
      <h1>Github Fetcher</h1>
      <div className="input">
        <input value={term} onChange={onChange} placeholder="Enter a github username..."/>
        <button onClick={search}> Add Repos </button>
      </div>
    </div>
  );
}

export default Search;