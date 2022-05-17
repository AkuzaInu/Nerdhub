const { roleChannelId } = require('../config.json')

module.exports = {
	name: 'messageReactionRemove',
	once: false,
	async execute(reaction, user, client, Discord) {
		if (reaction.message.partial) await reaction.message.fetch();
		if (reaction.partial) await reaction.fetch();
		if (user.bot) return;
		if (!reaction.message.guild) return;

		if (reaction.message.channel.id == roleChannelId) {
			client.removeRole(reaction, user, reaction.emoji.name)
		}


	}
}