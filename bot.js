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

function Get(yourUrl){
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET",yourUrl,false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

bot.on('message', function(message){

  if (message.content.substring(0, 3) === botFlag) {

    var args = message.content.substring(botFlag.length).trim().split(/ +/);
    var cmd = args.shift().toLowerCase();

    //test if cmd is valid
    switch(cmd) {

      case 'price':
      case 'p':
        dispCurrentPrice(args);
        break;
      case 'indicies':
        indicies();
        break;
      case 'help':
        getHelp();
        break;
      case 'tnote':
      case 'bonds':
        treasurys();
        break;
      case 'sector':
        sectors();
        break;
      default:
        message.channel.send("Cannot find command, use t$ help");
    }
  }

    function getHelp()
    {
      bot.commandList.get('help').execute(message, args);
    }

    function indicies()
    {
      bot.commandList.get('indicies').execute(message, args);
    }

    function sectors()
    {
      bot.commandList.get('sector').execute(message, args);
    }

    function dispCurrentPrice(company)
    {
      bot.commandList.get('company').execute(message, company);
    }

    function dispDetailPrice()
    {
        //wip
    }

    function treasurys()
    {
      message.channel.send("Select the type of security: `Use t$ choose 1-3`" +
      "\n **1. US T-Bills: ** 1 month - 1 year" +
      "\n **2. US T-Notes: ** 2 years - 10 years" +
      "\n **3. US T-Bonds: ** > 10 years");


      /*
      const filter = m => m.content.startsWith('t$ choose');
      const collector = message.channel.createMessageCollector(filter, { time: 10000, max: 4});

      collector.on('collect', function(choice){

      let menuNum = choice.content.split(' ');
      menuNum = menuNum[2];

      if(menuNum == 1)
      {
      console.log("One");
    }
    else if(menuNum == 2)
    {
    console.log("Two");
  }
  else if(menuNum == 3)
  {
  console.log("Three");
}
else if(menuNum == 4)
{
console.log("Four");
}
else {
message.channel.send("Invalid Argument");
collector.stop("Invalid Argument");
}
//if(choice.content ==  )

});
collector.on('end', function(collected, reason){
console.log(`Collected ${collected.size} of items`);
console.log(`Ended Collection because of ${reason}`);
});
//sub 1 Year
// 1,2,3,6 months
//1 to 10 years
//1 2 3 5 7 years
//10 +
//10 20 30 years

//print yield curve
*/
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
