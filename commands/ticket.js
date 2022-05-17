const { colors } = require('../config.json')

module.exports = {
	name: 'ticket',
	permissions: ['MANAGE_CHANNELS'],
	execute(message, args, client, Discord) {

		const subcommands = ['setup', 'close', 'create', 'closeall'];

		const noArgs = new Discord.MessageEmbed()
		.setColor(colors.false)
		.setDescription('Please enter a subcommand.');

		const unknownSubcommand = new Discord.MessageEmbed()
		.setColor(colors.false)
		.setDescription(`The subcommand \`${args[0]}\` is unknown to me.`);

		if (!args.length) return message.channel.send({embeds: [noArgs]});
		if (!subcommands.includes(args[0].toLowerCase())) return message.channel.send({embeds: [unknownSubcommand]});

		if (args[0] === subcommands[0]) {
			client.setupTicket(message);
		}

		if (args[0] === subcommands[1]) {
			client.closeTicket(message);
		}

		if (args[0] === subcommands[2]) {
			client.createTicket(message, message.author.tag);
		}

		if (args[0] === subcommands[3]) {
			client.closeAllTicket(message);
		}

	}
}