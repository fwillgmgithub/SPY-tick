const get = require('./Get.js');
const getInfoTicker = require('./getInfoTicker.js');
require('dotenv').config();
const APIKEY = process.env.APIKEY;
module.exports = {
	name: 'company',
	description: 'calls symbol search to find the company Name and ticker',
	execute(message, args) {

        var company = args[0];

        if(company == 'sp500' || company == 's&p 500' || company == 's&p500' || company == 'sp 500')
        {
          var spInfo = getInfoTicker.execute('SPY', message);
          message.channel.send('**S&P 500 (' + 'GSPC' + ')**\n' +
          'Current Price: $' + spInfo[0] + " " + spInfo[1] + ' (' + spInfo[2] + ')');

        }
        else if(company == 'DJIA' || company == 'dow jones' || company == 'djia')
        {
          var dowInfo = getInfoTicker.execute('DIA', message);
          message.channel.send('**Dow Jones Industrial Average (' + 'DJIA' + ')**\n' +
          'Current Price: $' + dowInfo[0] + " " + dowInfo[1] + ' (' + dowInfo[2] + ')');

        }
        else
        {
          var url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='
          + company + '&apikey=' + APIKEY + '&datatype=JSON'

          var json_obj = JSON.parse(get.Get(url));
          if(json_obj.bestMatches.length == 0)
          {
            message.channel.send("Error! Cannot Find Company: " + company)
          }
          else
          {
            var ticker = json_obj.bestMatches[0]["1. symbol"];
            var companyName = json_obj.bestMatches[0]["2. name"];

            //uses global quote to find price
            var infoArr  = getInfoTicker.execute(ticker, message);
            if(infoArr === null)
                return;
                
              message.channel.send('**' + companyName + ' (' + ticker + ')**\n' +
              'Current Price: $' + infoArr[0] + " " + infoArr[1] + ' (' + infoArr[2] + ')');
           }

         }

	},
};
