var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
module.exports = {
	name: 'Get',
	description: 'uses an XMLHttpRequest, takes a url, returns a json object',
	Get(url) {
        var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",url,false);
        Httpreq.send(null);
        return Httpreq.responseText;
	},
};
