const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database.');
});


let repoSchema = mongoose.Schema({
  repo_id: { type: Number, unique: true },
  name: String,
  url: String,
  description: String,
  stars: Number,
  user: String,
  user_pic: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, cb) => {

  for (let repo of repos) {
    let data = new Repo(repo);
    data.save((err) => {
      if (err) { console.log(`error: duplicate repo ${data.repo_id}`) }
    });
  }
  cb();
};

let grab = () => {
  return Repo.find({})
    .sort('-stars')
    .limit(25)
    .exec()
};

module.exports.save = save;
module.exports.grab = grab;
