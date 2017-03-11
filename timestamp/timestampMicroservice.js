const moment = require('moment');
const dateFormat = 'MMMM DD, YYYY';

module.exports = (input) => {
	let m = moment.unix(input);
	if (!m.isValid()) {
		m = moment(input, dateFormat);
	}
	if (m.isValid()) {
		return {
			unix: m.unix(),
			natural: m.format(dateFormat),
		};
	}
	return null;
};
