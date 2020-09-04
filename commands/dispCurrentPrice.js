const fetch = require('node-fetch');
const getInfoTicker = require('./getInfoTicker.js');
const queryStr = require('querystring');
require('dotenv').config();
const ALPHA_APIKEY = process.env.ALPHA_APIKEY;
module.exports = {
	name: 'price',
	description: 'calls symbol search to find the company Name and ticker',
    aliases: ['p'],
	async execute(message, args) {

        if(!args.length){
            return message.channel.send("**You need to specify a company/ticker!** USAGE: t$ price [ticker]");
        }
        let companyQry = queryStr.stringify({ keywords: args.join(' ') });;

        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&${companyQry}&apikey=${ALPHA_APIKEY}&datatype=JSON`
        let { bestMatches } = await fetch(url).then(response => response.json());

        if(!bestMatches.length) {
            return message.channel.send(`**Error!** Cannot Find Company: ${args.join(' ')}`);
        }

        let ticker = bestMatches[0]["1. symbol"];
        let companyName = bestMatches[0]["2. name"];
        let infoArr = await getInfoTicker.execute(ticker, message);

        if(!infoArr || infoArr === undefined) {
            return message.channel.send(`**Error!** Cannot Find Company: ${args.join(' ')}`)
        }
        message.channel.send(`**${companyName} (${ticker})**\nCurrent Price: $${infoArr[0]} ${infoArr[1]} (${infoArr[2]})`);
	},
};
