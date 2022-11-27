const Discord = require('discord.js');
const ms = require('ms');
module.exports = {
    name: 'mute',
    description: 'mute un user',
    permission: Discord.PermissionFlagsBits.ManageMessages ,
    dm: false,
    option: [
       {
            type: 'user',
            name: 'membre',
            description: 'user to mute',
            required: true
       },{
            type: 'string',
            name: 'time',
            description:'mute time',
            required: true
       },{
            type: 'string',
            name: 'votetime',
            description:'temps pour proceder au vote',
            required: true
       },{
        type: 'string',
        name: 'raison',
        description:'raison du mute',
        required: false
        }
    ],


    async run(bot,message, args, db) {

        //récuperation des args user et time + vérif
        let user = args.getUser("membre")
        if(!user) return message.reply("pas de user")

        let time = args.getString('time')
        if (!time) return message.reply("pas de time")
        if(isNaN(ms(time))) return message.reply("pas le bon format !")
        if(ms(time)>2419200000) return message.Reply("mute trop long")
        
        let votetime = args.getString('votetime')
        if(isNaN(ms(votetime))) return message.reply("pas le bon format !")
        if(ms(votetime)>600000) return message.Reply("mute trop long")
        if (!votetime) vote = '30000'

        //récuper le membre discord grace a l'user id
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("pas de membre")

        console.log(`membre:\n${member.moderatable}}`)
        
        //récupere la raison du mute 
        let reason = args.getString('raison')
        if(!reason) reason ='pas de raison'

        //vérif si user a mute = user qui mute
        if(message.user.id === user.id) return message.reply("tu ne peut pas te mute ")
    
        //vérif si user a mute = owner du server
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("tu ne peux pas mute mich")

        //vérif si on peut modéré le membre a mute
        if(!member.moderatable) return message.reply("tu ne peut pas mute ce membre")

        //vérif que la personne qu'on mute n'a pas un plus haut grade
        if(message.member.roles.highest.comparePositionTo(member.roles.highest)<=0) return message.reply("tu ne peut pas mute tes supperieur")

        //vérif que l'user est pas deja mute
        if(member.isCommunicationDisabled()) return message.reply("il est deja mute ")


        //envoie un dm pour annoncer le mute
        //try { await user.send(`Tu a été mute par ${message.user.tag}`)} catch(err){}


        //envoie un message dans le discord pour annoncer le mute
        await message.reply(`${user.tag} vas etre mute pour la raison : \`${reason}\` \n votez pour prendre la decision , vous avez \`${votetime}\``)
        
        
        //mute user
        await member.timeout(ms(time),reason)
    }
}