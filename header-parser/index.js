const path = require('path');
const router = require('express').Router();

router.get(`/`, (req, res) => {
	const result = {
		"ipaddress": getIp(req),
		"language": req.headers['accept-language'].split(',')[0],
		"software": findFirstInsideBrackets(req.headers['user-agent'])
	};
	res.send(result);
});

const getIp = (req) => {
	let ipAddr = req.headers["x-forwarded-for"];
	if (ipAddr){
		const list = ipAddr.split(",");
		ipAddr = list[list.length-1];
	} else {
		ipAddr = req.connection.remoteAddress;
	}
	return ipAddr;
};

const findFirstInsideBrackets = (str) => {
	const result = str.match(/\((.*?)\)/)[1];
	return result ? result : null;
};

module.exports = router;