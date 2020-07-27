require('dotenv').config();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const APIKEY = process.env.APIKEY;

const Discord = require('discord.js');
const bot = new Discord.Client();

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

  if (message.content.substring(0, 2) === 't$') {

    var args = message.content.substring(3).split(' ');
    var cmd = args[0];
    var argument = args[1];
    for(var i = 2; i < args.length; i++)
    {
      argument = argument + ' ' + args[i];
    }

    //test if cmd is valid
    switch(cmd) {

      case 'price':
        dispCurrentPrice(argument);
        break;
      case 'p':
        dispCurrentPrice(argument);
        break;
      case 'indicies':
        indicies();
        break;
      case 'help':
        getHelp();
        break;
      case 'tnote':
        treasurys();
        break;
      case 'bonds':
        treasurys();
        break;
      case 'sector':
        sectors();
        break;
      case 'choose':
        break;
      default:
      message.channel.send("Cannot find command, use t$ help");
    }
  }

  function getHelp()
  {
    message.channel.send('Use command \"t$ price TICKER\" to check the current trading price of a ticker or company')
  }

  function indicies()
  {

    //var x = [dayPrice, rawChange, percentChange]
    var sp500 = getInfoTicker('GSPC');
    var nasdaqComp = getInfoTicker('QQQ');
    var djia = getInfoTicker('DJIA');
    var tenYrTNote = getInfoTicker('^TNX');

    try{
      message.channel.send(
        '**S&P 500:** ' + sp500[0] + " " + sp500[1] + ' (' + sp500[2] + ')\n'
        + '**QQQ:** $' + nasdaqComp[0] + " " + nasdaqComp[1] + ' (' + nasdaqComp[2] + ')\n'
        + '**Dow:** ' + djia[0] + " " + djia[1] + ' (' + djia[2] + ')\n'
        + '**10 Year T-Note:** ' + tenYrTNote[0] + "% " + tenYrTNote[1] + ' (' + tenYrTNote[2] + ')')
      }
      catch(err)
      {
        console.log(err + "has been caught");
        message.channel.delete();
        message.channel.send("You are sending requests too quickly. Try again later");
      }
    }

    function sectors()
    {
      var url = 'https://www.alphavantage.co/query?function=SECTOR&' +
      'apikey=DEMO'
      var json_obj = JSON.parse(Get(url));
      let combinedTime = [];

      for(let i in json_obj)
      combinedTime.push([i, json_obj[i]]);

      let singleTimeframe = [];
      for(let j in combinedTime[1][1])
      singleTimeframe.push([j, combinedTime[1][1][j]]);

      var finalString = "";
      singleTimeframe.forEach(element => {
        finalString = finalString + element[0] + ": ";
        finalString = finalString + element[1] + "\n";
      });

      let dispDaily = new Discord.MessageEmbed()
      .setTitle('S&P 500 Current Performance by Sector')
      .setColor(0xFF0000)
      .setDescription(finalString);
      message.channel.send(dispDaily);

    }

    function dispDetailPrice()
    {
      if (message.content === 'how to embed') {
        // We can create embeds using the MessageEmbed constructor
        // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
        const embed = new Discord.MessageEmbed()
        .setTitle('A slick little embed')
        .setColor(0xFF0000)
        .setDescription('Hello, this is a slick embed!');
        message.channel.send(embed);
      }
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

function getInfoTicker(ticker)
{
  var url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='
  + ticker.toUpperCase() + '&apikey=' + APIKEY + '&datatype=JSON'
  var json_obj = JSON.parse(Get(url));

  try{
    var dayPrice = json_obj["Global Quote"]["05. price"]
    dayPrice = Number.parseFloat(dayPrice).toFixed(2);
    var rawChange = json_obj["Global Quote"]["09. change"]
    rawChange = Number.parseFloat(rawChange).toFixed(2);
    var percentChange = json_obj["Global Quote"]["10. change percent"]
    percentChange = percentChange.substring(0, percentChange.length-1);
    percentChange = Number.parseFloat(percentChange).toFixed(2);
  } catch (err)
  {
    console.log(err + " has been caught");
    message.channel.send("You are sending requests too quickly. Try again later");
  }

  if(rawChange > 0 && percentChange > 0)
  {
    rawChange = "+" + rawChange;
    percentChange = "+" + percentChange;
  }
  percentChange = percentChange + '%';

  return [dayPrice, rawChange, percentChange];
}

function dispCurrentPrice(company)
{
  //calls symbol search to find the company Name and ticker

  if(company == 'sp500' || company == 's&p 500' || company == 's&p500')
  {
    var spInfo = getInfoTicker('GSPC');
    message.channel.send('**S&P 500 (' + 'GSPC' + ')**\n' +
    'Current Price: $' + spInfo[0] + " " + spInfo[1] + ' (' + spInfo[2] + ')');

  }
  else if(company == 'DJIA' || company == 'dow jones' || company == 'djia')
  {
    var dowInfo = getInfoTicker('DJIA');
    message.channel.send('**Dow Jones Industrial Average (' + 'DJIA' + ')**\n' +
    'Current Price: $' + dowInfo[0] + " " + dowInfo[1] + ' (' + dowInfo[2] + ')');

  }
  else {
    var url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='
    + company + '&apikey=' + APIKEY + '&datatype=JSON'

    var json_obj = JSON.parse(Get(url));

    if(json_obj.bestMatches.length == 0){
      message.channel.send("Error! Cannot Find Company: " + company)
    }
    else {

      var ticker = json_obj.bestMatches[0]["1. symbol"];
      var companyName = json_obj.bestMatches[0]["2. name"];

      //uses global quote to find price
      var url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='
      + ticker.toUpperCase() + '&apikey=' + APIKEY + '&datatype=JSON'
      var json_obj = JSON.parse(Get(url));

      try{
        var dayPrice = json_obj["Global Quote"]["05. price"]
        dayPrice = Number.parseFloat(dayPrice).toFixed(2);
        var rawChange = json_obj["Global Quote"]["09. change"]
        rawChange = Number.parseFloat(rawChange).toFixed(2);
        var percentChange = json_obj["Global Quote"]["10. change percent"]
        percentChange = percentChange.substring(0, percentChange.length-1);
        percentChange = Number.parseFloat(percentChange).toFixed(2);


        if(rawChange > 0 && percentChange > 0)
        {
          rawChange = "+" + rawChange;
          percentChange = "+" + percentChange;
        }
        percentChange = percentChange + '%';

        message.channel.send('**' + companyName + ' (' + ticker + ')**\n' +
        'Current Price: $' + dayPrice + " " + rawChange + ' (' + percentChange + ')');

      }  catch(err)
      {
        console.log(err + " has been caught");
        message.channel.send("You are sending requests too quickly. Try again later");
      }
    }
  }

}
});
