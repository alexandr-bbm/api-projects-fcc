const express = require('express');
const timestampMicroservice = require('./timestampMicroservice');
const page = require('./page');

const app = express();

app.get('/', (req, res) => {
	res.send(page);
});

app.get('/:input', (req, res) => {
	const { input } = req.params;
	const result = timestampMicroservice(input);
	res.send(result);
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});