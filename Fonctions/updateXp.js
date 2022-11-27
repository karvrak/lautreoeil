const { messageLink } = require('discord.js');
const discord = require('discord.js');
/*
    Promise [
        recupere tout les user de la table [level_vocal] qui sont connecté (timestamp != 0)
        update leurs variables xp et level 
        update la bd
    ]
*/
module.exports = (bot, db) =>{

        return new Promise((resolve) =>{

            db.query(`SELECT * FROM level_vocal WHERE timestamp != '0'`, async (err,req) =>{

                //si aucun user dans la table
                if(!req){
                    console.log('pas de profil connecté dans la table');

                    resolve();
                }

                for(i =0; i < req.length; i++){
                    //variable recupere de la bd*

                    let user = ''+req[i].user;
                    console.log(user)
                    let xp = parseInt(req[i].xp); 
                    let level = parseInt(req[i].level);
                    let timestamp = parseInt(req[i].timestamp);                
                    //console.log(`user as:\nxp: ${xp}\nlevel: ${level}\ntimestamp ${timestamp}`);
                    
                    //   xp + temps passé vocal en min
                    xp = xp + (Date.now() - timestamp)/60000 ; 

                    while(xp > 60){
                        xp = xp - 60;
                        level++;
                        //bot.channels.cache.get('1037292345139396650').send(`${await bot.users.fetch(user)} est desormais level ${level}!`);
                    }                

                    db.query(`UPDATE level_vocal SET timestamp = ${Date.now()}, xp = ${xp}, level = ${level} WHERE user = '${user}'`, async (err,req)=>{    
                    })
                }
                resolve();
            })
        });

        //meme chose que la premiere mais pour les streams 
        db.query(`SELECT* FROM level_stream WHERE timestamp != '0'`, async (err,req) =>{
            if(!req) return;

            for (int = 0; i< req.length; i++){

                let user = parseInt(req[i].user);
                let xp = parseInt(req[i].xp); 
                let level = parseInt(req[i].level);
                let timestamp = parseInt(req[i].timestamp); 

                xp = xp + (Date.now() - timestamp)/60000 ; 
            
                while(xp > 60){
                    xp = xp - 60;
                    level++;
                    bot.channels.cache.get('1037292345139396650').send(`${await bot.users.fetch(user)} est desormais level ${level} de stream!`)
                }
                   
                de.query(`UPDATE level_stream SET timestamp = ${Date.now()}, xp = ${xp}, level = ${level} WHERE user = ${user}`)
            }
        });
}