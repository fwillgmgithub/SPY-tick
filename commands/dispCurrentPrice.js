const getInfoTicker = require('./getInfoTicker.js');
module.exports = {
	name: 'price',
	description: 'calls symbol search to find the company Name and ticker',
    aliases: ['p'],
	async execute(message, args) {

        if(!args.length){
            return message.channel.send("**You need to specify a company/ticker!** USAGE: t$ price [ticker]");
        }
        
        let infoArr = await getInfoTicker.execute(message, args);

        if(!infoArr || infoArr === undefined) {
            return message.channel.send(`**Error!** Cannot Find Company: ${args.join(' ')}`)
        }
        message.channel.send(`**${infoArr[0]} (${infoArr[1]})**\nCurrent Price: $${infoArr[2]} ${infoArr[3]} (${infoArr[4]})`);
	},
};
