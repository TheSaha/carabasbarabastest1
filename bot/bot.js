var SteamCommunity = require('steamcommunity');
var fs = require('fs');
var SteamTotp = require('steam-totp');
var mysql = require('mysql');
var log4js = require('log4js');
var SteamTradeOffers = require('steam-tradeoffers');
var async = require('async');

var pool  = mysql.createPool({
	connectionLimit : 10,
	database: 'csgo',
	host: 'localhost',
	user: 'root',
	password: 'tb5AqO30uLW0'
});

var community = new SteamCommunity();
var offers = new SteamTradeOffers();
log4js.configure({
	appenders: [
		{ type: 'console' },
		{ type: 'file', filename: 'logs/bot_'+process.argv[2]+'.log' }
	]
});
var logger = log4js.getLogger();
////////////////////////////////////////


////////////////////////////////////
var express = require('express');
var https = require('https');
//////////////////

var options = {
    key: fs.readFileSync('/etc/ssl/sitessl/server.key'),
    cert: fs.readFileSync('/etc/ssl/sitessl/pubg-club_com.crt'),
    ca: fs.readFileSync('/etc/ssl/sitessl/pubg-club_com_ca.crt')
};
var app = require('https').createServer(options, handler);
var io = require('socket.io').listen(app);

function handler(req, res) {
    res.writeHead(200);
    res.end("welcome sir!");
}

io.sockets.on('connection', function (socket) {
    socket.on('message', function (data) {
        socket.broadcast.emit('message', data);
    });
});









////////////////////

var app = express();

//var sc1 = 'ASDAFAF1Q24234324DWFSDFSSS';
//var sc2 = 'ADADASD132R1RWFSDFDFSDFSDF';
var sc1 = 'MJD5KFLL6H8O4HD799GHDJJN81JVJ8H8F39RJ3JF93MFOIWJH9FJW9J0JK092J9ODFJNIFNH2EWIFUI33HBE78IUFHIE';

//var sc1 = 'ASDAFAF1Q24234324DWFSDFSSS';
var sc2 = 'GNVDJIOFUI99UT40KJ9JEOJF9EJF09EU0F3J0FJ30FJ30JFG90EUJGF0ERIF0EUI0GI0GI093JG93UGOUBFGE7GFE7HF2NND2ND199390UR30JEBANYPIDARASIIDITENAHUI';
//var sc2 = 'ADADASD132R1RWFSDFDFSDFSDF';

var portBot = 6849;
app.listen(portBot);
//////////////////////////////////////////////







//////////////////////////////////

app.get('/'+sc1+'/', function (req, res) {
	var assetids = req.query['assetids'];
	assetids = assetids.split(',');
	var partner = req.query['partner'];
	var token = req.query['token'];
	var checksum = req.query['checksum'];
	var steamid = req.query['steamid'];
	var senditems = [];
	for(var i = 0; i < assetids.length; i++) {
		if(assetids[i] == "") continue;
		senditems.push({
			appid: 578080,
			contextid: 2, 
			assetid: assetids[i]
		});
	}

	var code = makecode();
	console.log(partner, token, checksum, assetids, senditems);


		offers.getHoldDuration({
		   partnerSteamId: steamid,
		   accessToken: token
		  }, function(err, rrr) {
		   if(err) {
		    logger.debug(err);
		    res.json({
		     success: false,
		     error: err.toString()
		    });
		   } else {
		    if(rrr.their == 0) {
					offers.makeOffer({
						partnerAccountId: partner,
						accessToken: token,
						itemsFromThem: senditems,
						itemsFromMe: [],
						message: 'PUBG-CLUB.COM | Deposit | +'+checksum+' coins | ['+code+']'
					}, function(err, r) {
						if(err) {
							logger.error('Error.');
							logger.debug(err);
							res.json({
								success: false,
								error: err.toString()
							});
						} else {
							offers.loadPartnerInventory({
								partnerSteamId: steamid,
								tradeOfferId: r.tradeofferid,
								appId: 578080,
								contextId: 2,
								language: 'russian'
							}, function(err, rr) {
								if(err) {
									logger.debug(err);
									res.json({
										success: false,
										error: err.toString()
									});
								} else {
									var names = [];
									for(var i = 0; i < senditems.length; i++) {
										for(var a = 0; a < rr.length; a++) {
											if((senditems[i].assetid == rr[a].id) && (!rr[a].ss)) {
												names.push({market_hash_name: rr[a].market_hash_name, icon_url: rr[a].icon_url});
												rr[a].ss = 1;
												continue;
											}
										}
									}
									res.json({
										success: true,
										code: code,
										amount: checksum,
										tid: r.tradeofferid,
										items: names
									});
								}
							});
						}
					});  
				} else {
				     logger.error('Error sending trade offer because the user does not have Steam Mobile Authenticator STEAMID: '+steamid);
				     logger.debug('Error sending trade offer because the user does not have Steam Mobile Authenticator STEAMID: '+steamid);
				     res.json({
				      success: false,
				      error: "Error: You need to activate Steam Mobile Authentificator."
				     });
				    }
				   }
				  });
				});


