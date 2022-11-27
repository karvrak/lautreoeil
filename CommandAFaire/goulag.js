const Discord = require('discord.js');

module.exports = {
    name: 'goulag',
    description: 'Send User to the Goulag',
    permission: 'Aucune',
    dm: false,

    async run(bot,message, args, db) {
        await message.reply(`ping: ${bot.ws.ping}`)
    }
}