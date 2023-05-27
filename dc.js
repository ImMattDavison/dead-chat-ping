// THIS FILE IS FOR DEPLOYING COMMANDS TO DISCORD

// Gather necessary imports from DJS
const { REST, Routes } = require('discord.js');
// Require dotenv to load the .env file
const dotenv = require('dotenv');

// Load the .env file
dotenv.config();

// Import the token from the .env file
const token = process.env.DISCORD_TOKEN;
// Require the fs module
const fs = require('node:fs');
// Require the path module
const path = require('node:path');

const commands = [];
// Gather all commands from the commands folder
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Get JSON Command data from each file
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// Deploy commands
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// Fully refresh commands on start
		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands },
		);

		// Report successful refresh
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// Catch and log any errors
		console.error(error);
	}
})();