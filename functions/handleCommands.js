module.exports = (client) => {
	client.handleCommands = async (commandFiles, path) => {
		for (const file of commandFiles) {
			const command = require(`${path}/${file}`);
			
			if(command.name){
			client.commands.set(command.name, command);
			} else {
				continue;
			}
		}
	}
}