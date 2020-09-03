require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const botFlag = 't$ ';

const bot = new Discord.Client();
bot.commandList = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    bot.commandList.set(command.name, command);
}

bot.on('ready', () => {
  console.log(`Logged on!`);
});

bot.login(process.env.DISCORD_TOKEN);

bot.on('message', function(message){

  if (message.content.substring(0, 3) === botFlag) {

    var args = message.content.substring(botFlag.length).trim().split(/ +/);
    var cmd = args.shift().toLowerCase();

    if(!args,length){
        return message.channel.send("You need to specify a command!")
    }

    if(!bot.commandsList.has(cmd)){
            msg.channel.send("Cannot find command, use t$ help");
        }else{
            try{
                bot.commandsList.get(cmd).execute(message, args);
            }catch(err){
                console.error("Caught " + err);
                msg.channel.send(`Error running: ${cmd}.`);
            }
        }
  }


  if(message.content === 'hey siri show me shares of jimmy')
  {
    message.channel.send("**Jimmy Pepper Co (JIMY)**\n" + "Current Price: $0.01 -199999999 (-80000000008.00%)")

  }

  if(message.content === 'hey jimmy')
  {
    message.channel.send(":smirk: :smirk:")

  }

  if(message.content === 'hey')
  {
    message.channel.send("A man👨has fallen😵into the river🏊 in Lego city🌃! Start the new rescue helicopter🚁! Hey!😫Build 🔨the helicopter 🚁and off to the rescue! 🚑Prepare the lifeline💔, lower⬇️ the stretcher, and make the rescue🚑. 🎷🎺The new Emergency Collection from Lego City! 🎷🎺");
  }

});
