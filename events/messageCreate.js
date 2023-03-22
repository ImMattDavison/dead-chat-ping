const { Events } = require('discord.js');

module.exports =  {
	name: Events.MessageCreate,
	async execute(message) {
		console.log('called messageCreate.js');
		if (!message.author.bot) {
			console.log("new ping in\n channel: #" + message.channel.name + '\n guild: ' + message.guild.name + '\n from user: ' + message.author.username + '#' + message.author.discriminator + '\n message: ' + message.content)
			message.channel.send({
				content: "Received",
			});
		}
	},
};