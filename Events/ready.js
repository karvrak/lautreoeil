const Discord = require("discord.js")
const loadSlashCommands = require("../Loaders/loadSlashCommands")
const loadDatabase = require("../Loaders/loadDatabase")

module.exports = async bot => {

    bot.db = await loadDatabase()
    bot.db.connect(function(){

        console.log('BDD connected !')
    })
    await loadSlashCommands(bot)
    console.log(`Logged in as ${bot.user.tag}!`)

}



