const Discord = require('discord.js');
require('dotenv').config();
const axios = require('axios');
const eloToString = require('../Fonctions/EloToString');
const EloToString = require('../Fonctions/EloToString');
module.exports = {
    name: 'associerleague',
    description: `permet d'associer ton compte league avec ton nom ingame `,
    dm: false,
    option: [
       {
            type: 'string',
            name: 'leagueprofile',
            description: 'ton profile lol',
            required: true
       }   
    ],

    async run(bot, message, args, db) {

        let name = args.getString('leagueprofile');
        if(!name) return message.reply(`Tu n'a pas choisi de compte a associer\n/associerleague [ton nom ingame]`)
        const profil = await axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.APIRIOT}`)
        //const rank = await axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${message.user.id}?api_key=${config.apiriot}`);  
        //const rankStr = EloToString(rank.data.tier, rank.data.rank, rank.data.leaguePoints)
        db.query(`INSERT INTO league_profile (user, id, pick_elo) VALUES ('${message.user.id}', '${profil.data.id}', 'Iron IV 0 Lps')`);
        message.reply(`Le compte **${profil.data.name}** niveau **${profil.data.summonerLevel}** a bien été associé , il est maintenant visible dans ton /profil`)         

    }     
    
}