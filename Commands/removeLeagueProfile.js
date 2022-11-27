const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
    name: 'removeleagueprofile',
    description: `permet de dassocier ton compte league`,
    permission: 'Aucune',
    dm: false,
 
    async run(bot, message, args, db) {
    
        db.query(`DELETE FROM league_profile WHERE user=${message.user.id}`);
        message.reply(`Le compte a bien été supprimé de ton profile`)         

    }     
}