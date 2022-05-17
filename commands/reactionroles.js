const { colors } = require('../config.json')

module.exports = {
	name: 'reactionroles',
	aliases: ['rr'],
	permissions: ['MANAGE_CHANNELS'],
	execute(message, args, client, Discord) {

		const subcommands = ['setup'];

		const noArgs = new Discord.MessageEmbed()
		.setColor(colors.base)
		.setDescription('Please enter a subcommand.');

		const unknownSubcommand = new Discord.MessageEmbed()
		.setColor(colors.base)
		.setDescription(`The subcommand \`${args[0]}\` is unknown to me.`);

		if (!args.length) return message.channel.send({embeds: [noArgs]});
		if (!subcommands.includes(args[0].toLowerCase())) return message.channel.send({embeds: [unknownSubcommand]});

		if (args[0] === subcommands[0]) {
			client.setupRole(message);
		}
	}
}