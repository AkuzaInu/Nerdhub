module.exports = {
	name: 'messageCreate',
	once: false,
	execute(message, client, Discord) {

		const { prefix } = require('../config.json');

		if(!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).split(/ +/);
		const cmd = args.shift().toLowerCase();
		const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));;
		
		if (command) {
			if (command.permissions) {
				for (const perm of command.permissions) {
					if (!message.member.permissions.has(perm)) {
						return message.channel.send("You don't have permission to do that!");
					}
				}
				command.execute(message, args, client, Discord);
				
			} else {
				command.execute(message, args, client, Discord);
			}
			
		}
	}
}