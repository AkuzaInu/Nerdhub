const { colors } = require('../config.json');

module.exports = {
	name: 'clear',
	aliases: ['cls'],
	permissions: ['MANAGE_MESSAGES'],
	async execute(message, args, client, Discord) {

		const toLarge = new Discord.MessageEmbed()
		.setColor(colors.false)
		.setDescription("You can't clear more than **10** messages at once.");

		const isNan = new Discord.MessageEmbed()
		.setColor(colors.false)
		.setDescription('Please enter a **real** number.');

		const noAmount = new Discord.MessageEmbed()
		.setColor(colors.false)
		.setDescription('Please specify the amount of messages to clear.');

		const toSmall = new Discord.MessageEmbed()
		.setColor(colors.false)
		.setDescription('You must clear at least one message.');

		if (!args.length) return message.channel.send({embeds: [noAmount]});
		if (isNaN(args[0])) return message.channel.send({embeds: [isNan]});
		if (args[0] > 10) return message.channel.send({embeds: [toLarge]});
		if (args[0] < 1) return message.channel.send({embeds: [toSmall]});

		try {
			const messages = await message.channel.messages.fetch({limit: Number(args[0]) + 1});
			message.channel.bulkDelete(messages);
		} catch (err) {
			console.log(err);
		}

		// type, channel, offender, author, time, reason
		client.handleLogs('Cleared messages', message.channel, null, message.author, null, null);

	}
}