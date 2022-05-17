const { roleChannelId } = require('../config.json')

module.exports = {
	name: 'messageReactionAdd',
	once: false,
	async execute(reaction, user, client, Discord) {
		if (reaction.message.partial) await reaction.message.fetch();
		if (reaction.partial) await reaction.fetch();
		if (user.bot) return;
		if (!reaction.message.guild) return;

		if (reaction.message.channel.id == roleChannelId) {
			client.addRole(reaction, user, reaction.emoji.name)
		}


	}
}