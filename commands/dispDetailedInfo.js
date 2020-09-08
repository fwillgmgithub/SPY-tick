const getInfoTicker = require('./getInfoTicker.js');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const FINN_APIKEY = process.env.FINN_APIKEY;
module.exports = {
	name: 'info',
	description: 'Gives a detailed breakdown of a stock or ticker',
    aliases: ['i'],
	async execute(message, args) {

        if(!args.length) return message.channel.send("**You need to specify a ticker!** USAGE: t$ info [ticker]");
        if(args.length > 1) return message.channel.send("Tickers only");

        const ticker = args[0].trim().toUpperCase();
        const url1 = `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${FINN_APIKEY}`
        let { exchange, shareOutstanding, weburl, logo, name } = await fetch(url1).then(response => response.json());
        if(!name) return message.channel.send(`Error: Cannot find ticker ${ticker}`);

        if(exchange === 'NEW YORK STOCK EXCHANGE, INC.') exchange = 'NYSE';
        else if(exchange === 'NASDAQ NMS - GLOBAL MARKET') exchange = 'NASDAQ';

        let infoArr = await getInfoTicker.execute(message, args);

        const url2 = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${FINN_APIKEY}`;
        const{ o, h, l, t, pc, c } = await fetch(url2).then(response => response.json());

        const dateObj = new Date(t * 1000);
        const time = dateObj.toLocaleString();

        let marketCapitalization = formatNumber(shareOutstanding * 1000000 * c);
        shareOutstanding = formatNumber(shareOutstanding * 1000000);

        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
        	.setTitle(name)
        	.setURL(weburl)
            .setDescription(`Current Price: $${infoArr[2]} ${infoArr[3]} (${infoArr[4]})`)
        	.setThumbnail(logo)
        	.addFields(
        		{ name: `${exchange}: ${ticker}`,
                value:
                `Open: $${o.toFixed(2)}
                Previous Close: $${pc.toFixed(2)}
                Low: $${l.toFixed(2)}
                High: $${h.toFixed(2)}

                Market Capitalization: ${marketCapitalization}
                Shares Outstanding: ${shareOutstanding}
                Prices Accurate as of ${time}`},
        	)
        message.channel.send(embed);
	},
};

function formatNumber(num) {
    if(isNaN(num)) return undefined;

    if(num >= 10**12) {
        num = (num / (10 ** 12)).toFixed(2);
        return "" + num + " T";
    }
    else if(num >= 10**9) {
        num = (num / (10 ** 9)).toFixed(2);
        return "" + num + " B";
    }
    else {
        num = (num / (10 ** 6)).toFixed(2);
        return "" + num + " M";
    }

}
