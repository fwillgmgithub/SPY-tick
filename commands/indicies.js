const getInfoTicker = require('./getInfoTicker.js');
module.exports = {
	name: 'indicies',
	description: 'Returns ETF incidies of the US stock market. SPY, QQQ, and DIA',
	execute(message, args) {

        //var x = [dayPrice, rawChange, percentChange]
        var sp500 = getInfoTicker.execute('SPY', message);
        var nasdaqComp = getInfoTicker.execute('QQQ', message);
        var djia = getInfoTicker.execute('DIA', message);

        if(djia === null)
            return;
            
          message.channel.send(
            '**SPY:** ' + sp500[0] + " " + sp500[1] + ' (' + sp500[2] + ')\n'
            + '**QQQ:** ' + nasdaqComp[0] + " " + nasdaqComp[1] + ' (' + nasdaqComp[2] + ')\n'
            + '**Dow:** ' + djia[0] + " " + djia[1] + ' (' + djia[2] + ')')

	},
};
