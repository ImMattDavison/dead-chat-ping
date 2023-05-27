const { Events } = require('discord.js');

// This event executes when the client is ready and logged in
module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute (client) {
        console.log(`\n\u001b[1;36mLogged in as ${client.user.tag}\n\u001b[1;32mInvite your bot: https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot \u001b[0m\n`);
    },
};