const Discord = require('discord.js');
const ms = require('ms');
module.exports = {
    name: 'unmute',
    description: 'unmute un user',
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    option: [
       {
            type: 'user',
            name: 'membre',
            description: 'user to unmute',
            required: true
       },{
        type: 'string',
        name: 'reason',
        description:'raison du unmute',
        required: false
        }
    ],


    async run(bot,message, args, db) {

        let user = args.getUser("membre");
        if(!user) return message.reply('pas de membre !');

        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply('pas de membre2!');

        let reason = args.getString('reason');
        if(!reason) reason ='pas de raison';

        if(!member.moderatable)return message.reply('je ne peut rien faire')


        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <=0) return message.reply('je ne peut pas intéragir avec les superieurs')


        if(!member.isCommunicationDisabled()) return message.reply(`l'user n'est pas mute`)

        try{
            await user.send('tu a été unmute') 
        }
        catch(e){
                    console.log(e)
        }

        //await message.reply(`${user.tag} a été unmute pour la raison:\n\`${reason}\``)

        await member.timeout(null, reason)
    }
}