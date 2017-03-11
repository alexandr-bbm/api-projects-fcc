const path = require('path');
const router = require('express').Router();

const timestamp = require('./timestamp');

router.get(`/`, (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

router.get(`/:input`, (req, res) => {
	const { input } = req.params;
	const result = timestamp(input);
	res.send(result);
});

module.exports = router;