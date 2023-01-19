const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username, cb) => {

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios.get(options.url, options.headers)
    .then((res) => {
      cb(res.data);
    });

}

module.exports.getReposByUsername = getReposByUsername;