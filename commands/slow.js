const { colors } = require('../config.json')

module.exports = {
	name: 'slow',
	aliases: ['slowmode'],
	permissions: ['MANAGE_CHANNELS'],
	execute(message, args, client, Discord) {
		
		// All embeds
		const noTime = new Discord.MessageEmbed()
		.setColor(colors.false)
		.setDescription('Please specify the amount of seconds!');

		const isNan = new Discord.MessageEmbed()
		.setColor(colors.false)
		.setDescription('Please enter a **real** number!');

		const toLarge = new Discord.MessageEmbed()
		.setColor(colors.false)
		.setDescription('Please enter a number less than **21600** seconds!');

		const slowEmbed = new Discord.MessageEmbed()
		.setDescription(`Slowmode has been set to **${args[0]}** seconds.`)
		.setColor(colors.base);

		// Check if a time has been provided and if it is a number smaller than 21600
		if (!args.length) return message.channel.send({embeds: [noTime]});
		if (isNaN(args[0])) return message.channel.send({embeds: [isNan]});
		if (args[0] > 21600) return message.channel.send({embeds: [toLarge]});

		// Define a channel, either provided or current. After set slowmode.
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel
		channel.setRateLimitPerUser(args[0]);
		message.channel.send({embeds: [slowEmbed]})
		message.react('⌛')

		// type, channel, offender, author, time, reason
		client.handleLogs('Slowmode', channel, null, message.author, args[0] + 's', null);

	}
}