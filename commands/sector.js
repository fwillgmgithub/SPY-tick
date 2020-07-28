const get = require('./Get.js');
const Discord = require('discord.js');
module.exports = {
	name: 'sector',
	description: 'Gives a breakdown of the 11 sectors of the S&P 500',
	execute(message, args) {

        var url = 'https://www.alphavantage.co/query?function=SECTOR&' +
        'apikey=DEMO'
        var json_obj = JSON.parse(get.Get(url));
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
	},
};
