const { roleChannelId, reactionroles, colors } = require('../config.json');

module.exports = (client, Discord) => {

	client.setupRole = async (message) => {
		const wrongChannelEmbed = new Discord.MessageEmbed()
		.setColor(colors.false)
		.setDescription("You can only use that command in the configured roles channel.");

		if (message.channel.id !== roleChannelId) return message.channel.send({embeds: [wrongChannelEmbed]});

		for (roleType in reactionroles) {
			let {reactionEmbed, roleNames} = await client.createRoleEmbed(message, reactionroles[roleType], roleType);
			const reactEmbed = await message.channel.send({embeds: [reactionEmbed]});
			for (roleName in roleNames) {
				reactEmbed.react(roleNames[roleName])
			}
		}

		if (message.deletable) return message.delete();
	}

	client.addRole = async (reaction, user, emojiName) => {

		for (type in reactionroles) {
			let roleType = reactionroles[type]
			for (roleName in roleType) {
				if (roleName === emojiName) {
					try {
						const member = reaction.message.guild.members.cache.find(member => member.id === user.id);
	            		member.roles.add([roleType[roleName], '975901310547283978']);
	            	} catch (err) {
	            		console.log(err)
	            	}
				}
			}
		}
	}

	client.removeRole = async (reaction, user, emojiName) => {
		
		for (type in reactionroles) {
			let roleType = reactionroles[type]
			for (roleName in roleType) {
				if (roleName === emojiName) {
					try {
						const member = reaction.message.guild.members.cache.find(member => member.id === user.id);
	            		member.roles.remove(roleType[roleName]);
	            	} catch (err) {
	            		console.log(err)
	            	}
				}
			}
		}
	}

	client.createRoleEmbed = async (message, roleType, roleTypeName) => {
		let embedDescription = '';
		let roleNames = []

		for (roleName in roleType) {
			embedDescription += `${roleName}  **->**  ${message.guild.roles.cache.get(roleType[roleName])}\n\n`
			roleNames.push(roleName);
		}

		let reactionEmbed = new Discord.MessageEmbed()
		.setColor(colors.base)
		.setTitle(roleTypeName.charAt(0).toUpperCase() + roleTypeName.slice(1))
		.setDescription(embedDescription);

		return {reactionEmbed, roleNames}
	}

}