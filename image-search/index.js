const path = require('path');
const router = require('express').Router();

const api = require('./api');
const db = require('./db');

router.get(`/`, (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

router.get(`/latest/`, (req, res) => {
  db.getSearches()
    .then(r => res.send(r))
    .catch(console.log);
});

router.get(`/:query`, (req, res) => {
	const { query }  = req.params;
  const { offset }  = req.query;
  api.getImages(query, offset)
		.then(items => res.send(items))
		.then(() => db.saveSearch(query))
		.catch(console.log);
});

module.exports = router;