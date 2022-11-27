const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    description: 'renvoi le ping du bot',
    permission: 'Aucune',
    dm: false,

    async run(bot,message, args, db) {
        await message.reply(`ping: ${bot.ws.ping}`)
    }
}