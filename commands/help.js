module.exports = {
	name: 'help',
	description: 'Here to help!',
	execute(message, args) {
		message.channel.send('Use command \"t$ price TICKER\" to check the current trading price of a ticker or company');
	},
};
