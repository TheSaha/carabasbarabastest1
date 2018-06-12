var request = require('request');
var log4js = require('log4js');
var logger = log4js.getLogger();
var fs = require('fs');
var prices;

setInterval(function(){
	request('https://api.dapubg.com/price/all', function(error, response, body) {
	 prices = JSON.parse(body);
	    fs.writeFileSync('/var/www/html/public/prices.txt', body);
	    logger.trace('New prices loaded.');
	});
}, 3.6e+6);