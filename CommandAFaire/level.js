const Discord = require('discord.js');

module.exports = {
    name: 'level',
    description: 'affiche ton level de membre',
    permission: 'Aucune',
    dm: false,

    async run(bot,message, args, db) {

        let user = message.user.id;
        console.log(message.user.id);
        db.query(`SELECT * FROM level_vocal WHERE user=${user}`, async(err,req) =>{
            if(req.length < 1) return message.reply(`tu n'est pas inscrit dans la base de donnée , connecte toi a un vocal pour créer ton profl`)
            
            let level = parseInt(req[0].level);
            let xp = parseInt(req[0].xp);
            let timestamp = parseInt(req[0].timestamp);
            console.log('variable level: ' + level + ' xp: ' + xp + ' timestamp: ' + timestamp);
            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`-${message.user.name}-`)
            .setThumbnail(message.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()

            Embed.addFields([{name:`Level de ${message.user.name}`, value:`-**Level**: \`${level}\` \n-**XP**: \`${xp}\` \n-**connecté en vocal**: <t:${timestamp/1000}:F>`}])
            
            await message.reply({embeds: [Embed]})
        });
       
    }
}