app.get('/'+sc2+'/', function (req, res) {
	var names = req.query['names'];
	names = names.split(',');
	var partner = req.query['partner'];
	var token = req.query['token'];
	var checksum = req.query['checksum'];
	offers.loadMyInventory({
		appId: 578080,
		contextId: 2
	}, function(err, items) {
		if(err) {
			logger.error('Error sending trade (1)');
			logger.debug(err);
			res.json({
				success: false,
				error: "Error: An error ocurred when trade offer have sent to you, try again later!"
			});			
		} else {
			var senditems = [];
			for(var i = 0; i < names.length; i++) {
				for(var a = 0; a < items.length; a++) {
					if((names[i] == items[a].market_hash_name) && (!items[a].ss)) {
						senditems.push({
							appid: 578080,
							contextid: 2, 
							assetid: items[a].id
						});
						if(senditems.length == names.length-1) break;
						items[a].ss = 1;
						continue;
					}
					if(senditems.length == names.length-1) break;
				}
			};
			var code = makecode();
			console.log(partner, token, checksum, names, senditems);
			offers.makeOffer({
				partnerAccountId: partner,
				accessToken: token,
				itemsFromThem: [],
				itemsFromMe: senditems,
				message: 'PUBG-CLUB.COM | Withdraw | -'+checksum+' coins | ['+code+']'
			}, function(err, r) {
				if(err) {
					logger.error('Error sending trade (2)');
					logger.debug(err);
					res.json({
						success: false,
						error: "Error: The item is already in trade. Try again with other item."
					});
				} else {
					res.json({
						success: true,
						code: code,
						amount: -checksum,
						tid: r.tradeofferid,
						state: 2
					});
				}
			});
		}
	});
});



var ips = {};
app.get('/checkTrade/', function (req, res) {
     if(ips[req.connection.remoteAddress]+15 >= time()) {
      return;
     } else {
      ips[req.connection.remoteAddress] = time();
     }
	var tid = req.query['tid'];
	offers.getOffer({
		tradeofferid: tid
	}, function(err, trade) {
		if(err) {
			logger.error('Error: Cant make trade.');
			logger.debug(err);
			res.json({
				success: false,
				error: err.toString()
			});
		} else {
			logger.debug(trade);
			if(trade.response.offer.trade_offer_state == 3) {
				res.json({
					success: true,
					action: 'accept',
					result: 'Success: Coins got updated.'
				});
			} else if(trade.response.offer.trade_offer_state == 7) {
				res.json({
					success: true,
					result: 'Error: You declined the offer.',
					action: 'cross'
				});
			} else {
				res.json({
					success: false,
					error: 'Error: There was an error accepting the trade offer.'
				});
			}
		}
	});
});

function cancelTrade(offerid) {
	offers.declineOffer({
		tradeOfferId: offerid
	}, function(err, log) {
		if (err) {
			logger.error('Cancel trade #'+offerid);
			logger.debug(err);
			return;
		}
		logger.debug(log);
		logger.trace('Offer #'+offerid+' canceled');
	});
}

query('SELECT * FROM `bots` WHERE `id` = '+pool.escape(process.argv[2]), function(err, res) {
	if((err) || (!res[0])) {
		logger.error('Cant find account');
		process.exit(0);
		return;
	}
	account = res[0];
	app.listen(portBot+account.id);
	logger.trace('We got account info');
	account.twoFactorCode = SteamTotp.generateAuthCode(account.shared_secret);
	account.auth = false;
	logger.debug(account);
	community.login(account, login);
});

community.on('confKeyNeeded', function(tag, callback) {
    callback(null, time, SteamTotp.getConfirmationKey(account.identity_secret, time(), tag));
});

community.on('newConfirmation', function(confirmation) {
	var time = time();
	var key = SteamTotp.getConfirmationKey(account.identity_secret, time, 'allow');
	confirmation.respond(time, key, true, function(err) {
		if(err) {
			logger.error('ERROR: Confirmation.');
			logger.debug(err);
			return;
		}
		logger.trace('OK: New confirmation.');
	});
});

function query(sql, callback) {
	if (typeof callback === 'undefined') {
		callback = function() {};
	}
	pool.getConnection(function(err, connection) {
		if(err) return callback(err);
		logger.info('OK: Query: '+connection.threadId);
		connection.query(sql, function(err, rows) {
			if(err) return callback(err);
			connection.release();
			return callback(null, rows);
		});
	});
}

function login(err, sessionID, cookies, steamguard) {
	if(err) {
		logger.debug(err);
		if(err.message == "SteamGuardMobile") {
			account.twoFactorCode = SteamTotp.generateAuthCode(account.shared_secret);
			logger.warn('ERROR: TwoFactorCode: '+account.twoFactorCode);
			setTimeout(function() {
				community.login(account, login);
			}, 5000);
			return;
		}
		process.exit(0);
	}
	logger.trace('OK: Auth access.');
	account.sessionID = sessionID;
	account.cookies = cookies;
	community.getWebApiKey('pubg-club.com', webApiKey);
	community.startConfirmationChecker(100, account.identity_secret);
}

function webApiKey(err, key) {
	if(err) {
		logger.debug(err);
		process.exit(0);
		return;
	}
	account.key = key;
	logger.trace('OK: Bot-apikey >> '+account.accountName+' '+account.key);
	offersSetup();
	community.loggedIn(checkLoggedIn);
}

function offersSetup() {
	logger.trace('OK: steam-tradeoffers');
	offers.setup({
		sessionID: account.sessionID,
		webCookie: account.cookies,
		APIKey: account.key
	});
}

function checkLoggedIn(err, loggedIn, familyView) {
	if((err) || (!loggedIn)) {
		logger.error('We arent logged in')
		process.exit(0);
	} else {
		logger.trace('OK: Logged in!');
		account.auth = true;
	}
}

function makecode() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i=0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function time() {
	return parseInt(new Date().getTime()/1000)
}