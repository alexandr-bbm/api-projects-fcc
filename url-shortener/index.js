const path = require('path');
const router = require('express').Router();
const mongodb = require('mongodb');
const shortid = require('shortid');
const mongo = mongodb.MongoClient;

router.get(`/`, (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

const isUrlValid = url => {
	const urlRegex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
	return urlRegex.test(url);
};

router.get(`/new/*`, (req, res) => {
	const url  = req.params[0];
	if (isUrlValid(url)) {
		mongo.connect(process.env.MONGOLAB_URI)
			.then(db => {
				console.log('Connection established to', process.env.MONGOLAB_URI);
				const urlKey = shortid.generate();
				const document = {
					url: url,
					key: urlKey,
				};
				db.collection('urls')
					.insertOne(document)
					.then(() => res.send({
						original: url,
						short: req.hostname + '/url-shortener/' + urlKey,
					}));
				db.close();
			})
			.catch(err => console.log(err))
	} else {
		res.send({ status: 'error', message: `${url} is not valid url`})
	}
});

router.get(`/:key`, (req, res) => {
	const { key } = req.params;
	mongo.connect(process.env.MONGOLAB_URI)
		.then(db => {
			console.log('Connection established to', process.env.MONGOLAB_URI);
			db.collection('urls')
				.findOne({ key }, { fields: { url: 1 }})
				.then(doc => res.redirect(doc.url));
			db.close();
		})
		.catch(err => console.log(err));
});

module.exports = router;