const { colors } = require('../config.json');

module.exports = {
	name: 'ban',
	permissions: ['BAN_MEMBERS'],
	async execute(message, args, client, Discord) {
		
		// Check if a reason is provided.
		let reason = args.splice(1).join(' ');
		if (!reason.length) reason = 'None provided';

		// All embeds
		const mentionEmbed = new Discord.MessageEmbed()
		.setColor(colors.false)
		.setDescription('Please mention a user.');

		const notBannableEmbed = new Discord.MessageEmbed()
		.setColor(colors.false)
		.setDescription("You can't ban this user.");

		const banEmbed = new Discord.MessageEmbed()
		.setColor(colors.base)
		.setDescription('The user has been banned.');

		const bannedEmbed = new Discord.MessageEmbed()
		.setColor(colors.base)
		.setDescription(`You have been banned from **${message.guild.name}**.

			**Reason:** ${reason}`)
		.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL()});

		// Check if a member has been mentioned.
		const member = message.mentions.users.first();
		if (!member) return message.channel.send({embeds: [mentionEmbed]});

		// Check if member/target is bannable.
		const target = message.guild.members.cache.get(member.id);
		if (!target.bannable) return message.channel.send({embeds: [notBannableEmbed]});

		const offender = member.tag

		// Send DM to banned member and ban them.
		try {
			await target.send({embeds: [bannedEmbed]});
			await target.ban({reason: reason});
			message.channel.send({embeds: [banEmbed]});
			message.react('👌');

			// type, channel, offender, author, time, reason
			client.handleLogs('Banned member', message.channel, offender, message.author, null, reason);

		} catch (err) {
			console.log(err)
		}
	}
}