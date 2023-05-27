// THIS EVENT IS EXECUTED WHEN A USER INTERACTS WITH A SLASH COMMAND

// Get Events from DJS
const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		// Get the command from the client.commands Collection
		const command = interaction.client.commands.get(interaction.commandName);

		// If no command is found, log the error and return nothing
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		// Try to execute the command
		try {
			// Execute the command
			await command.execute(interaction);
		} 
		// Catch and log any errors when executing the command
		catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};