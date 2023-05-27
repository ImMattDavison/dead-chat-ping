const { Events } = require('discord.js');

// Require dotenv to load the .env file
const dotenv = require('dotenv');

// Load the .env file
dotenv.config();

const cooldown = new Map();
const cooldownTime = 3600;

module.exports =  {
	name: Events.MessageCreate,
	async execute(message) {
		console.log('\u001b[1;34mcalled messageCreate.js\n');

		// Store cooldown
		!cooldown.has(message.guild.id) ? cooldown.set(message.guild.id, 0) : null;

		// Define cooldownIsClean
		const cooldownIsClean = Math.floor(cooldown.get(message.guild.id)) < Math.floor(message.createdTimestamp/1000);

		// Check if message is a ping and if cooldown is clean and if message is not a reply and then send ping
		if (!message.author.bot && message.mentions.has(`${process.env.CLIENT_ID}`) && cooldownIsClean && message.type !== 19) {

			const newCooldown = Math.floor(message.createdTimestamp/1000) + cooldownTime;
			console.log("\u001b[1;33mNew ping!\n\u001b[1;0mchannel: #" + message.channel.name + '\nguild: ' + message.guild.name + '\nfrom user: ' + message.author.username + '#' + message.author.discriminator + '\nmessage: ' + message.content + '\n\u001b[0m')
			message.reply({
				content: `${message.author} pinged <@&${process.env.DCP_ROLE}>!\n\nDead Chat Ping is now disabled until <t:${newCooldown}:t>`,
			});
			cooldown.set(message.guild.id, newCooldown);
			return;

		} 
		// Check if message is a ping and if cooldown is not clean and if message is not a reply and then send cooldown notification
		else if(!message.author.bot && message.mentions.has(`${process.env.CLIENT_ID}`) && !cooldownIsClean && message.type !== 19) {

			message.reply('Dead Chat Ping was sent recently, you can next ping this role <t:' + cooldown.get(message.guild.id) + ':R>');
			return;

		} 
		// If message is irrelevant then return and do nothing
		else {

			console.log('\u001b[1;31mirrelevant message\u001b[0m')
			return;

		}
	},
};