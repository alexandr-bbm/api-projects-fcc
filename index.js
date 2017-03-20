const path = require('path');
const app = require('express')();

const ROUTES = [
	'timestamp',
	'header-parser',
	'url-shortener',
];

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

ROUTES.forEach(route => {
	app.use(`/${route}`, require(`./${route}`));
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Example app listening on port 3000!');
});

module.exports = app;