const { prefix, activity, activityType } = require('../config.json')

module.exports = {
	name: 'ready',
	once: true,
	async execute() {
		console.log('Ready!');
	}
}