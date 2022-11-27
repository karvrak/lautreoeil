const { messageLink } = require('discord.js');
const discord = require('discord.js');
const axios = require('axios')
const compareElo = require('../Fonctions/compareElo');
const EloToString = require('../Fonctions/EloToString');
require('dotenv').config();
module.exports = (bot, db ) =>{
    return new Promise((resolve) =>{

        db.query(`SELECT * FROM league_profile WHERE id != '0'`, async (err,req) =>{

            //si pas de membre
            if(req.length < 1){
                resolve() 
            } 
            for(i =0; i < req.length; i++){
                //recupere les variables utiles
                let user = ''+req[i].user;
                let id = req[i].id; 
                let pick = req[i].pick_elo;       




                const rank = await axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.APIRIOT}`);  
                let idRank = 100;
                if (rank.data.length >0){
                    for(i = 0; i< rank.data.length; i++) {
                        if(rank.data[i].queueType === "RANKED_SOLO_5x5"){
                            idRank = i;
                        }
                    }
                }
                if(idRank <10){
                    
                    var str = compareElo(pick,EloToString(rank.data[idRank].tier,rank.data[idRank].rank,rank.data[idRank].leaguePoints));
                    
                    if(str !='null'){
                        db.query(`UPDATE league_profile SET pick_elo = '${str}' WHERE user = '${user}'`)
                    }else{
                    } 
                    resolve() 
                }
            }
        });
    });
}