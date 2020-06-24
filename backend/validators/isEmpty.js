const isEmpty = value =>
	value === undefined ||
	value === null ||
	(typeof value === 'object' && Object.keys(value).length === 0) || //Empty object
	(typeof value === 'string' && value.trim().length === 0); //Empty String
module.exports = isEmpty;