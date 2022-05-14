const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]});
const { Token } = require('./config.json');

// Create new collections.
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

// For each handler file in handlers folder, require handler.
// ['command_handler', 'event_handler'].forEach(handler => {
// 	require(`./handlers/${handler}`)(Discord, client);
// });

const functions = fs.readdirSync("./functions").filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));

(async () => {
	for (file of functions) {
		require(`./functions/${file}`)(client, Discord);
	}

	// Launch bot
	client.handleEvents(eventFiles, "../events");
	client.handleCommands(commandFiles, "../commands");
	client.login(Token);
})();
