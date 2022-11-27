const { messageLink } = require('discord.js');
const discord = require('discord.js');

/*
    Promise [
        
        si connection :
            verifie que l'user est dans la table -> l'ajouter si non
            si oui -> set son timestamp dans la table [level_vocal]
        
        si deconnection :
            mettre son timestamp a 0
    ]
*/

module.exports = (bot, db, oldMember, newMember) =>{

        return new Promise((resolve) =>{

            if(oldMember.channelId != newMember.channelId){
                console.log(typeof(newMember.member.user.id))
                //user joined
                if(oldMember.channelId == null){
                    console.log('join')
                    //recupere l'user dans la table [level_vocal] avec son id discord
                    db.query(`SELECT * FROM level_vocal WHERE user = ${newMember.member.user.id}`, async (err,req) =>{
                                 
                        //si le membre n'existe pas, le créer
                        if(req.length < 1){
                            db.query(`INSERT INTO level_vocal (user, xp, level, timestamp,session) VALUES (
                                ${newMember.member.user.id},
                                ${'0'}, 
                                ${'1'}, 
                                ${'0'},
                                ${'0'}
                                )`);
                                console.log(`user ${newMember.member.user.id} successfully added`);
                        }  
                        //sinon set son timestamp       
                        db.query(`UPDATE level_vocal SET timestamp = ${Date.now()},session = ${Date.now()} WHERE user = ${newMember.member.user.id}`);
                    })
                } 

                //user leave
                else if(newMember.channelId == null){
                    
                    //set son timestamp a 0
                    db.query(`UPDATE level_vocal SET timestamp = ${0},session = ${0} WHERE user = '${newMember.member.user.id}'`);
        
                } 
                
                //user switch channel
                else {}   
            }
            resolve();
        })  
}