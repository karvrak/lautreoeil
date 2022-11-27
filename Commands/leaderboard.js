const Discord = require('discord.js');

module.exports = {
    name: 'leaderboard',
    description: 'affiche le leaderboard',
    permission: 'Aucune',
    dm: false,

    async run(bot,message, args, db) {

        db.query(`SELECT * FROM level_vocal ORDER BY level DESC LIMIT 5 ; `, async(err,req) =>{

            if(req < 1) return message.reply('pas de memnbre')

            let str = ''

            let embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`**leaderbord**`)
            .setTimestamp()

            for(i = 0 ; i<req.length ; i++){

                embed.addFields([{name:`${i+1}`, value:`--${await bot.users.fetch(req[i].user)}--\n**Level** \`${req[i].level}\` \n**XP BARRE**  \n`},{name: '\u200B', value: '\u200B '}])

            }
            message.reply({embeds: [embed]});

        });
       
    }
}