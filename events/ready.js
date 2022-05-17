const { prefix, status, activity, activityType } = require('../config.json')

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log('Ready!');
		client.user.setActivity(prefix + activity, { type: activityType });
		client.user.setStatus(status);
	}
}