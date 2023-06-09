// THIS FILE IS FOR RUNNING THE BOT

// Require the fs module
const fs = require('node:fs');
// Require the path module
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, PresenceUpdateStatus } = require('discord.js');

// Require dotenv to load the .env file
const dotenv = require('dotenv');

// Load the .env file
dotenv.config();

// Import the token from the .env file
const { token } = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages
	],
	presence: {
		activities: [
			{
				name: 'the server come to life!',
				type: 3,
			},
		],
		status: PresenceUpdateStatus.Online,
	},
});

// Define the events variables
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		// console.log('\u001b[1;35m' + event.name + '\u001b[0m')
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		// console.log('\u001b[1;35m' + event.name + '\u001b[0m')
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord with client token
client.login(token);