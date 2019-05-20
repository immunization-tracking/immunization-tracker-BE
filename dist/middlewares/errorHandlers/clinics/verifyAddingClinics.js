'use strict';

module.exports = (req, res, next) => {
	if (req.body.name) {
		next();
	} else {
		res.status(400).json({
			message: 'Clinic name is required'
		});
	}
};