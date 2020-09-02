const fetch = require('node-fetch');
const getInfoTicker = require('./getInfoTicker.js');
const queryStr = require('querystring');
require('dotenv').config();
const ALPHA_APIKEY = process.env.ALPHA_APIKEY;
module.exports = {
	name: 'company',
	description: 'calls symbol search to find the company Name and ticker',
	async execute(message, args) {

        if(!args.length){
            return message.channel.send("**You need to specify a company/ticker!** USAGE: t$ price [ticker]");
        }
        var companyQry = queryStr.stringify({ keywords: args.join(' ') });;

        //does not work for indicies yet (sp500, nasdaq, djia)
        var url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&${companyQry}&apikey=${ALPHA_APIKEY}&datatype=JSON`
        var { bestMatches } = await fetch(url).then(response => response.json());

        if(!bestMatches.length) {
            return message.channel.send(`**Error!** Cannot Find Company: ${args.join(' ')}`);
        }

        var ticker = bestMatches[0]["1. symbol"];
        var companyName = bestMatches[0]["2. name"];
        var infoArr = await getInfoTicker.execute(ticker, message);

        if(!infoArr || infoArr === undefined) {
            return message.channel.send("Something went wrong!")
        }
        message.channel.send(`**${companyName} (${ticker})**\nCurrent Price: $${infoArr[0]} ${infoArr[1]} (${infoArr[2]})`);
	},
};
