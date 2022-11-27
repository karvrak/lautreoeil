const Discord = require('discord.js')
const fs = require('fs')


module.exports = {
    name: 'play',
    description: 'permet au bot de jouer une musique spotify',
    permission: 'Aucune',
    dm: false,

    async run(bot,message, args, db) {
        
    let str = ''
    let Embed = new Discord.EmbedBuilder()
    .setColor(bot.color)
    .setTitle('Help-')
    .setTimestamp()
    fs.readdirSync("Commands").filter(f => f.endsWith(".js")).forEach(async file => {
        
        let command = require(`../Commands/${file}`)
        if(! command.name || typeof command.name !== 'string') throw new TypeError(`la commande ${file.slice(0,file.length - 3)} n'a pas de nom`)
        Embed.addFields({name: command.name, value: command.description},{ name: '\u200B', value: '\u200B' })

    })
        await message.reply({embeds: [Embed]})
    }   

}