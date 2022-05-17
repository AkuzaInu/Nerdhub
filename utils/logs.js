const { logChannelId, colors, logPreferences } = require('../config.json')

module.exports = (client, Discord) => {
	client.handleLogs = async (type, channel, offender, author, time, reason) => {

		let description = ``;

		// Check if given arguments are not equal to null, if so add it to description.
		if (author !== null) description += `**Staff:** ${author}\n`;
		if (channel !== null) description += `**Channel:** ${channel}\n`;
		if (offender !== null) description += `**Offender:** ${offender}\n`;
		if (type !== null) description += `**Type:** ${type}\n`;
		if (time !== null )description += `**Time:** ${time}\n`;
		if (reason !== null) description += `**Reason:** ${reason}`;

		// If the used command has logPreferences = true, send logEmbed.
		if(logPreferences[type]) {
			const logEmbed = new Discord.MessageEmbed()
			.setColor(colors.logs)
			.setTitle('Mod log')
			.setDescription(description);

			client.channels.cache.get(logChannelId).send({embeds: [logEmbed]});
		}
	}

}