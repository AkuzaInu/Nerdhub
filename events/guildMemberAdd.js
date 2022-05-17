const { welcomeChannelId, ruleChannelId, infoChannelId, memberRoleId, roleChannelId, colors } = require('../config.json')

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	execute(guildMember, client, Discord) {

		const welcomeEmbed = new Discord.MessageEmbed()
		.setColor(colors.base)
		.setTitle('Welcome to NerdHub')
		.setDescription(`

📔｜Check out our rules at ${guildMember.guild.channels.cache.get(ruleChannelId)}.

📌｜Learn more about the server at ${guildMember.guild.channels.cache.get(infoChannelId)}.

👤｜Make sure you get your roles at ${guildMember.guild.channels.cache.get(roleChannelId)}.

**Enjoy your stay!**`)
		.setAuthor({ name: guildMember.user.tag, iconURL: guildMember.displayAvatarURL()})

		guildMember.guild.channels.cache.get(welcomeChannelId).send({embeds: [welcomeEmbed]})
		guildMember.roles.add(memberRoleId)
	}	
}