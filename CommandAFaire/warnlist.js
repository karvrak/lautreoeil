const Discord = require('discord.js');

module.exports = {
    name: 'warnlist',
    description: 'warnlis dun user',
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    option: [
       {
            type: 'user',
            name: 'membre',
            description: 'user a warn',
            required: true
       },{
        type: 'user',
        name: 'test',
        description: 'test',
        required: false
   }
    ],

    async run(bot,message, args, db) {

        let user = args.getUser("membre");
        if(!user) return message.reply("pas de user !");
        let member = message.guild.members.cache.get(user.id);
        if(!member) return message.reply("pas de membre!");

        db.query(`SELECT * FROM warns WHERE user=${user.id}`, async (err,req) => {
            
            if(!req || req.length == 0) return message.reply("ce membre na pas de warn!");

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Warns de ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setFooter({text: `warns`})

            for(let i = 0; i < req.length; i++) {
            
                Embed.addFields([{name:`Warn nb ${i+1}`, value:`-**Auteur**: ${await bot.users.fetch(req[i].author)} \n-**Raison**: \`${req[i].reason}\` \n-**ID**: \`${req[i].warn}\` \n-**Date**: <t:${Math.floor(parseInt(req[i].date)/1000)}:F>`}])
            }

            await message.reply({embeds: [Embed]})
        })

    }
}