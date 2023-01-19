import React from 'react';

const Repo = ({ repo }) => (
  <div className="repo">
    <a target="_blank" href={repo.url} className="title">
      {repo.user}/{repo.name}
    </a>
    <p className="description">{repo.description}</p>
    <div className="stats">
      <p className="stars"><i className="fa-regular fa-star"></i> {repo.stars}</p>
      <p className="user">Built by: {repo.user}</p>
      <img className="pfp" src={repo.user_pic} width="25px"/>
    </div>
  </div>
)

export default Repo;