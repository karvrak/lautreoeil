const Discord = require('discord.js');
module.exports = {
    name: 'warn',
    description: 'warn un user',
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    option: [
       {
            type: 'user',
            name: 'membre',
            description: 'user a warn',
            required: true
       },{
        type: 'string',
        name: 'raison',
        description: 'raison du warn',
        required: true
   }
    ],


    async run(bot,message, args, db) {

        let user = args.getUser("membre");
        if(!user) return message.reply('pas de user');
        let member = message.guild.members.cache.get(user.id);
        if(!member) return message.reply('pas de membre');

        let reason = args.getString('raison');
        if(!reason) reason = 'pas de raison';

        if(message.user.id === user.id) return message.reply('tu ne peut pas te warn');
        if((await message.guild.fetchOwner()).id === user.id) return message.reply('touche pas au proprio');
        if(message.member.roles.highest.comparePositionTo(member.roles.highest)<=0) return message.reply('tu ne peut pas warn ce membre');
        if((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest)<=0) return message.reply('je ne peut pas warn ce membre');

        await message.reply(`Vous avez warn ${user.tag}`);

        let ID = await bot.function.createId("WARN");

        db.query(`INSERT INTO warns (guild, user, author, warn, reason, date) VALUES ('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`);
    }
}