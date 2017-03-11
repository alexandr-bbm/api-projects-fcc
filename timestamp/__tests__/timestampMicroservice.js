const timestampMicroservice = require('../timestamp');

describe('timestamp', () => {
	it('should return correct unix and natural for unix input', () => {
		const input = 1450137600;
		const result = timestampMicroservice(input);

		expect(result).toEqual(
			{ "unix": 1450137600, "natural": "December 15, 2015" }
		)
	});
	it('should return correct unix and natural for natural input', () => {
		const input = 'December 15, 2015';
		const result = timestampMicroservice(input);

		expect(result).toEqual(
			{ "unix": 1450112400, "natural": "December 15, 2015" }
		)
	})
});