const { colors } = require('../config.json');

module.exports = {
	name: 'kick',
	permissions: ['KICK_MEMBERS'],
	async execute(message, args, client, Discord) {
		
		// Check if a reason is provided.
		let reason = args.splice(1).join(' ');
		if (!reason.length) reason = 'None provided';

		// All embeds
		const mentionEmbed = new Discord.MessageEmbed()
		.setColor(colors.false)
		.setDescription('Please mention a user.');

		const notKickableEmbed = new Discord.MessageEmbed()
		.setColor(colors.false)
		.setDescription("You can't kick this user.");

		const kickEmbed = new Discord.MessageEmbed()
		.setColor(colors.base)
		.setDescription('The user has been kicked.');

		const kickedEmbed = new Discord.MessageEmbed()
		.setColor(colors.base)
		.setDescription(`You have been kicked from **${message.guild.name}**.

			**Reason:** ${reason}

			Want to rejoin? Click [here](https://discord.gg/Gm5WffKE52)`)
		.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL()});

		// Check if a member has been mentioned.
		const member = message.mentions.users.first();
		if (!member) return message.channel.send({embeds: [mentionEmbed]});

		// Check if member/target is kickable.
		const target = message.guild.members.cache.get(member.id);
		if (!target.kickable) return message.channel.send({embeds: [notKickableEmbed]});

		const offender = member.tag

		// Send DM to kicked member and kick them.
		try {
			await target.send({embeds: [kickedEmbed]});
			await target.kick();
			message.channel.send({embeds: [kickEmbed]});
			message.react('👌');

			// type, channel, offender, author, time, reason
			client.handleLogs('Kicked member', message.channel, offender, message.author, null, reason);

		} catch (err) {
			console.log(err)
		}
	}
}