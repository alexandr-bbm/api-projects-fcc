const path = require('path');
const app = require('express')();

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/timestamp', require('./timestamp'));

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});

module.exports = app;