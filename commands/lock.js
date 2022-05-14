const { colors, prefix } = require('../config.json');

module.exports = {
	name: 'lock',
	aliases: ['lockdown'],
	permissions: ['MANAGE_CHANNELS'],
	execute(message, args, client, Discord) {

		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel

		channel.permissionOverwrites.edit(message.guild.id, {'SEND_MESSAGES': false})

		const locked = new Discord.MessageEmbed()
		.setDescription(`**This channel is now in lockdown mode!**:lock:
			\nOnly administrators are allowed to view the channel and send messages.
			Use **${prefix}unlock** to remove the lockdown.`)
		.setColor(colors.base);

		channel.send({embeds: [locked]})
		message.react('🔒');

		// type, channel, offender, author, time, reason
		client.handleLogs('Locked channel', channel, null, message.author, null, null);

	}
}