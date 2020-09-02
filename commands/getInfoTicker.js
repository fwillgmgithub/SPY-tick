const fetch = require('node-fetch');
require('dotenv').config();
const FINN_APIKEY = process.env.FINN_APIKEY;
module.exports = {
	name: 'getInfoTicker',
	description: 'From a stock ticker, gets data, formats it, and returns an array' +
    ' in the form [dayPrice, rawChange, percentChange]',
	async execute(ticker, message) {

        var stockTicker = ticker.toUpperCase().trim();
        var url = `https://finnhub.io/api/v1/quote?symbol=${stockTicker}&token=${FINN_APIKEY}`
        const{ c, pc } = await fetch(url).then(response => response.json());

            if(!c){
                return message.channel.send("Error!");
            }
            var prevClose = pc;
            var currPrice = c;
            var rawChange = "" + ((currPrice - prevClose).toFixed(2));
            var percentChange = "" + ((100 * rawChange/prevClose).toFixed(2));

            if(rawChange > 0 && percentChange > 0)
            {
              rawChange = "+" + rawChange;
              percentChange = "+" + percentChange;
            }
            percentChange = percentChange + '%';
            currPrice = "" + (currPrice.toFixed(2));
            return [currPrice, rawChange, percentChange];
    },
};
