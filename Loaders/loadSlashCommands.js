const Discord = require('discord.js')
const{ REST } = require('@discordjs/rest')
const { Routes} = require('discord.js')
module.exports = async bot => {

    let commands = [];


    bot.commands.forEach(async command => {
        console.log(`commande slash a load: ${command.name}`);

        let slashcommand = new Discord.SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description)
        .setDMPermission(command.dm)
        .setDefaultMemberPermissions(command.permission === 'Aucune'? null : command.permission)

        if(command.option?.length > 0){
            for(let i=0; i<command.option.length; i++){
                let c = command.option[i];
                


                slashcommand[`add${c.type.slice(0,1).toUpperCase() + c.type.slice(1, c.type.length)}Option`]
                (option => option.setName(c.name).setDescription(c.description).setRequired(c.required));
            }
        }
        

        await commands.push(slashcommand)
        
    })
    const rest = new REST({version: '10'}).setToken(bot.token)
    await rest.put(Routes.applicationCommands(bot.user.id), {body: commands})
    console.log('SlashCommand Created Success')
}