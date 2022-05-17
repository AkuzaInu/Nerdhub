module.exports = {
	name: 'interactionCreate',
	once: false,
	execute(interaction, client, Discord) {

		if (!interaction.isButton()) return;

		if (interaction.isButton()) {
			if (interaction.customId === 'createTicketButton') {
				client.createTicket(interaction, interaction.user.tag);
				interaction.deferUpdate();
			}

			if (interaction.customId === 'closeTicketButton') {
				if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
					return interaction.deferUpdate();
				}
				client.closeTicket(interaction);
				interaction.deferUpdate();
			}
				
		}
	}
}