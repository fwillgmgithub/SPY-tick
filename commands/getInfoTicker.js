const fetch = require('node-fetch');
require('dotenv').config();
const queryStr = require('querystring');
const FINN_APIKEY = process.env.FINN_APIKEY;
const ALPHA_APIKEY = process.env.ALPHA_APIKEY;
module.exports = {
	name: 'getInfoTicker',
	description: 'From a stock ticker, gets data, formats it, and returns an array' +
    ' in the form [ticker, company, price, rawChange, %change]',
	async execute(message, args) {

        let companyQry = queryStr.stringify({ keywords: args.join(' ') });;

        const url1 = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&${companyQry}&apikey=${ALPHA_APIKEY}&datatype=JSON`
        let { bestMatches } = await fetch(url1).then(response => response.json());

        if(!bestMatches.length) {
                return undefined;
            }

        let ticker = bestMatches[0]["1. symbol"];
        let companyName = bestMatches[0]["2. name"];

        let stockTicker = ticker.toUpperCase().trim();
        const url2 = `https://finnhub.io/api/v1/quote?symbol=${stockTicker}&token=${FINN_APIKEY}`
        const{ c, pc } = await fetch(url2).then(response => response.json());

            if(!c){
                return undefined;
            }
            let prevClose = pc;
            let currPrice = c;
            let rawChange = "" + ((currPrice - prevClose).toFixed(2));
            let percentChange = "" + ((100 * rawChange/prevClose).toFixed(2));

            if(rawChange > 0 && percentChange > 0)
            {
              rawChange = "+" + rawChange;
              percentChange = "+" + percentChange;
            }
            percentChange = percentChange + '%';
            currPrice = "" + (currPrice.toFixed(2));
            return [companyName, ticker, currPrice, rawChange, percentChange];
    },
};
