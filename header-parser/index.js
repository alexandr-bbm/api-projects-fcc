const path = require('path');
const router = require('express').Router();

router.get(`/`, (req, res) => {
	const result = {
		"ipaddress": req.headers['host'],
		"language": req.headers['accept-language'].split(',')[0],
		"software": findFirstInsideBrackets(req.headers['user-agent'])
	};
	res.send(result);
});

const findFirstInsideBrackets = (str) => {
	const result = str.match(/\((.*?)\)/)[1];
	return result ? result : null;
};

module.exports = router;