const { Events } = require('discord.js');

console.log('called ready.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute (client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};