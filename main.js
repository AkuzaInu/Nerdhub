const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, 
Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MEMBERS],
partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const { Token } = require('./config.json');

// Create new collections.
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

// Readdirsync for functions, events, commands and utils
const functions = fs.readdirSync("./functions").filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));
const utils = fs.readdirSync("./utils").filter(file => file.endsWith('.js'));

(async () => {
	for (file of functions) {
		require(`./functions/${file}`)(client, Discord);
	}

	for (file of utils) {
		require(`./utils/${file}`)(client, Discord);
	}

	// Launch bot
	client.handleEvents(eventFiles, "../events");
	client.handleCommands(commandFiles, "../commands");
	client.login(Token);
})();
