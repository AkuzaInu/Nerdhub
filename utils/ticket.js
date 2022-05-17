const { ticketParentId, ticketChannelId, colors } = require('../config.json')

module.exports = (client, Discord) => {

	// Setup ticket embed in ticket channel util
	client.setupTicket = async (message) => {

		const wrongChannelEmbed = new Discord.MessageEmbed()
		.setColor(colors.false)
		.setDescription("You can only use that command in the configured ticket channel.");
		
		const ticketEmbed = new Discord.MessageEmbed()
		.setColor(colors.base)
		.setDescription('To create a ticket click the  :envelope_with_arrow: button below!')
		.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL()});

		const createTicketButton = new Discord.MessageActionRow()
		.addComponents(
			new Discord.MessageButton()
				.setCustomId('createTicketButton')
				.setLabel('Create a ticket')
				.setStyle('SECONDARY')
				.setEmoji('📩')
		);

		if (message.channel.id !== ticketChannelId) return message.channel.send({embeds: [wrongChannelEmbed]})

		const channel = client.channels.cache.get(ticketChannelId);
		await channel.send({embeds: [ticketEmbed], components: [createTicketButton]});
		message.delete()
	}

	// Create a ticket util
	client.createTicket = async (message, tag) => {
		
		const ticketChannelEmbed = new Discord.MessageEmbed()
		.setColor(colors.true)
		.setDescription(`Please describe your problem as detailed as possible.

		*A moderator will come help you as quickly as possible!*`)
		.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL()});

		const closeTicketButton = new Discord.MessageActionRow()
		.addComponents(
			new Discord.MessageButton()
				.setCustomId('closeTicketButton')
				.setLabel('Close')
				.setStyle('DANGER')
				.setEmoji('✖️')
		);

		const createdChannel = await message.guild.channels.create('ticket ' + tag, {type: 'GUILD_TEXT', parent: ticketParentId, permissionOverwrites: [
		{
			id: message.guild.id,
			deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]},
		{
			id: message.member,
			allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]}]
		});
		createdChannel.send({embeds: [ticketChannelEmbed], components: [closeTicketButton]});
	}

	// Close a ticket util
	client.closeTicket = async (message) => {

		const wrongChannelEmbed = new Discord.MessageEmbed()
		.setColor(colors.false)
		.setDescription("You can only use that command in ticket channels."); 

		if (message.channel.parentId !== ticketParentId) return message.channel.send({embeds: [wrongChannelEmbed]})

		await message.channel.delete()
	}

	// Close all tickets util
	client.closeAllTicket = async (message) => {

		const wrongChannelEmbed = new Discord.MessageEmbed()
		.setColor(colors.false)
		.setDescription("You can only use that command in ticket channels.");

		if (message.channel.parentId !== ticketParentId) return message.channel.send({embeds: [wrongChannelEmbed]})

		await message.guild.channels.cache.get(ticketParentId).children.forEach(channel => {if (channel.id !== ticketChannelId) {channel.delete()}})
	}
}