import React from 'react';
import Repo from './Repo.jsx';

const RepoList = ({ repos }) => (
  <div className="repo-list">
    <h3 className="head">Top 25 Repos</h3>
    {repos.map((repo) => (
        <Repo repo={repo} key={repo.repo_id} />
      ))}
  </div>
)

export default RepoList;