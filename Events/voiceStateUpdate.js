const Discord = require ("discord.js");
const updatexp = require('../Fonctions/updateXp');
const channelUpdate = require('../Fonctions/channelUpdate');
const updateLeagueRank = require('../Fonctions/updateLeagueRank');
/*
    Listener voiceStateUpdate [

        update l'xp des membre connecté
        update la db selon l'event
        update le pick elo de tout les joueurs
        
    ]
*/
module.exports = async (bot, oldMember, newMember) => {

    let db = bot.db;

    await updatexp(bot, db, newMember);

    await updateLeagueRank(bot, db);

    console.log('fin')

    channelUpdate(bot, db, oldMember, newMember);


}

