const Discord = require ("discord.js")


module.exports = async (bot, interaction) =>{

    if(interaction.type === Discord.InteractionType.ApplicationCommand){
    
        try{

            let command = require(`../Commands/${interaction.commandName}`);
            command.run(bot, interaction, interaction.options,bot.db);
            
        }
        catch(error){

            console.log('///////////////////////////ERROR/////////////////////////////')
            console.error(error);
            console.log('///////////////////////////ERROR/////////////////////////////')

        }

    }
}