const { colors, prefix } = require('../config.json');

module.exports = {
	name: 'unlock',
	aliases: ['unlockdown'],
	permissions: ['MANAGE_CHANNELS'],
	execute(message, args, client, Discord) {

		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel

		channel.permissionOverwrites.edit(message.guild.id, {'SEND_MESSAGES': null})

		const unlocked = new Discord.MessageEmbed()
		.setDescription(`**This channel is removed from lockdown mode!**:unlock:
			\nEveryone is allowed to view the channel and send messages again.
			If you wish to lock the channel again, use **${prefix}lock**.`)
		.setColor(colors.base);

		channel.send({embeds: [unlocked]})
		message.react('🔓');

		// type, channel, offender, author, time, reason
		client.handleLogs('Unlocked channel', channel, null, message.author, null, null);

	}
}