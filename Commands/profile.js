const Discord = require('discord.js');
const img = new Discord.AttachmentBuilder(`../assets/leagueRank/GOLD.png`,{name: 'GOLD.png'});
const axios = require('axios')
const EloToString = require('../Fonctions/EloToString');
const getRankURL = require('../Fonctions/getRankURL');
require('dotenv').config();

module.exports = {
    name: 'profile',
    description: 'Affiche votre profile',
    permission: 'Aucune',
    dm: false,
    option: [
        {
             type: 'user',
             name: 'membre',
             description: `voir le profil d'un autre zin`,
             required: false
        }
     ],

    async run(bot,message, args, db) {
   
        let argUser = args.getUser("membre");
        let user = message.user.id;
        let isLolProfil = false;

        if(argUser){
            user = argUser.id;
        }

        //si le membre a associé son compte lol , afficher son profil lol
        db.query(`SELECT * FROM league_profile WHERE user = ${user}`, async (err,req) =>{
            var embed = new Discord.EmbedBuilder();

            if(!(req <1)){
                isLolProfil = true;
                id = req[0].id
                pickelo = req[0].pick_elo

                const profile = await axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${id}?api_key=${process.env.APIRIOT}`);   
                const rank = await axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.APIRIOT}`);  

                let idRank = 100;
                if (rank.data.length >0){
                    for(i = 0; i< rank.data.length; i++) {
                        if(rank.data[i].queueType === "RANKED_SOLO_5x5"){
                            idRank = i;
                        }
                    }
                }

                embed.setAuthor({name: `${profile.data.name}`, iconURL:`https://ddragon.leagueoflegends.com/cdn/12.21.1/img/profileicon/${profile.data.profileIconId}.png`})
                .addFields({name: `__Niveau d'invocateur__`, value: `${profile.data.summonerLevel}`});

                if(idRank < 10) {
                    embed.setThumbnail(getRankURL(rank.data[idRank].tier))
                    .addFields([
                        {name:`__current elo__`, value: `${EloToString(rank.data[idRank].tier,rank.data[idRank].rank,rank.data[idRank].leaguePoints)}`,inline: true},
                        {name:`__pick elo__`, value: pickelo ,inline: true} ])
                    .setImage(getRankURL(rank.data[idRank].tier))
                    .addFields({ name: '\u200B', value: '\u200B ' },{name:`__game__`, value:`${rank.data[idRank].wins + rank.data[idRank].losses}`, inline: true},{name:`__winrate__`, value:`${parseFloat((rank.data[idRank].wins*100)/(rank.data[idRank].wins + rank.data[idRank].losses)).toFixed(2)}%`, inline: true});
                }

            }
            db.query(`SELECT * FROM level_vocal WHERE user = ${user}`, async (err,req) =>{
                if(req<1) return message.reply('tu doit te connecter en vocal pour activer ton profil !')
                if(!isLolProfil){
                    embed.setAuthor({name: `${message.user.username}`, iconURL:`https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png`})
                    .setThumbnail(`https://i.pinimg.com/originals/d7/58/1b/d7581b2a1033309523d20c9d1a1f4589.png`)
                }
                xp = req[0].xp;
                level = req[0].level;
                timestamp = req[0].timestamp;
                currentSession = req[0].session;

                embed.addFields([{ name: '\u200B', value: '\u200B' },{name: '__level__', value: `**${level}**`, inline: true},{name: '__xp__', value: `**${parseFloat(xp).toFixed(2)}**`, inline: true}])

                if(currentSession>0){
                    let time = (Date.now()- currentSession)/60000;
                    
                    let str = `${parseInt(time/60)}:${parseInt(time%60)}`;
                    embed.addFields({name: '__current session__', value: `**${str}**`, inline: true})
                }
                embed.addFields({ name: '\u200B', value: '\u200B' })
                .setTimestamp()
                message.reply({embeds: [embed]});

            }) 
            
        })
        
        
       
        
       
    }
}