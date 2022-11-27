const Discord = require("discord.js");
const intent = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({intents:intent});
const loadCommands = require("./Loaders/loadCommands");
const loadEvents = require("./Loaders/loadEvents");
require('dotenv').config();
bot.commands = new Discord.Collection();
bot.color = '#ffffff';
bot.login(process.env.TOKEN);
console.log('start');
loadCommands(bot);
loadEvents(bot);




