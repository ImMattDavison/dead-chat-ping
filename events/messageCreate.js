const { Events } = require('discord.js');

// Require dotenv to load the .env file
const dotenv = require('dotenv');

// Load the .env file
dotenv.config();

console.log('called messageCreate.js')

const cooldown = new Map();
const cooldownTime = 3600;

module.exports =  {
	name: Events.MessageCreate,
	async execute(message) {
		console.log('called messageCreate.js');

		!cooldown.has(message.guild.id) ? cooldown.set(message.guild.id, 0) : null;

		// Define cooldownIsClean
		const cooldownIsClean = Math.floor(cooldown.get(message.guild.id)) < Math.floor(message.createdTimestamp/1000);

		if (!message.author.bot && message.mentions.has(`${process.env.CLIENT_ID}`) && cooldownIsClean && message.type !== 19) {

			const newCooldown = Math.floor(message.createdTimestamp/1000) + cooldownTime;
			console.log("new ping in\n channel: #" + message.channel.name + '\n guild: ' + message.guild.name + '\n from user: ' + message.author.username + '#' + message.author.discriminator + '\n message: ' + message.content)
			message.reply({
				content: `${message.author} pinged <@&891299458850103347>!\n\nDead Chat Ping is now disabled until <t:${newCooldown}:t>`,
			});
			cooldown.set(message.guild.id, newCooldown);

		} else if(!message.author.bot && message.mentions.has(`${process.env.CLIENT_ID}`) && !cooldownIsClean && message.type !== 19) {

			message.reply('Dead Chat Ping was sent recently, you can next ping this role <t:' + cooldown.get(message.guild.id) + ':R>');

		} else {

			return;

		}
	},
};