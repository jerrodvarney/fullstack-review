const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const getRepos = require('../helpers/github').getReposByUsername;
const {grab, save} = require('../database');

// Server Initialization
let app = express();

// Middle-Ware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Display Webpage
app.use(express.static('client/dist'));

// POST Request Handler
app.post('/repos', function (req, res) {
  let username = req.body.user;

  getRepos(username, (data) => {
    let repos = [];

    for (let repo of data) {
      let newRepo = {
        repo_id: repo.id,
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count,
        user: username,
        user_pic: repo.owner.avatar_url
      };

      repos.push(newRepo)
    };

    // adds new repos to the database
    save(repos, () => res.send());
  });
});

// GET Request Handler
app.get('/repos', function (req, res) {

  grab()
    .then((repos) => {
      res.send(JSON.stringify(repos));
    });
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

