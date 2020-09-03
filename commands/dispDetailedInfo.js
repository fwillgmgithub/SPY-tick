const getInfoTicker = require('./getInfoTicker.js');
module.exports = {
	name: 'info',
	description: 'Gives a detailed breakdown of a stock or ticker',
	execute(message, args) {
        //maybe reorganize the files s.t. theres one method to find company and ticker pair.
		message.channel.send('Use command \"t$ price TICKER\" to check the current trading price of a ticker or company');
	},
};
