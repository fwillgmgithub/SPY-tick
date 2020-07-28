const get = require('./Get.js');
require('dotenv').config();
const APIKEY = process.env.APIKEY;
module.exports = {
	name: 'getInfoTicker',
	description: 'From a stock ticker, gets data, formats it, and returns a string array' +
    ' in the form [dayPrice, rawChange, percentChange]',
	execute(ticker, message) {

        var url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='
        + ticker.toUpperCase() + '&apikey=' + APIKEY + '&datatype=JSON'
        var json_obj = JSON.parse(get.Get(url));

        try {
          var dayPrice = json_obj["Global Quote"]["05. price"]
          dayPrice = Number.parseFloat(dayPrice).toFixed(2);
          var rawChange = json_obj["Global Quote"]["09. change"]
          rawChange = Number.parseFloat(rawChange).toFixed(2);
          var percentChange = json_obj["Global Quote"]["10. change percent"]
          percentChange = percentChange.substring(0, percentChange.length-1);
          percentChange = Number.parseFloat(percentChange).toFixed(2);
        } catch (err) {
          console.log(err + " has been caught");
          message.channel.send("You are sending requests too quickly. Try again later");
          return null;
        }

        if(rawChange > 0 && percentChange > 0)
        {
          rawChange = "+" + rawChange;
          percentChange = "+" + percentChange;
        }
        percentChange = percentChange + '%';

        return [dayPrice, rawChange, percentChange];
	},
};
