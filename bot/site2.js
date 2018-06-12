var https = require('https');
var ws = require('ws');
var mysql = require('mysql');
var log4js = require('log4js');
//var io = require('socket.io')(8000);
var request = require('request');
var fs = require('fs');
  
  
//var privateKey = fs.readFileSync('/etc/ssl/sitessl/server.key', 'utf8');
//var certificate = fs.readFileSync('/etc/ssl/sitessl/pubg-club_com.crt', 'utf8');
//var ca = fs.readFileSync('/etc/ssl/sitessl/pubg-club_com_ca.crt', 'utf8');

//var io = require('socket.io').listen(8000,{key:privateKey,cert:certificate,ca:ca},{secure: true});


/////////////////////

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

app.listen(4433);







//////////////////

var md5 = require('md5');
var sha256 = require('sha256');
var math = require('mathjs');

log4js.configure({
	appenders: [
		{ type: 'console' }
	]
});

var pool = mysql.createPool({
	connectionLimit : 10,
	database: 'csgo',
	host: 'localhost',
	user: 'root',
	password: 'tb5AqO30uLW0'
});

var logger = log4js.getLogger();

process.on('uncaughtException', function (err) {
 logger.trace('Strange error');
 logger.debug(err);
});


//CRASH
var crashNumber = 1000;
var crashState = 'NULL';
var crashAt;
var timp = 100;
var intervalul;
var isStatedSet = 0;
var rCAt;
var instaCrash = 0;
//TIMERE CRASH GLOBALE
var timerC1;
var timerC2;
var timerC3;
var timerC4;
var timerC5;
var timerC6;
var timerC7;
var timerC8;
var timerC9;
var timerC10;
//SETTINGS FOR CRASH
var CRbr = 1;
var usersCr = {};
var CRusersAmount = {};
var CRcurrentBets = [];
//RIGGED MODE FOR CRASH
var riggedMode = 0;
var riggedValue;




//SAFEBOX SETTINGS
var totalSafeBox;
var SafeBoxID;



//mines settings











//COMMAND SET NEXTROLL
var nextRoll = false;
var nextRolled;


var currentUsersOnline = 0;
var currentAmountForchat = 0;

/* */
var currentUsersOnJackpot = 0;
var JackpotTotal = 0;
var JackpotTimer = -1;
var JcurrentBets = [];
var JusersAmount = {};
var Jpause = false;
var Jaccept = 20;
var Jwait = 5; 
var JusersBr = {};
var Jbr = 1;
var UsersOn = [];

var roundedHash = null;
var WhoUsedDieces = {};

var TimesForBotsToBet = 20;
var CurrentTimesForBotsToBet = 0;
var IntervalBetuireBoti;
var IntervalulLaBoti = 2;
var IntervalDeBetuireBoti = IntervalulLaBoti*300;
var BotsStarted = 0;


var TimeOfBotsCHHH = 60;
var TimeOfBotsChatting = TimeOfBotsCHHH*1000;

var BotBetName;
var BotBetAvatar;

var accept = 20;
var wait = 10; 
var br = 3; 
var chat = 2; 
var maxbet = 5000000;
var minbet = 10;
var minbet2 = 50;

var q1 = 2; //GRAY COLOR
var q2 = 3; //RED COLOR
var q3 = 5; //BLUE COLOR
var q4 = 11; //GOLD COLOR

var timer = -1;
var users = {};
var roll = 0;
var currentBets = [];
var historyRolls = [];
var usersBr = {};
var usersAmount = {}; 
var currentSums = {
	'0-0': 0,
	'1-7': 0,
	'8-12': 0,
	'13-14': 0
};
var currentRollid = 0;
var pause = false;
var hash = ''; 
var last_message = {};
/* */

var canPlayersBet = 1;


load();
updateHash();


//START CRASH GAME
startCrashGame();

//START SAFE BOX GAME.
startSafeBox();


function startSafeBox() {
	query('SELECT * FROM `safeBox` ORDER BY `id` DESC LIMIT 1', function(err, row) {
		if(err) return;

		if(row[0].amount > 0) {
			totalSafeBox = row[0].amount;
			SafeBoxID = row[0].id;
		}else{
			totalSafeBox = 0;
			SafeBoxID = row[0].id;
		}

		if(row[0].code_Win == '0') {
			var randomCod = Math.floor(Math.random() * (99 - 10 + 1)) + 10;
			query('UPDATE `safeBox` SET `amount`=0,`code_Win`='+pool.escape(randomCod)+' WHERE `id`='+pool.escape(row[0].id));
			totalSafeBox = 0;
		}
	});
}

function addSafeBox(m, user, socket) {
	var codBet = parseInt(m.codeBet);
	var codBetImp = codBet/10;

	if(/(a|b|c|d|e|f|g|h|j|i|k|l|m|n|o|p|q|r|s|t|v|u|w|x|y|z)/.exec(codBet)) {
		socket.emit('message', {
			type: 'error',
			enable: true,
			error: 'Error: Invalid bet.'
		});
		return;
	}

	query('SELECT `balance` FROM `users` WHERE `steamid`='+pool.escape(user.steamid), function(e, r) {
		if(e) return;

		if(r[0].balance < 500){
			socket.emit('message', {
				type: 'error',
				error: 'Error: You need to have 500 coins to try unlock the safebox!'
			});
			return;
		}else {
			query('UPDATE `users` SET `balance`=`balance`-500 WHERE `steamid`='+pool.escape(user.steamid));
			setTimeout(function () { getBalance(user, socket) }, 300);

			if(codBetImp >= 1 && codBetImp < 10) {

				query('UPDATE `safeBox` SET `amount`=`amount`+'+pool.escape('500'));
				query('INSERT INTO `sbbets` SET `user`='+pool.escape(user.steamid)+', `digit`='+pool.escape(codBet)+', `won`=0');

				totalSafeBox += 500;
				setTimeout(function(){
					query('SELECT `code_Win` FROM `safeBox` ORDER BY `id` DESC LIMIT 1', function(err2, row2) {
						if(err2) return;

						setTimeout(function() {
							if(codBet == row2[0].code_Win) {
								query('UPDATE `sbbets` SET `won`=1 WHERE `user`='+pool.escape(user.steamid)+' ORDER BY `id` DESC LIMIT 1');


								var taxSafebox = totalSafeBox - totalSafeBox/1.10;
								var sumReceived = totalSafeBox - taxSafebox;

								io.sockets.emit('message', {
									type: 'alert',
									alert: 'User: '+user.name+' ('+user.steamid+') won at Safebox '+parseInt(sumReceived)+' coins with code: '+row2[0].code_Win+' !'
								});

								query('UPDATE `users` SET `balance`=`balance`+'+pool.escape(parseInt(sumReceived))+' WHERE `steamid`='+pool.escape(user.steamid));

								totalSafeBox = 0;
								query('INSERT INTO `safeBox` SET `amount`=0,`code_Win`=0');
								setTimeout(startSafeBox(), 300);

								setTimeout(getBalance(user, socket), 100);

								io.sockets.emit('message', {
									type: 'refreshSB',
									amount: totalSafeBox
								});

								socket.emit('message', {
									type: 'soundSB',
									sound: 'won'
								});
							}else {
								socket.emit('message', {
									type: 'alert',
									alert: 'You did not unlocked the safe. Try again!'
								});
								socket.emit('message', {
									type: 'soundSB',
									sound: 'lost'
								});
								io.sockets.emit('message', {
									type: 'refreshSB',
									amount: totalSafeBox
								});
							}
						}, 300);
					});

					io.sockets.emit('message', {
						type: 'refreshSB',
						amount: totalSafeBox
					});
				}, 300);



			}else {
				socket.emit('message', {
					type: 'error',
					enable: true,
					error: 'Error: You need to type digits from 10 to 99.'
				});
			}
		}
	});
}





function updateHash() {
	query('SELECT `hash` FROM `hash` ORDER BY `id` DESC LIMIT 1', function(err, row) {
		if(err) {
			logger.error('Cant get the hash, stopping');
			logger.debug(err);
			process.exit(0);
			return;
		}
		if(row.length == 0) {
			logger.error('Wrong hash found, stopping');
			process.exit(0);
		} else {
			if(hash != row[0].hash) logger.warn('Loaded hash '+row[0].hash);
			hash = row[0].hash;
		}
	});
}

function send100Crash() {
	io.sockets.emit('message', {
		type: 'urcarecrash',
		grafic: crashNumber
	});
}

function CrashCashout(m, user, socket) {
	query('SELECT `cashedOut`,`amount`,`id` FROM `crbets` WHERE `user`='+pool.escape(user.steamid)+' ORDER BY id DESC LIMIT 1', function(err, row) {
		if(err) return;

		var crashPoint = crashNumber;

		if(crashState != 'STARTED') {
			socket.emit('message', {
				type: 'error',
				error: 'The game is ended'
			})
			return;
		}

		if(row[0].cashedOut == '0') {
			var profit = parseInt(row[0].amount*(crashPoint)/100) - row[0].amount;

			io.sockets.emit('message', {
				type: 'crashCashout',
				playerSTEAMID: user.steamid,
				playerNAME: user.name,
				playerAMOUNT: row[0].amount,
				playerCASHOUT: crashPoint,
				playerPROFIT: profit
			});
			CRcurrentBets[user.steamid.won] = '1';

			logger.debug('[CASHOUT] UPDATED BALANCE OF '+user.steamid+' WITH + '+profit+' [CASHOUT: '+crashPoint/100+'x]');
			query('UPDATE `users` SET `balance`=`balance`+'+parseInt(profit+row[0].amount)+' WHERE `steamid`='+pool.escape(user.steamid));
			query('UPDATE `crbets` SET `autoCashout`='+pool.escape(crashPoint)+', `cashedOut`=1 WHERE `id`='+pool.escape(row[0].id));
		}else {
			socket.emit('message', {
				type: 'error',
				error: 'You have already cashed out!'
			});
		}
	});
}

function checkCashouts() {
	CRcurrentBets.forEach(function(itm) {
		if(itm.amount >= 25) {

			query('SELECT `cashedOut` FROM `crbets` WHERE `user`='+itm.user+' ORDER BY id DESC LIMIT 1', function(err, row) {
				if(err) return;

				if(row[0].cashedOut == '0') {
					var monii = parseInt(itm.amount*(crashNumber/100));

					io.sockets.in(itm.user).emit('message', {
						type: 'withdrawBTN',
						money: monii
					});
				}else{

				}
			});

		}

		if(itm.betid !== undefined && itm.autoCashout == crashNumber && itm.amount >= 25){
			query('SELECT `cashedOut` FROM `crbets` WHERE `user`='+itm.user+' ORDER BY id DESC LIMIT 1', function(err, row) {
				if(err) return;


				if(row[0].cashedOut == '0') {
					var profit = parseInt(itm.amount*(itm.autoCashout)/100) - itm.amount;

					io.sockets.emit('message', {
						type: 'crashCashout',
						playerBETID: itm.betid,
						playerSTEAMID: itm.user,
						playerNAME: itm.name,
						playerAMOUNT: itm.amount,
						playerCASHOUT: itm.autoCashout,
						playerPROFIT: profit
					});

					CRcurrentBets[itm.user.won] = '1';

					logger.debug('[AUTO CASHOUT] UPDATED BALANCE OF '+itm.user+' WITH + '+profit+' [CASHOUT: '+itm.autoCashout/100+'x]');
					query('UPDATE `users` SET `balance`=`balance`+'+pool.escape(parseInt((itm.amount)*itm.autoCashout/100))+' WHERE `steamid`='+pool.escape(itm.user));
					query('UPDATE `crbets` SET `cashedOut`=1 WHERE `id`='+pool.escape(itm.betid));
				}else {
					
				}
			});
		}
	});
}


function reluareCrash() {
	if(crashNumber == 100) {
		send100Crash();
	}
	setTimeout(function() {
		CRcurrentBets.forEach(function(itm) {
		});

		io.sockets.emit('message', {
			type: 'crashed',
			crashmanule: rCAt
		});

		CRcurrentBets = [];
		usersCr = {};
		CRusersAmount = {};
		crashState = 'ENDED';
		query('INSERT INTO `crash` SET `crashAt`='+pool.escape(rCAt));

		setTimeout(function() {
			startCrashGame();

			io.sockets.emit('message', {
				type: 'removeQCR'
			});
		}, 5000);
	}, 25);
}

function getCrashAmount() {
	if(crashNumber == 120) {
		clearInterval(timerC1);
		startTimer(2);
	}else if(crashNumber == 165) {
		clearInterval(timerC2);
		startTimer(3);
	}else if(crashNumber == 203) {
		clearInterval(timerC3);
		startTimer(4);
	}else if(crashNumber == 310) {
		clearInterval(timerC4);
		startTimer(5);
	}else if(crashNumber == 560) {
		clearInterval(timerC5);
		startTimer(6);
	}else if(crashNumber == 800) {
		clearInterval(timerC6);
		startTimer(7);
	}else if(crashNumber == 1200) {
		clearInterval(timerC7);
		startTimer(8);
	}else if(crashNumber == 3566) {
		clearInterval(timerC8);
		startTimer(9);
	}else if(crashNumber == 7248) {
		clearInterval(timerC9);
		startTimer(10);
	}
}

function CRsetBet(m, user, socket) {
	if(canPlayersBet == '1') {
		if((usersCr[user.steamid] !== undefined) && (usersCr[user.steamid] == CRbr)) {
			socket.emit('message', {
				type: 'error',
				enable: true,
				error: 'You have already joined the crash.'
			});
			return;
		}
		if((m.amount < minbet2) || (m.amount > maxbet)) {
			socket.emit('message', {
				type: 'error',
				enable: true,
				error: 'Invalid bet amount ['+minbet2+'-'+maxbet+'].'
			});
			return;
		}
 		if(/(a|b|c|d|e|f|g|h|j|i|k|l|m|n|o|p|q|r|s|t|v|u|w|x|y|z)/.exec(m.amount)) {
			socket.emit('message', {
				type: 'error',
				enable: true,
				error: 'Invalid bet amount.'

			});
			return;
		}
		if(crashState != 'STARTING' && usersCr[user.steamid] != CRbr) {
			socket.emit('message', {
				type: 'error',
				enable: true,
				error: 'The game have been already started!'
			});
			return;
		}

		var start_time = new Date();
			query('SELECT `balance` FROM `users` WHERE `steamid` = '+pool.escape(user.steamid), function(err, row) {
				if((err) || (!row.length)) {
					logger.error('Failed to find DB');
					logger.debug(err);
					socket.emit('message', {
						type: 'error',
						enable: true,
						error: 'You are not DB'
					});
					return;
				}
				if(row[0].balance >= m.amount) {
					query('UPDATE `users` SET `balance` = `balance` - '+parseInt(m.amount)+' WHERE `steamid` = '+pool.escape(user.steamid), function(err2, row2) {
						if(err2) {
							logger.error('Error in withdraw');
							logger.debug(err);
							socket.emit('message', {
								type: 'error',
								enable: true,
								error: 'You dont have enough points'
							});
							return;
						}
						query('INSERT INTO `crbets` SET `user` = '+pool.escape(user.steamid)+', `amount` = '+pool.escape(m.amount)+', `autoCashout` = '+pool.escape(m.autoCash), function(err3, row3) {
							if(err3) {
								logger.error('Error in DB');
								logger.debug(err);
								return;
							}
							var end = new Date();
							if(usersCr[user.steamid] === undefined) {
								usersCr[user.steamid] = 1;
							}
							if(CRusersAmount[user.steamid] === undefined) {
								CRusersAmount[user.steamid] = {
									'amount': m.amount,
									'autoCashout': m.autoCash
								};
							}
							CRusersAmount[user.steamid]['amount'] += parseInt(m.amount);
							socket.emit('message', {
								type: 'crbetconfirm',
								bet: {
									betid: row3.insertId,
									amount: m.amount,
									autoCashout: m.autoCash
								},
								balance: row[0].balance-m.amount,
								mybr: usersCr[user.steamid],
								br: CRbr,
								exec: (end.getTime()-start_time.getTime()).toFixed(3)
							});
							users[user.steamid].balance = row[0].balance-m.amount;
							io.sockets.emit('message', {
								type: 'crbet',
								bet: {
									amount: m.amount,
									autoCashout: m.autoCash,
									betid: row3.insertId,
									icon: user.avatar,
									name: user.name,
									user: user.steamid
								}
							});
							CRcurrentBets.push({
								autoCashout: m.autoCash,
								amount: m.amount,
								betid: row3.insertId,
								icon: user.avatar,
								name: user.name,
								user: user.steamid,
								won: '0'
							});
							socket.emit('message', {
								type: 'setIsPlaying'
							});
							checkTimer();
						})
					});
				} else {
					socket.emit('message', {
						type: 'error',
						enable: true,
						error: 'Error: You dont have any money.'
					});
				}
			});
	}else {
		socket.emit('message', {
			type: 'error',
			enable: true,
			error: 'Error: You cannot bet, because the bet is offline.'
		});
	}
}

function stopTimers() {
	clearInterval(timerC1);
	clearInterval(timerC2);
	clearInterval(timerC3);
	clearInterval(timerC4);
	clearInterval(timerC5);
	clearInterval(timerC6);
	clearInterval(timerC7);
	clearInterval(timerC8);
	clearInterval(timerC9);
	clearInterval(timerC10);
}

function startTimer(number) {
	if(number == 1) {
		timerC1 = setInterval(function() {
			crashNumber += 1;
			getCrashAmount();
			checkCashouts();

			if(crashNumber == crashAt) {
				reluareCrash();
				stopTimers();
			}

			io.sockets.emit('message', {
				type: 'urcarecrash',
				grafic: crashNumber
			});
		}, 230);
	}else if(number == 2) {
		timerC2 = setInterval(function() {
			crashNumber += 1;
			getCrashAmount();
			checkCashouts();

			if(crashNumber == crashAt) {
				reluareCrash();
				stopTimers();
			}

			io.sockets.emit('message', {
				type: 'urcarecrash',
				grafic: crashNumber
			});
		}, 180);
	}else if(number == 3) {
		timerC3 = setInterval(function() {
			crashNumber += 1;
			getCrashAmount();
			checkCashouts();

			if(crashNumber == crashAt) {
				reluareCrash();
				stopTimers();
			}

			io.sockets.emit('message', {
				type: 'urcarecrash',
				grafic: crashNumber
			});
		}, 150);
	}else if(number == 4) {
		timerC4 = setInterval(function() {
			crashNumber += 1;
			getCrashAmount();
			checkCashouts();

			if(crashNumber == crashAt) {
				reluareCrash();
				stopTimers();
			}

			io.sockets.emit('message', {
				type: 'urcarecrash',
				grafic: crashNumber
			});
		}, 100);
	}else if(number == 5) {
		timerC5 = setInterval(function() {
			crashNumber += 1;
			getCrashAmount();
			checkCashouts();

			if(crashNumber == crashAt) {
				reluareCrash();
				stopTimers();
			}

			io.sockets.emit('message', {
				type: 'urcarecrash',
				grafic: crashNumber
			});
		}, 80);
	}else if(number == 6) {
		timerC6 = setInterval(function() {
			crashNumber += 1;
			getCrashAmount();
			checkCashouts();

			if(crashNumber == crashAt) {
				reluareCrash();
				stopTimers();
			}

			io.sockets.emit('message', {
				type: 'urcarecrash',
				grafic: crashNumber
			});
		}, 60);
	}else if(number == 7) {
		timerC7 = setInterval(function() {
			crashNumber += 1;
			getCrashAmount();
			checkCashouts();

			if(crashNumber == crashAt) {
				reluareCrash();
				stopTimers();
			}

			io.sockets.emit('message', {
				type: 'urcarecrash',
				grafic: crashNumber
			});
		}, 30);
	}else if(number == 8) {
		timerC8 = setInterval(function() {
			crashNumber += 1;
			getCrashAmount();
			checkCashouts();

			if(crashNumber == crashAt) {
				reluareCrash();
				stopTimers();
			}

			io.sockets.emit('message', {
				type: 'urcarecrash',
				grafic: crashNumber
			});
		}, 15);
	}else if(number == 9) {
		timerC9 = setInterval(function() {
			crashNumber += 1;
			getCrashAmount();
			checkCashouts();

			if(crashNumber == crashAt) {
				reluareCrash();
				stopTimers();
			}

			io.sockets.emit('message', {
				type: 'urcarecrash',
				grafic: crashNumber
			});
		}, 0.1);
	}else if(number == 10) {
		timerC10 = setInterval(function() {
			crashNumber += 1;
			getCrashAmount();
			checkCashouts();

			if(crashNumber == crashAt) {
				reluareCrash();
				stopTimers();
			}

			io.sockets.emit('message', {
				type: 'urcarecrash',
				grafic: crashNumber
			});
		}, 0.01);
	}
}

function sendCrashAmount() {
	if(isStatedSet == 0) {
		crashState = 'STARTED';
		isStatedSet = 1;
	}

	if(instaCrash == 1) {

		reluareCrash();
		instaCrash = 0;

		CRcurrentBets = [];
		usersCr = {};
		CRusersAmount = {};

		io.sockets.emit('message', {
			type: 'crashed',
			crashmanule: rCAt
		});

		crashState = 'ENDED';
	}else {
		startTimer(1);
	}
}


function startCrashGame() {
	var timpEmis;

	crashState = 'STARTING';
	timp = 1000;
	crashNumber = 100;

	isStatedSet = 0;

	if(riggedMode == 0) {
		var sansaAT = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

		if(sansaAT == 1) {
			var sansaAT2 = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
			if(sansaAT2 == 1) {
				rCAt = Math.floor(Math.random() * (250 - 100 + 1)) + 100;
				crashAt = rCAt;
			}else {
				rCAt = 100;
				crashAt = rCAt;
			}
		}else if(sansaAT == 2) {
			rCAt = Math.floor(Math.random() * (130 - 100 + 1)) + 100;
			crashAt = rCAt;
		}else if(sansaAT == 3) {
			rCAt = Math.floor(Math.random() * (250 - 100 + 1)) + 100;
			crashAt = rCAt;
		}else if(sansaAT == 4) {
			rCAt = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
			crashAt = rCAt;
		}else if(sansaAT == 5) {
			rCAt = Math.floor(Math.random() * (10000 - 210 + 1)) + 100;
			crashAt = rCAt;
		}
	}else if(riggedMode == 1) {
		rCAt = riggedValue;
		crashAt = rCAt;


		setTimeout(function() {
			riggedMode = 0;
			riggedValue = 0;
		}, 300);
	}




	if(rCAt == 100) {
		instaCrash = 1;
	}


	logger.debug('CRASH AT: '+(rCAt/100));

	intervalul = setInterval(function() {
		timp = timp - 10;
		timpEmis = timp;

		if(timp == 0){
			sendCrashAmount();

			setTimeout(function() {
				clearInterval(intervalul);
			}, 10);
		}

		io.sockets.emit('message', {
			type: 'startcrash',
			time: timpEmis
		});

	}, 100);
}

io.on('connection', function(socket) {
	var user = false;
	socket.on('hash', function(hash) {
		query('SELECT `balance`,`avatar`,`rank`,`name`,`steamid` FROM `users` WHERE `hash` = '+pool.escape(hash), function(err, row) {
			if((err) || (!row.length)) {
				users[Object.size(io.sockets.connected)] = {
					socket: socket.id
				}

				var sendRHash;
				currentUsersOnline++;
				updateAmountOfBetting(currentUsersOnline);

				if(roundedHash == null) {
					sendRHash = '0';
				}else {
					sendRHash = roundedHash;
				}

				socket.emit('message', {
					accept: accept,
					balance: '0',
					br: br,
					Jbr: Jbr,
					chat: chat,
					count: timer-wait,
					Jcount: JackpotTimer-Jwait,
					icon: 'Guest',
					maxbet: maxbet,
					minbet: minbet,
					name: 'Guest',
					rank: '0',
					roundedHash: sendRHash,
					rolls: historyRolls,
					type: 'hello',
					user: '0',
					value: totalSafeBox
				});
				socket.emit('message', {
					type: 'logins',
					count: Object.size(io.sockets.connected)
				});
				currentBets.forEach(function(itm) {
					socket.emit('message', {
						type: 'bet',
						bet: {
							amount: itm.amount,
							betid: itm.betid,
							icon: itm.icon,
							lower: itm.lower,
							name: itm.name,
							rollid: itm.rollid,
							upper: itm.upper,
							user: itm.user,
							won: null
						},
						sums: {
							0: currentSums['0-0'],
							1: currentSums['1-7'],
							2: currentSums['8-12'],
							3: currentSums['13-14']
						}
					});
				});


				JcurrentBets.forEach(function(itm) {
					socket.emit('message', {
						type: 'jbet',
						bet: {
							amount: itm.amount,
							betid: itm.betid,
							icon: itm.icon,
							name: itm.name,
							user: itm.user,
							won: null
						},
						jack001: JackpotTotal
					});
				});

				CRcurrentBets.forEach(function(itm) {
					socket.emit('message', {
						type: 'crbet',
						bet: {
							autoCashout: itm.autoCash,
							amount: itm.amount,
							betid: itm.betid,
							icon: itm.icon,
							name: itm.name,
							user: itm.user,
							won: '0'
						}
					});
				});



			}else {
				user = row[0];
				users[user.steamid] = {
					socket: socket.id,
					balance: parseInt(row[0].balance)
				}
				socket.join(user.steamid);

				var sendRHash;

				if(roundedHash == null) {
					sendRHash = '0';
				}else {
					sendRHash = roundedHash;
				}
				currentUsersOnline++;
				updateAmountOfBetting(currentUsersOnline);
				socket.emit('message', {
					accept: accept,
					balance: row[0].balance,
					br: br,
					Jbr: Jbr,
					chat: chat,
					count: timer-wait,
					Jcount: JackpotTimer-Jwait,
					icon: row[0].avatar,
					maxbet: maxbet,
					minbet: minbet,
					name: row[0].name,
					rank: row[0].rank,
					rolls: historyRolls,
					roundedHash: sendRHash,
					type: 'hello',
					user: row[0].steamid,
					value: totalSafeBox
				});
				socket.emit('message', {
					type: 'logins',
					count: Object.size(io.sockets.connected)
				});
				currentBets.forEach(function(itm) {
					socket.emit('message', {
						type: 'bet',
						bet: {
							amount: itm.amount,
							betid: itm.betid,
							icon: itm.icon,
							lower: itm.lower,
							name: itm.name,
							rollid: itm.rollid,
							upper: itm.upper,
							user: itm.user,
							won: null
						},
						sums: {
							0: currentSums['0-0'],
							1: currentSums['1-7'],
							2: currentSums['8-12'],
							3: currentSums['13-14']
						}
					});
				});

				JcurrentBets.forEach(function(itm) {
					socket.emit('message', {
						type: 'jbet',
						bet: {
							amount: itm.amount,
							betid: itm.betid,
							icon: itm.icon,
							name: itm.name,
							user: itm.user,
							won: null
						},
						jack001: JackpotTotal
					});
				});

				CRcurrentBets.forEach(function(itm) {
					socket.emit('message', {
						type: 'crbet',
						bet: {
							autoCashout: itm.autoCash,
							amount: itm.amount,
							betid: itm.betid,
							icon: itm.icon,
							name: itm.name,
							user: itm.user,
							won: '0'
						}
					});
				});
			}
		});
	});
	
	socket.on('mes', function(m) {
		if(!user) {
			logger.debug(m);
			if(m.type == "startbots") {
				if(BotsStarted == 1) {
					socket.emit('message', {
						type: 'bots',
						msg: 'Error: The bots are already started!'
					});
				}else {
					BotsStarted = 1;
					IntervalulLaBoti = 1;
					addBots();
				}
			}else if(m.type == "stopbots") {
				if(BotsStarted == 0) {
					socket.emit('message', {
						type: 'bots',
						msg: 'Error: The bots are already stopped!'
					});
				}else {
					BotsStarted = 0;
					clearInterval(IntervalBetuireBoti);
				}
			}
		}else {
			logger.debug(m);
			if(last_message[user.steamid]+1 >= time()) {
				socket.emit('message', {
					type: 'error',
					enable: true,
					error: 'Error: Too fast.'
				});
				return;
			} else {
				last_message[user.steamid] = time();
			}
			if(m.type == "bet") return setBet(m, user, socket);
			if(m.type == "jbet") return JsetBet(m, user, socket);
			if(m.type == "crbet") {
				if(m.mtype == 'joinCrash') {
					 return setTimeout(function () { CRsetBet(m, user, socket) }, 250);
				}else if(m.mtype == 'withdraw') {
					return CrashCashout(m, user, socket);
				}
			}
			if(m.type == "balance") return getBalance(user, socket);
			if(m.type == "chat") return ch(m, user, socket);
			if(m.type == "plus") return plus(user, socket);
			if(m.type == "openbox") return caseOpen(m, user, socket);
			if(m.type == "createcfgame") return createCFGame(m, user, socket);
			if(m.type == "joincfgame") return joinCFGame(m, user, socket);
			if(m.type == "watchcfgame") return watchCFGame(m, user, socket);
			if(m.type == "addsafebox") return addSafeBox(m, user, socket);
		}
	});



	socket.on('mineSweeper', function(m){
		var SumaBetuita = m.suma;
		var TipJoc = m.type;
		var MineS = m.started;
		var gameid;
		var canCheckTiles = m.cchecktiles;

		var numarTile = m.numarTile;
		var numarGameID = m.numarGameID;

		if(m.verificareTile == 'checked') {
			socket.emit('message', {
				type: 'error',
				error: 'Error: This tile has been already checked!'
			});
			return;
		}

		if(m.tip == 'cashout') {
			var AmountWon = m.suma;
			var AmountBet = m.summaGame;
			var TipulJoculetului = m.minaTypeselectata;
			var TilesChecked = m.CheckedTiles;


			if(m.gameStarted == 0) {
				socket.emit('message', {
					type: 'error',
					error: 'Error: There is no game started!'
				});
				return;
			}else if(m.gameStarted == 1) {
				query('SELECT `id`,`amountWon`,`hash` FROM `mines` WHERE `steamid`='+pool.escape(user.steamid)+' ORDER BY id DESC LIMIT 1', function(err, row) {
					if(err) {
						logger.debug('ERROR IN DB');
						logger.error(err);
					}else {
							socket.emit('games', {
								type: 'mines',
								started: '1',
								gameEnd: '1',
								cashout: '1',
								amountcollected: row[0].amountWon
							});
							query('UPDATE `users` SET `balance`=`balance`+'+(AmountBet+row[0].amountWon)+' WHERE `steamid`='+pool.escape(user.steamid));
							query('UPDATE `mines` SET `result`=1,`amountWon`='+(AmountBet+row[0].amountWon)+' WHERE `steamid`='+pool.escape(user.steamid)+' ORDER BY id DESC LIMIT 1');

							socket.emit('message', {
								type: 'alert',
								alert: 'GameID: #'+row[0].id
							});

							socket.emit('message', {
								type: 'setHashMines',
								hash: row[0].hash
							});
					}
				});

				setTimeout(function() { getBalance(user, socket); }, 500);
			}
		}

		if(m.tipm == 'getBombs') {
			var TipJocM = m.tipJocm;

			if(m.gotBombs == '0') {
				if(TipJocM == '1') {
					m1Bomb01 = Math.floor(Math.random() * (25 - 1 + 1)) + 1;

					socket.emit('games', {
						type: 'mines',
						sendBombs: '1',
						bomb01: m1Bomb01,
						sendTipJocM: TipJocM
					});
				}else if(TipJocM == '3') {
					var bombitele = [];
					for(var i = 1; i <= 25; i++) {
					    bombitele.push(i);
					}
					var randomArray = shuffle(bombitele).splice(0, 3);

					m3Bomb01 = bombitele[0];
					m3Bomb02 = bombitele[1];
					m3Bomb03 = bombitele[2];

					socket.emit('games', {
						type: 'mines',
						sendBombs: '1',
						bomb01: m3Bomb01,
						bomb02: m3Bomb02,
						bomb03: m3Bomb03,
						sendTipJocM: TipJocM
					});
				}else if(TipJocM == '5') {
					var bombitele = [];
					for(var i = 1; i <= 25; i++) {
					    bombitele.push(i);
					}
					var randomArray = shuffle(bombitele).splice(0, 5);

					m5Bomb01 = bombitele[0];
					m5Bomb02 = bombitele[1];
					m5Bomb03 = bombitele[2];
					m5Bomb04 = bombitele[3];
					m5Bomb05 = bombitele[4];

					socket.emit('games', {
						type: 'mines',
						sendBombs: '1',
						bomb01: m5Bomb01,
						bomb02: m5Bomb02,
						bomb03: m5Bomb03,
						bomb04: m5Bomb04,
						bomb05: m5Bomb05,
						sendTipJocM: TipJocM
					});
				}else if(TipJocM == '24') {
					noBomb = Math.floor(Math.random() * (25 - 1 + 1)) + 1;

					socket.emit('games', {
						type: 'mines',
						sendBombs: '1',
						noBomb: noBomb,
						sendTipJocM: TipJocM
					});
				}
			}else{
				socket.emit('message', {
					type: 'error',
					error: 'Error: An error occured! Contact an administrator.'
				});
				return;
			}
		}

		if(!user) return;
		//logger.debug(m);
		//logger.debug("Steamid: "+pool.escape(user.steamid));

		//JMECHERIE --> exec: (end.getTime()-start_time.getTime()).toFixed(3)

		if(m.tip == 'start') {
				if(canPlayersBet == 1) {
					query('SELECT `balance` FROM `users` WHERE `steamid`='+pool.escape(user.steamid), function(err, row) {

						if(SumaBetuita > row[0].balance) {
							socket.emit('message', {
								type: 'error',
								error: 'Error: Insufficient funds!'
							});
						}else if((SumaBetuita < 250) || (SumaBetuita > 25000)) {
							socket.emit('message', {
								type: 'error',
								error: 'Error: Invalid bet amount. [250-25000]'

							});
							return;
						}else if(/(a|b|c|d|e|f|g|h|j|i|k|l|m|n|o|p|q|r|s|t|v|u|w|x|y|z)/.exec(SumaBetuita)) {
							socket.emit('message', {
								type: 'error',
								enable: true,
								error: 'Error: Invalid bet amount.'
							});
							return;
						}else {
							if(MineS != 1) {
								if(TipJoc == "0") {
									socket.emit('message', {
										type: 'error',
										error: 'Error: You need to select a type of mine.'

									});
								}else {
									query('UPDATE `users` SET `balance`=`balance`-'+SumaBetuita+' WHERE `steamid`='+pool.escape(user.steamid));

									setTimeout(function() { getBalance(user, socket); }, 500);

									gameid = m.gamenrid;

									var nextAmount;
									if(TipJoc == '1') {
										nextAmount = parseInt((SumaBetuita * 1.1)/150 + 1*SumaBetuita*0.01*1.07);
									}else if(TipJoc == '3') {
										nextAmount = parseInt((SumaBetuita * 1.1)/45 + 1*SumaBetuita*0.01*1.07);
									}else if(TipJoc == '5') {
										nextAmount = parseInt((SumaBetuita * 1.1)/15 + 1*SumaBetuita*0.01*1.07);
									}else if(TipJoc == '24') {
										nextAmount = parseInt((SumaBetuita * 24) + 1*0.95*2);
									}


									socket.emit('games', {
										type: 'mines',
										started: '1'
									});

									socket.emit('message', {
										type: 'setNextAmountMines',
										amount: nextAmount
									});

									var sh = sha256(gameid+'-'+time());
									query('INSERT INTO `mines` SET `steamid` = '+pool.escape(user.steamid)+', `hash`='+pool.escape(sh)+', `name` = '+pool.escape(user.name)+', `amount` = '+pool.escape(SumaBetuita)+', `result` = -1, `type`='+pool.escape(TipJoc)+', `amountWon` = 0, `time` = '+pool.escape(time()), function(err, row) {
										if(err) {
											logger.debug('ERROR IN DB');
											logger.error(err);
										}
									});
								}
							}else {
								socket.emit('message', {
									type: 'error',
									error: 'Error: The game is already started.'

								});
							}
						}
					});
				}else {
					socket.emit('message', {
						type: 'error',
						error: 'Error: You cannot start game because Administrator closed Mines.'

					});
				}

		}else if(m.tip == 'checkTile') {
			var tipType = m.tipJoc;
			var suma = m.sumaJoc;
			var sumaCastigata = 0;
			var Tiles = m.TilesClicked;
			var JocID = m.gamenrid;
			var gameIDDD = m.nrrgameid;

			if(canPlayersBet == 1) {
				if (/*gameid == numarGameID &&*/ (numarTile >= 1 && numarTile <= 25)) {
					if(canCheckTiles == 1) {

						//FOR SUMACASTIGAta
						var tilesc;
						if(tipType == '1') {
							if(Tiles >= 0 && Tiles <= 3) {
								tilesc = 1.07;
							}else if(Tiles >= 4 && Tiles <= 8) {
								tilesc = 1.32;
							}else if(Tiles >= 9 && Tiles <= 13) {
								tilesc = 1.55;
							}else if(Tiles >= 14 && Tiles <= 24) {
								tilesc = 2.21;
							}
						}else if(tipType == '3') {
							if(Tiles >= 0 && Tiles <= 3) {
								tilesc = 1.07;
							}else if(Tiles >= 4 && Tiles <= 8) {
								tilesc = 1.977;
							}else if(Tiles >= 9 && Tiles <= 13) {
								tilesc = 2.445;
							}else if(Tiles >= 14 && Tiles <= 24) {
								tilesc = 3.22;
							}
						}else if(tipType == '5') {
							if(Tiles >= 0 && Tiles <= 3) {
								tilesc = 1.07;
							}else if(Tiles >= 4 && Tiles <= 8) {
								tilesc = 2.077;
							}else if(Tiles >= 9 && Tiles <= 13) {
								tilesc = 9.50;
							}else if(Tiles >= 14 && Tiles <= 24) {
								tilesc = 15.50;
							}
						}else if(tipType == '24') {
							tilesc = 2;
						}

						//for sumaurmatoare
						var tilescnext;
						var TilesCnext = Tiles+1;
						if(tipType == '1') {
							if(TilesCnext >= 0 && TilesCnext <= 3) {
								tilescnext = 1.07;
							}else if(TilesCnext >= 4 && TilesCnext <= 8) {
								tilescnext = 1.32;
							}else if(TilesCnext >= 9 && TilesCnext <= 13) {
								tilescnext = 1.55;
							}else if(TilesCnext >= 14 && TilesCnext <= 24) {
								tilescnext = 2.21;
							}
						}else if(tipType == '3') {
							if(TilesCnext >= 0 && TilesCnext <= 3) {
								tilescnext = 1.07;
							}else if(TilesCnext >= 4 && TilesCnext <= 8) {
								tilescnext = 1.977;
							}else if(TilesCnext >= 9 && TilesCnext <= 13) {
								tilescnext = 2.445;
							}else if(TilesCnext >= 14 && TilesCnext <= 24) {
								tilescnext = 3.22;
							}
						}else if(tipType == '5') {
							if(TilesCnext >= 0 && TilesCnext <= 3) {
								tilescnext = 1.07;
							}else if(TilesCnext >= 4 && TilesCnext <= 8) {
								tilescnext = 2.077;
							}else if(TilesCnext >= 9 && TilesCnext <= 13) {
								tilescnext = 9.50;
							}else if(TilesCnext >= 14 && TilesCnext <= 24) {
								tilescnext = 15.50;
							}
						}else if(tipType == '24') {
							tilescnext = 2;
						}


						if(tipType == '1') {
							var Bomba01 = m.trimiteBomb01;
							var Bombs = Bomba01;
							sumaCastigata = parseInt((suma * 1.1)/150 + Tiles*suma*0.01*tilesc);
							if(Tiles > 24) {
								var SumaUrmatoare = 0;
							}else {
								var SumaUrmatoare = parseInt((suma * 1.1)/150 + (Tiles+1)*suma*0.01*tilescnext);
							}


							if(numarTile == Bomba01) {
								socket.emit('games', {
									type: 'mines',
									tile: numarTile,
									started: '1',
									result: 'lost',
									trimitegameID: gameIDDD,
									cctl: '0'
								});	

								query('SELECT `id`,`amountWon`,`result`,`hash` FROM `mines` WHERE `steamid`='+pool.escape(user.steamid)+' ORDER BY id DESC LIMIT 1', function(err, row) {
									if(err) {
										logger.debug('ERROR IN DB');
										logger.error(err);
									}else {
										socket.emit('message', {
											type: 'alert',
											alert: 'GameID: #'+row[0].id
										});

										socket.emit('message', {
											type: 'setHashMines',
											hash: row[0].hash
										});

										if(row[0].result == '-1') {
											query('UPDATE `mines` SET `result`=0,`amountWon`=0 WHERE `steamid`='+pool.escape(user.steamid)+' ORDER BY id DESC LIMIT 1');
										}
									}
								});

							}else {
								socket.emit('games', {
									type: 'mines',
									tile: numarTile,
									started: '1',
									result: 'won',
									trimitegameID: gameIDDD,
									sumaCastigata: sumaCastigata,
									receiveNextAmount: '1',
									amountt: SumaUrmatoare
								});

								query('UPDATE `mines` SET `amountWon`=`amountWon`+'+pool.escape(sumaCastigata)+' WHERE `steamid`='+pool.escape(user.steamid)+' ORDER BY id DESC LIMIT 1');
							}
						}else if(tipType == '3') {
							var Bomba01 = m.trimiteBomb01;
							var Bomba02 = m.trimiteBomb02;
							var Bomba03 = m.trimiteBomb03;
							var Bombs = Bomba01 + ',' + Bomba02 + ',' + Bomba03;
							sumaCastigata = parseInt((suma * 1.1)/45 + Tiles*suma*0.01*tilesc);
							var SumaUrmatoare = parseInt((suma * 1.1)/45 + (Tiles+1)*suma*0.01*tilescnext);


							if(numarTile == Bomba01 || numarTile == Bomba02 || numarTile == Bomba03) {
								socket.emit('games', {
									type: 'mines',
									tile: numarTile,
									started: '1',
									result: 'lost',
									trimitegameID: gameIDDD,
									cctl: '0',
									joculJoc: '3',
									bomba01: Bomba01,
									bomba02: Bomba02,
									bomba03: Bomba03
								});	

								query('SELECT `id`,`amountWon`,`result`,`hash` FROM `mines` WHERE `steamid`='+pool.escape(user.steamid)+' ORDER BY id DESC LIMIT 1', function(err, row) {
									if(err) {
										logger.debug('ERROR IN DB');
										logger.error(err);
									}else {
										socket.emit('message', {
											type: 'alert',
											alert: 'GameID: #'+row[0].id
										});

										socket.emit('message', {
											type: 'setHashMines',
											hash: row[0].hash
										});

										if(row[0].result == '-1') {
											query('UPDATE `mines` SET `result`=0,`amountWon`=0 WHERE `steamid`='+pool.escape(user.steamid)+' ORDER BY id DESC LIMIT 1');
										}
									}
								});

							}else {
								socket.emit('games', {
									type: 'mines',
									tile: numarTile,
									started: '1',
									result: 'won',
									trimitegameID: gameIDDD,
									sumaCastigata: sumaCastigata,
									receiveNextAmount: '1',
									amountt: SumaUrmatoare
								});	

								query('UPDATE `mines` SET `amountWon`=`amountWon`+'+pool.escape(sumaCastigata)+' WHERE `steamid`='+pool.escape(user.steamid)+' ORDER BY id DESC LIMIT 1');
							}
						}else if(tipType == '5') {
							var Bomba01 = m.trimiteBomb01;
							var Bomba02 = m.trimiteBomb02;
							var Bomba03 = m.trimiteBomb03;
							var Bomba04 = m.trimiteBomb04;
							var Bomba05 = m.trimiteBomb05;
							var Bombs = Bomba01 + ',' + Bomba02 + ',' + Bomba03 + ',' + Bomba04 + ',' + Bomba05;
							sumaCastigata = parseInt((suma * 1.1)/15 + Tiles*suma*0.01*tilesc);
							var SumaUrmatoare = parseInt((suma * 1.1)/15 + (Tiles+1)*suma*0.01*tilescnext);


							if(numarTile == Bomba01 || numarTile == Bomba02 || numarTile == Bomba03 || numarTile == Bomba04 || numarTile == Bomba05) {
								socket.emit('games', {
									type: 'mines',
									tile: numarTile,
									started: '1',
									result: 'lost',
									trimitegameID: gameIDDD,
									cctl: '0',
									joculJoc: '5',
									bomba01: Bomba01,
									bomba02: Bomba02,
									bomba03: Bomba03,
									bomba04: Bomba04,
									bomba05: Bomba05
								});	

								query('SELECT `id`,`amountWon`,`result`,`hash` FROM `mines` WHERE `steamid`='+pool.escape(user.steamid)+' ORDER BY id DESC LIMIT 1', function(err, row) {
									if(err) {
										logger.debug('ERROR IN DB');
										logger.error(err);
									}else {
										socket.emit('message', {
											type: 'alert',
											alert: 'GameID: #'+row[0].id
										});

										socket.emit('message', {
											type: 'setHashMines',
											hash: row[0].hash
										});

										if(row[0].result == '-1') {
											query('UPDATE `mines` SET `result`=0,`amountWon`=0 WHERE `steamid`='+pool.escape(user.steamid)+' ORDER BY id DESC LIMIT 1');
										}
									}
								});

							}else {
								socket.emit('games', {
									type: 'mines',
									tile: numarTile,
									started: '1',
									result: 'won',
									trimitegameID: gameIDDD,
									sumaCastigata: sumaCastigata,
									receiveNextAmount: '1',
									amountt: SumaUrmatoare
								});	


								query('UPDATE `mines` SET `amountWon`=`amountWon`+'+pool.escape(sumaCastigata)+' WHERE `steamid`='+pool.escape(user.steamid)+' ORDER BY id DESC LIMIT 1');
							}
						}else if(tipType == '24') {
							var noBomb = m.trimitenoBomb;
							sumaCastigata = parseInt((suma * 24) + Tiles*0.95*tilesc);
							var SumaUrmatoare = parseInt((suma * 24) + (Tiles+1)*0.95*tilescnext);



							if(numarTile == noBomb) {
								socket.emit('games', {
									type: 'mines',
									tile: numarTile,
									started: '1',
									result: 'won',
									trimitegameID: gameIDDD,
									sumaCastigata: sumaCastigata,
									receiveNextAmount: '1',
									amountt: SumaUrmatoare
								});	


								query('UPDATE `mines` SET `amountWon`=`amountWon`+'+pool.escape(sumaCastigata)+' WHERE `steamid`='+pool.escape(user.steamid)+' ORDER BY id DESC LIMIT 1');
							}else {
								socket.emit('games', {
									type: 'mines',
									tile: numarTile,
									started: '1',
									result: 'lost',
									trimitegameID: gameIDDD,
									cctl: '0',
									joculJoc: '24',
									noBomb: noBomb
								});	

								query('SELECT `id`,`amountWon`,`result`,`hash` FROM `mines` WHERE `steamid`='+pool.escape(user.steamid)+' ORDER BY id DESC LIMIT 1', function(err, row) {
									if(err) {
										logger.debug('ERROR IN DB');
										logger.error(err);
									}else {
										socket.emit('message', {
											type: 'alert',
											alert: 'GameID: #'+row[0].id
										});

										socket.emit('message', {
											type: 'setHashMines',
											hash: row[0].hash
										});

										if(row[0].result == '-1') {
											query('UPDATE `mines` SET `result`=0,`amountWon`=0 WHERE `steamid`='+pool.escape(user.steamid)+' ORDER BY id DESC LIMIT 1');
										}
									}
								});
							}
						}
					}else{
						socket.emit('message', {
							type: 'error',
							error: 'Error: Cannot check that tile.'

						});
					}


				}else {
					socket.emit('message', {
						type: 'error',
						error: 'Error: Game ID not found.'

					});
				}
			}else {
				socket.emit('message', {
					type: 'error',
					error: 'Error: The games already started were closed by an Administrator, you need to Cashout the game.'

				});
			}
		}
	});

	socket.on('Dices', function(m) {
		if(m.tip == 'adaugareBani') {
			var SumaWon = m.bani;

			query('UPDATE `users` SET `balance`=`balance`+'+parseInt(1.9*SumaWon)+' WHERE `steamid`='+pool.escape(user.steamid));

			setTimeout(function () { getBalance(user, socket) }, 100);
		}


		if(m.tip == 'AstartDice') {
			var MineS = m.started;
			var TipJoc = m.type;
			var SumaBetuita = m.suma;


			if(canPlayersBet == 1) {
				query('SELECT `balance` FROM `users` WHERE `steamid`='+pool.escape(user.steamid), function(err, row) {

					if(WhoUsedDieces[user.steamid]+2 >= time()) {
						socket.emit('message', {
							type: 'error',
							enable: true,
							error: 'Error: Too fast.'
						});
						return;
					} else {
						WhoUsedDieces[user.steamid] = time();
					}

					if(SumaBetuita > row[0].balance) {
						socket.emit('message', {
							type: 'error',
							error: 'Error: Insufficient funds!'
						});
					}else if((SumaBetuita < minbet) || (SumaBetuita > maxbet)) {
						socket.emit('message', {
							type: 'error',
							error: 'Error: Invalid bet amount. ['+minbet+'-'+maxbet+']'

						});
						return;
					}else if(/(a|b|c|d|e|f|g|h|j|i|k|l|m|n|o|p|q|r|s|t|v|u|w|x|y|z)/.exec(SumaBetuita)) {
						socket.emit('message', {
							type: 'error',
							enable: true,
							error: 'Error: Invalid bet amount.'
						});
						return;
					}else {
						if(MineS != 1) {
							if(TipJoc == "0") {
								socket.emit('message', {
									type: 'error',
									error: 'Error: You need to select a type of game [low/medium/high].'

								});
							}else {
								query('UPDATE `users` SET `balance`=`balance`-'+SumaBetuita+' WHERE `steamid`='+pool.escape(user.steamid));

								setTimeout(function () { getBalance(user, socket) }, 100);



											if(TipJoc == 'Low') {
												var RandomNumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
												var Rolled;
												if(RandomNumber == 1) {
													Rolled = Math.floor(Math.random() * (6 - 5 + 1)) + 5;
												}else if(RandomNumber == 2) {
													Rolled = Math.floor(Math.random() * (4 - 3 + 1)) + 3;
												}else if(RandomNumber == 3) {
													Rolled = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
												}

												if(Rolled != 6 && Rolled != 5 && Rolled != 4 && Rolled != 3) {
													socket.emit('games', {
														type: 'dices',
														rolled: Rolled,
														state: 'Awon'
													});

													var sh = sha256(Rolled+'-'+SumaBetuita+'-'+time());
													socket.emit('message', {
														type: 'alert',
														alert: 'Game won! Rolled: '+Rolled+' & Amount collected: '+parseInt(1.9*SumaBetuita)+' & Hash: '+ sh
													});

													logger.debug('[A-DICES] User: '+user.steamid+' | Won '+parseInt(1.9*SumaBetuita)+' coins | Type: '+TipJoc);
												}else {
													socket.emit('games', {
														type: 'dices',
														rolled: Rolled,
														state: 'Alost'
													});

													var sh = sha256(Rolled+'-'+SumaBetuita+'-'+time());
													socket.emit('message', {
														type: 'error',
														error: 'Game lost! Rolled: '+Rolled+' & Amount lost: '+SumaBetuita+' & Hash: '+ sh
													});
													

													logger.debug('[A-DICES] User: '+user.steamid+' | Lost '+SumaBetuita+' coins | Type: '+TipJoc);
												}


											}else if(TipJoc == 'Medium') {
												var RandomNumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
												var Rolled
												if(RandomNumber == 1) {
													Rolled = Math.floor(Math.random() * (6 - 5 + 1)) + 5;
												}else if(RandomNumber == 2) {
													Rolled = Math.floor(Math.random() * (4 - 3 + 1)) + 3;
												}else if(RandomNumber == 3) {
													Rolled = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
												}

												if(Rolled != 6 && Rolled != 5 && Rolled != 2 && Rolled != 1) {
													socket.emit('games', {
														type: 'dices',
														rolled: Rolled,
														state: 'Awon'
													});

													var sh = sha256(Rolled+'-'+SumaBetuita+'-'+time());
													socket.emit('message', {
														type: 'alert',
														alert: 'Game won! Rolled: '+Rolled+' & Amount collected: '+parseInt(1.9*SumaBetuita)+' & Hash: '+ sh
													});

													logger.debug('[A-DICES] User: '+user.steamid+' | Won '+parseInt(1.9*SumaBetuita)+' coins | Type: '+TipJoc);
												}else {
													socket.emit('games', {
														type: 'dices',
														rolled: Rolled,
														state: 'Alost'
													});

													var sh = sha256(Rolled+'-'+SumaBetuita+'-'+time());
													socket.emit('message', {
														type: 'error',
														error: 'Game lost! Rolled: '+Rolled+' & Amount lost: '+SumaBetuita+' & Hash: '+ sh
													});

													logger.debug('[A-DICES] User: '+user.steamid+' | Lost '+SumaBetuita+' coins | Type: '+TipJoc);
												}
											}else if(TipJoc == 'High') {
												var RandomNumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
												var Rolled;
												if(RandomNumber == 1) {
													Rolled = Math.floor(Math.random() * (6 - 5 + 1)) + 5;
												}else if(RandomNumber == 2) {
													Rolled = Math.floor(Math.random() * (4 - 3 + 1)) + 3;
												}else if(RandomNumber == 3) {
													Rolled = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
												}

												if(Rolled != 4 && Rolled != 3 && Rolled != 2 && Rolled != 1) {
													socket.emit('games', {
														type: 'dices',
														rolled: Rolled,
														state: 'Awon'
													});

													var sh = sha256(Rolled+'-'+SumaBetuita+'-'+time());
													socket.emit('message', {
														type: 'alert',
														alert: 'Game won! Rolled: '+Rolled+' & Amount collected: '+parseInt(1.9*SumaBetuita)+' & Hash: '+ sh
													});

													logger.debug('[A-DICES] User: '+user.steamid+' | Won '+parseInt(1.9*SumaBetuita)+' coins | Type: '+TipJoc);
												}else {
													socket.emit('games', {
														type: 'dices',
														rolled: Rolled,
														state: 'Alost'
													});

													var sh = sha256(Rolled+'-'+SumaBetuita+'-'+time());
													socket.emit('message', {
														type: 'error',
														error: 'Game lost! Rolled: '+Rolled+' & Amount lost: '+SumaBetuita+' & Hash: '+ sh
													});

													logger.debug('[A-DICES] User: '+user.steamid+' | Lost '+SumaBetuita+' coins | Type: '+TipJoc);
												}
											}else {
												socket.emit('message', {
													type: 'error',
													error: 'There is no type selected!'
												});
											}
							}
						}else {
							socket.emit('message', {
								type: 'error',
								error: 'Error: The game is already started.'

							});
						}
					}
				});
			}else {
				socket.emit('message', {
					type: 'error',
					error: 'Error: You cannot start game because Administrator closed Dices.'

				});
			}
		}
 
		if(m.tip == 'startDice') {
			var MineS = m.started;
			var TipJoc = m.type;
			var SumaBetuita = m.suma;


			if(canPlayersBet == 1) {
				query('SELECT `balance` FROM `users` WHERE `steamid`='+pool.escape(user.steamid), function(err, row) {

					if(WhoUsedDieces[user.steamid]+2 >= time()) {
						socket.emit('message', {
							type: 'error',
							enable: true,
							error: 'Error: Too fast.'
						});
						return;
					} else {
						WhoUsedDieces[user.steamid] = time();
					}

					if(SumaBetuita > row[0].balance) {
						socket.emit('message', {
							type: 'error',
							error: 'Error: Insufficient funds!'
						});
					}else if((SumaBetuita < minbet) || (SumaBetuita > maxbet)) {
						socket.emit('message', {
							type: 'error',
							error: 'Error: Invalid bet amount. ['+minbet+'-'+maxbet+']'

						});
						return;
					}else if(/(a|b|c|d|e|f|g|h|j|i|k|l|m|n|o|p|q|r|s|t|v|u|w|x|y|z)/.exec(SumaBetuita)) {
						socket.emit('message', {
							type: 'error',
							enable: true,
							error: 'Error: Invalid bet amount.'
						});
						return;
					}else {
						if(MineS != 1) {
							if(TipJoc == "0") {
								socket.emit('message', {
									type: 'error',
									error: 'Error: You need to select a type of game [low/medium/high].'

								});
							}else {
								query('UPDATE `users` SET `balance`=`balance`-'+SumaBetuita+' WHERE `steamid`='+pool.escape(user.steamid));

								setTimeout(function () { getBalance(user, socket) }, 100);



											if(TipJoc == 'Low') {
												var RandomNumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
												var Rolled;
												if(RandomNumber == 1) {
													Rolled = Math.floor(Math.random() * (6 - 5 + 1)) + 5;
												}else if(RandomNumber == 2) {
													Rolled = Math.floor(Math.random() * (4 - 3 + 1)) + 3;
												}else if(RandomNumber == 3) {
													Rolled = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
												}

												if(Rolled != 6 && Rolled != 5 && Rolled != 4 && Rolled != 3) {
													socket.emit('games', {
														type: 'dices',
														rolled: Rolled,
														started: '1',
														state: 'won'
													});

													var sh = sha256(Rolled+'-'+SumaBetuita+'-'+time());
													socket.emit('message', {
														type: 'alert',
														alert: 'Game won! Rolled: '+Rolled+' & Amount collected: '+parseInt(1.9*SumaBetuita)+' & Hash: '+ sh
													});

												}else {
													socket.emit('games', {
														type: 'dices',
														rolled: Rolled,
														started: '1',
														state: 'lost'
													});

													var sh = sha256(Rolled+'-'+SumaBetuita+'-'+time());
													socket.emit('message', {
														type: 'error',
														error: 'Game lost! Rolled: '+Rolled+' & Amount lost: '+SumaBetuita+' & Hash: '+ sh
													});

												}


											}else if(TipJoc == 'Medium') {
												var RandomNumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
												var Rolled
												if(RandomNumber == 1) {
													Rolled = Math.floor(Math.random() * (6 - 5 + 1)) + 5;
												}else if(RandomNumber == 2) {
													Rolled = Math.floor(Math.random() * (4 - 3 + 1)) + 3;
												}else if(RandomNumber == 3) {
													Rolled = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
												}

												if(Rolled != 6 && Rolled != 5 && Rolled != 2 && Rolled != 1) {
													socket.emit('games', {
														type: 'dices',
														rolled: Rolled,
														started: '1',
														state: 'won'
													});

													var sh = sha256(Rolled+'-'+SumaBetuita+'-'+time());
													socket.emit('message', {
														type: 'alert',
														alert: 'Game won! Rolled: '+Rolled+' & Amount collected: '+parseInt(1.9*SumaBetuita)+' & Hash: '+ sh
													});

												}else {
													socket.emit('games', {
														type: 'dices',
														rolled: Rolled,
														started: '1',
														state: 'lost'
													});

													var sh = sha256(Rolled+'-'+SumaBetuita+'-'+time());
													socket.emit('message', {
														type: 'error',
														error: 'Game lost! Rolled: '+Rolled+' & Amount lost: '+SumaBetuita+' & Hash: '+ sh
													});

												}
											}else if(TipJoc == 'High') {
												var RandomNumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
												var Rolled;
												if(RandomNumber == 1) {
													Rolled = Math.floor(Math.random() * (6 - 5 + 1)) + 5;
												}else if(RandomNumber == 2) {
													Rolled = Math.floor(Math.random() * (4 - 3 + 1)) + 3;
												}else if(RandomNumber == 3) {
													Rolled = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
												}

												if(Rolled != 4 && Rolled != 3 && Rolled != 2 && Rolled != 1) {
													socket.emit('games', {
														type: 'dices',
														rolled: Rolled,
														started: '1',
														state: 'won'
													});

													var sh = sha256(Rolled+'-'+SumaBetuita+'-'+time());
													socket.emit('message', {
														type: 'alert',
														alert: 'Game won! Rolled: '+Rolled+' & Amount collected: '+parseInt(1.9*SumaBetuita)+' & Hash: '+ sh
													});

												}else {
													socket.emit('games', {
														type: 'dices',
														rolled: Rolled,
														started: '1',
														state: 'lost'
													});

													var sh = sha256(Rolled+'-'+SumaBetuita+'-'+time());
													socket.emit('message', {
														type: 'error',
														error: 'Game lost! Rolled: '+Rolled+' & Amount lost: '+SumaBetuita+' & Hash: '+ sh
													});

												}
											}else {
												socket.emit('message', {
													type: 'error',
													error: 'There is no type selected!'
												});
											}
							}
						}else {
							socket.emit('message', {
								type: 'error',
								error: 'Error: The game is already started.'

							});
						}
					}
				});
			}else {
				socket.emit('message', {
					type: 'error',
					error: 'Error: You cannot start game because Administrator closed Dices.'

				});
			}
		}
	});

	socket.on('disconnect', function() {
		io.sockets.emit('message', {
			type: 'logins',
			count: Object.size(io.sockets.connected)
		});

		query('SELECT `hash` FROM `users` WHERE `hash` = '+pool.escape(hash), function(err, row) {
			if((err) || (!row.length)) {
				delete users[socket.id];
				currentUsersOnline--;
				updateAmountOfBetting(currentUsersOnline);
			}else {
				delete users[user.steamid];
				currentUsersOnline--;
				updateAmountOfBetting(currentUsersOnline);
				socket.leave(user.steamid);
			}
		});
	});
});


function addBots() {
	IntervalBetuireBoti = setInterval(function () {
		if(CurrentTimesForBotsToBet != TimesForBotsToBet) {
			setBetBots();
			setBetBots();
			CurrentTimesForBotsToBet;
		}
	}, IntervalDeBetuireBoti);
}

function ChatsBots() {
	IntervalChatBotii = setInterval(function () {
		addChatBots();
		addChatBots();
	}, TimeOfBotsChatting);
}

function addChatBots() {
	var botID = Math.floor(Math.random() * (20 - 1 + 1)) + 1;

	var Messages = ["Hello, dudes! All in green.", "Fuck this website, I lost all!", "omfggggg...", "that was almost dudeeee", "no way, I am giving up!", "Hello? I will win.", "ezzz", "idinahuij", "kurwa site dah", "omgggg", "scam site reported  i lost allz my coins", "omfgg, who is the owner. iwant items back...", "I can predict all!!", "Red now!!!", "Blackkkkk", "black 9/2", "izi pizi green", "nooooooo", "fuckkk my life", "Moderator ban me pls, I hate this website", "omfggg, are you idiot!?!","what the fuck|?!!", "ggez I am god!!", " No problem my friend."];
	
	pickBot(botID);

	var STEAMID = 1337+botID;
	var RandomMessage = Math.floor(Math.random() * (Messages.length - 1 + 1)) + 1;

	io.sockets.emit('message', {
		type: 'chat',
		msg: Messages[RandomMessage],
		name: BotBetName,
		icon: BotBetAvatar,
		user: '',
		rank: '0',
		verify: '0',
		lang: '1',
		hide: '1'
	});
}

function pickBot(botID){
	if(botID == 1) {
		BotBetName = "AlexCRZ";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/13/13641a9fc24377a85b18f0b0d56e04cdb75a1715.jpg";
	}else if(botID == 2) {
		BotBetName = "mARIO";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/6f/6fc1b305a307efc12fc6a2f9b18c1fd4510b5684.jpg";
	}else if(botID == 3) {
		BotBetName = "KennyS"
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/ad/ad4729c5155426dbda96603113c2b35770f8ed48.jpg";
	}else if(botID == 4) {
		BotBetName = "FigarooOS";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/8e/8ec6eb5e66ee0b1bca7eed597bc1ad73f9c499fb.jpg";
	}else if(botID == 5) {
		BotBetName = "Afanasi";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/a6/a6c5e3e856d4b8313a6ea19d4c7771da68d7abda.jpg";
	}else if(botID == 6) {
		BotBetName = "AnomaliCR";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/34/345a94183ba1f34903b5df7fe26156af0002f754.jpg";
	}else if(botID == 7) {
		BotBetName = "CZArina";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/3c/3c75462f4636237febefa17eceda3d9a8a90389d.jpg";
	}else if(botID == 8) {
		BotBetName = "Egorr";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/75/75a3407bcdc1ddf3075afc5b6b462b15e7dada1a.jpg";
	}else if(botID == 9) {
		BotBetName = "Fabii";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/be/be7f486e6b6c793c52e4b8b6d931a4446e40d71f.jpg";
	}else if(botID == 10) {
		BotBetName = "Isidor";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/f7/f72df2f71afb5c78340bc8866654e5068f322058.jpg";
	}else if(botID == 11) {
		BotBetName = "Parse";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/9c/9c40f22a8e697192d26b3cd87fad97007a58f345.jpg";
	}else if(botID == 12) {
		BotBetName = "Kiska";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/6d/6dc7e194419cc4445e569c343036d0c676832de7.jpg";
	}else if(botID == 13) {
		BotBetName = "Lila";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/09/099eb9d4f33acaf7da0cc36f395cc076f6a44070.jpg";
	}else if(botID == 14) {
		BotBetName = "Ionutz";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg";
	}else if(botID == 15) {
		BotBetName = "Hacki";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/07/07afc9a0d3746804964eba6043245e68299476c5.jpg";
	}else if(botID == 16) {
		BotBetName = "Killer";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/35/3558f1dc05717b57b43eca40cfa963407c6705eb.jpg";
	}else if(botID == 17) {
		BotBetName = "Milfanos";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/01/0136e6775252a869ba6da0f9c4eec09fad46760f.jpg";
	}else if(botID == 18) {
		BotBetName = "PicardoSX";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/10/10ac70b49140bdd4471f806bdc092f47d87aa109.jpg";
	}else if(botID == 19) {
		BotBetName = "Mauritzo";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/cb/cbd22949661f9aa88afe60b7603b0faf02725135.jpg";
	}else if(botID == 20) {
		BotBetName = "FindNextTab";
		BotBetAvatar = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/07/07afc9a0d3746804964eba6043245e68299476c5.jpg";
	}else {
		return;
	}
}

function setBetBots() {
	var RandomBot = Math.floor(Math.random() * (20 - 1 + 1)) + 1;

	addBetBot(RandomBot);
}

function addBetBot(botID) {
	var BotUser = 1337+botID;

	var UsedBots = [];

	pickBot(botID);
 
	var amount = Math.floor(Math.random() * (1450 - 250 + 1)) + 250;

	var lower;
	var upper;

	var RandomBet = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

	if(RandomBet == 1) {
		lower = 0;
		upper = 0;
	}else if(RandomBet == 2) {
		lower = 1;
		upper = 7;
	}else if(RandomBet == 3){
		lower = 8;
		upper = 12;
	}else if(RandomBet == 4){
		lower = 13;
		upper = 14;
	}

	if(timer-wait <= 5) {
		//logger.debug('Bot did not bet!!');
	}else {
	if(usersBr[BotUser] === undefined) {
		usersBr[BotUser] = 1;
	} else {
		usersBr[BotUser]++;
	}
	if(usersAmount[BotUser] === undefined) {
		usersAmount[BotUser] = {
			'0-0': 0,
			'1-7': 0,
			'8-12': 0,
			'13-14': 0
		};
	}
	usersAmount[BotUser][lower+'-'+upper] += parseInt(amount);
	currentSums[lower+'-'+upper] += amount;
	io.sockets.emit('message', {
		type: 'bet',
		bet: {
			amount: usersAmount[BotUser][lower+'-'+upper],
			icon: BotBetAvatar,
			lower: lower,
			name: BotBetName,
			rollid: currentRollid,
			upper: upper,
			user: BotUser,
			won: null
		},
		sums: {
			0: currentSums['0-0'],
			1: currentSums['1-7'],
			2: currentSums['8-12'],
			3: currentSums['13-14']
		}
	});
		currentBets.push({
			amount: amount,
			icon: BotBetAvatar,
			lower: lower,
			name: BotBetName,
			rollid: currentRollid,
			upper: upper,
			user: BotUser,
		});
		checkTimer();
	}
}


function updateAmountOfBetting(currentUsers) {
	currentAmountForchat = parseInt(1.25*currentUsers)*4300;
}




function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}




function createCFGame(m, user, socket) {
	var selectedCoin = m.selectedCoin;
	var betAmount = m.amount;

	if(betAmount < 100 || betAmount > 250000) {
		socket.emit('message', {
			type: 'error',
			error: 'Error: Invalid bet amount [100-250000].'
		})
		return;
	}

	query('SELECT COUNT(*) AS `total` FROM `coinflip` WHERE `p1_steamid`='+pool.escape(user.steamid)+' AND `result`=0', function(err, row) {
		if(err) {
			logger.error('ERROR');
			logger.error(err);
		}

		if(betAmount > user.balance) {
			socket.emit('message', {
				type: 'error',
				error: 'Error: You do not have enough coins to create the game.'
			});
			return;
		}else {
			if(row[0].total == 3) {
				socket.emit('message', {
					type: 'error',
					error: 'Error: You can create just 3 games.'
				});
			}else {
				query('UPDATE `users` SET `balance`=`balance`-'+pool.escape(betAmount)+' WHERE `steamid`='+pool.escape(user.steamid));

				//if(user.rank != 100) return;

				var castigator = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
				if(castigator == '1') {
					WinnerC = 'ct';
				}else if(castigator == '2') {
					WinnerC = 't';
				}

				query('INSERT INTO `coinflip` SET `p1_steamid`='+pool.escape(user.steamid)+',`p1_name`='+pool.escape(user.name)+',`p1_pick`='+pool.escape(selectedCoin)+',`amount`='+pool.escape(betAmount)+',`won_pick`='+pool.escape(WinnerC)+',`result`=0,`time`='+pool.escape(time()));
			}
		}
	});
}



function watchCFGame(m, user, socket) {
	var NumberID = m.gamenr;
	var Amount = m.suma;

	query('SELECT `p1_pick`,`p1_name`,`p1_steamid`,`won_pick` FROM `coinflip` WHERE `id`='+pool.escape(NumberID), function(err, row) {
		if(err) return;

		var PickP1 = row[0].p1_pick;
		var NameP1 = row[0].p1_name;
		var SteamP1 = row[0].p1_steamid;
		var Won_pick = row[0].won_pick;

		query('SELECT `avatar` FROM `users` WHERE `steamid`='+pool.escape(SteamP1), function(err2, row2){
			if(err2) return;

			var AvatarP1 = row2[0].avatar;


			socket.emit('message', {
				type: 'watchcfgame',
				GameID: NumberID,
				pickp1: PickP1,
				namep1: NameP1,
				steamp1: SteamP1,
				avatarp1: AvatarP1,
				wonpick: Won_pick
			});

		});

	});
}



function joinCFGame(m, user, socket) {
	var NumberGame = m.gamenr;
	var pickedP2Coin = m.pick_p2;



	//if(user.rank != 100) return;


	query('SELECT `result`,`id`,`p1_pick`,`amount`,`p1_steamid`,`p1_name` FROM `coinflip` WHERE `id`='+pool.escape(NumberGame), function(err, row) {
		if(err) return;

		if(user.steamid == row[0].p1_steamid) {
			socket.emit('message', {
				type: 'error',
				error: 'Error: You cannot join your game!'
			})
			return;
		}

		if(user.balance < row[0].amount) {
			socket.emit('message', {
				type: 'error',
				error: 'Error: You do not have enough coins to join the game.'
			})
			return;
		}else if(row[0].amount <= user.balance) {

			var resulto = row[0].result;

			if(resulto == 1) {
				socket.emit('message', {
					type: 'error',
					error: 'Error: You cannot join a game that is already finished.'
				});
			}else {

				query('UPDATE `coinflip` SET `result`=1 WHERE `id`='+row[0].id);
				query('UPDATE `users` SET `balance`=`balance`-'+pool.escape(row[0].amount)+' WHERE `steamid`='+pool.escape(user.steamid));

				query('UPDATE `coinflip` SET `p2_steamid`='+pool.escape(user.steamid)+',`p2_name`='+pool.escape(user.name)+',`p2_pick`='+pool.escape(pickedP2Coin)+' WHERE `id`='+row[0].id);

				query('SELECT `won_pick`,`id` FROM `coinflip` WHERE `id`='+pool.escape(row[0].id), function(err2, row2) {
					if(err2) return;
					var tipul;

					if(row2[0].won_pick == 't') {
						tipul = 'winnerCFt';
					}else if(row2[0].won_pick == 'ct') {
						tipul = 'winnerCFct';
					}


					setTimeout(function() {
						if(row2[0].won_pick == row[0].p1_pick) {
							query('UPDATE `users` SET `balance`=`balance`+'+parseInt(1.95*row[0].amount)+' WHERE `steamid`='+pool.escape(row[0].p1_steamid));

							setTimeout(function() {
								io.sockets.in(row[0].p1_steamid).emit('message', {
									type: 'alert',
									alert: 'You won the coinflip game #'+row[0].id+' | Coins won: '+parseInt(1.95*row[0].amount)
								});
								io.sockets.in(user.steamid).emit('message', {
									type: 'error',
									error: 'You lost the coinflip game #'+row[0].id+' | Coins lost: '+parseInt(row[0].amount)
								});
							}, 4000);

							query('SELECT `avatar` FROM `users` WHERE `steamid`='+pool.escape(row[0].p1_steamid), function(err3, row3) {
								if(err3) return;

								query('SELECT `avatar` FROM `users` WHERE `steamid`='+pool.escape(user.steamid), function(err4, row4) {
									io.sockets.in(row[0].p1_steamid).emit('message', {
										type: 'finishCoinflip',
										flip: row2[0].won_pick,
										numeplayer1: row[0].p1_name,
										steamidplayer1: row[0].p1_steamid,
										choiceplayer1: row[0].p1_pick,
										avatarplayer1: row3[0].avatar,
										numeplayer2: user.name,
										steamidplayer2: user.steamid,
										choiceplayer2: pickedP2Coin,
										avatarplayer2: row4[0].avatar
									});

									io.sockets.in(user.steamid).emit('message', {
										type: 'finishCoinflip',
										flip: row2[0].won_pick,
										numeplayer1: row[0].p1_name,
										steamidplayer1: row[0].p1_steamid,
										choiceplayer1: row[0].p1_pick,
										avatarplayer1: row3[0].avatar,
										numeplayer2: user.name,
										steamidplayer2: user.steamid,
										choiceplayer2: pickedP2Coin,
										avatarplayer2: row4[0].avatar
									});


									//SEND WATCH TO PLAYER
									io.sockets.emit('message', {
										type: 'watchcfgameShow',
										GameID: row2[0].id,
										flip: row2[0].won_pick,
										numeplayer2: user.name,
										steamidplayer2: user.steamid,
										choiceplayer2: pickedP2Coin,
										avatarplayer2: row4[0].avatar
									});

								});
							});

						}else if(row2[0].won_pick != row[0].p1_pick) {
							query('UPDATE `users` SET `balance`=`balance`+'+parseInt(1.95*row[0].amount)+' WHERE `steamid`='+pool.escape(user.steamid));

							setTimeout(function() {
								io.sockets.in(row[0].p1_steamid).emit('message', {
									type: 'alert',
									error: 'You lost the coinflip game #'+row[0].id+' | Coins lost: '+parseInt(row[0].amount)
								});
								io.sockets.in(user.steamid).emit('message', {
									type: 'alert',
									alert: 'You won the coinflip game #'+row[0].id+' | Coins won: '+parseInt(1.95*row[0].amount)
								});
							}, 4000);

							query('SELECT `avatar` FROM `users` WHERE `steamid`='+pool.escape(row[0].p1_steamid), function(err3, row3) {
								if(err3) return;

								query('SELECT `avatar` FROM `users` WHERE `steamid`='+pool.escape(user.steamid), function(err4, row4) {
									io.sockets.in(row[0].p1_steamid).emit('message', {
										type: 'finishCoinflip',
										flip: row2[0].won_pick,
										numeplayer1: row[0].p1_name,
										steamidplayer1: row[0].p1_steamid,
										choiceplayer1: row[0].p1_pick,
										avatarplayer1: row3[0].avatar,
										numeplayer2: user.name,
										steamidplayer2: user.steamid,
										choiceplayer2: pickedP2Coin,
										avatarplayer2: row4[0].avatar
									});

									io.sockets.in(user.steamid).emit('message', {
										type: 'finishCoinflip',
										flip: row2[0].won_pick,
										numeplayer1: row[0].p1_name,
										steamidplayer1: row[0].p1_steamid,
										choiceplayer1: row[0].p1_pick,
										avatarplayer1: row3[0].avatar,
										numeplayer2: user.name,
										steamidplayer2: user.steamid,
										choiceplayer2: pickedP2Coin,
										avatarplayer2: row4[0].avatar
									});

									//SEND WATCH TO PLAYER
									io.sockets.emit('message', {
										type: 'watchcfgameShow',
										GameID: row2[0].id,
										flip: row2[0].won_pick,
										numeplayer2: user.name,
										steamidplayer2: user.steamid,
										choiceplayer2: pickedP2Coin,
										avatarplayer2: row4[0].avatar
									});

								});
							});
						}
					}, 1500);
				});
			}
		}
	});
}


/*function plus(user, socket) {
 if(!/(CSGO4ROLLS.COM|csgo4rolls.com|CSGO4Rolls.com)/.exec(user.name)) {
  socket.emit('message', {
   type: 'alert',
   alert: 'You need to add CSGO4Rolls.com to your Steam nickname.'
  });
  return;
 } else {
  query('SELECT * FROM `users` WHERE `steamid` = '+pool.escape(user.steamid), function(err, row) {
   if(err) return; 
   if(time() > row[0].plus) {
    query('UPDATE `users` SET `plus` = '+pool.escape(time()+43200)+', `balance` = `balance` + 5 WHERE `steamid` = '+user.steamid);
    socket.emit('message', {
     type: 'alert',
     alert: 'You received 5 coins.'
    });
    setTimeout(function() { getBalance(user, socket); }, 500);
   } else {
    socket.emit('message', {
     type: 'alert',
     alert: 'You need to wait '+parseInt((row[0].plus-time())/3600)+' hours to get more coins.'
    });   
   }
  });
 }
}*/



function caseOpen(m, user, socket) {
	if(m.tipBox) {
		if(m.tipBox == "1") {
			if(m.amount != 300) return;

			query('SELECT `balance` FROM `users` WHERE `steamid`='+pool.escape(user.steamid), function(err, row) {
				if(err) return;
				var SumaLuata = m.amount;

				if(row[0].balance < SumaLuata) {
					socket.emit('message', {
						type: 'error',
						enable: true,
						error: 'You do not have coins!'
					});
				}else {

					var randomCase;
					var amountWon;

					var randomCase1 = getRandomInt(1, 2);

					if(randomCase1 == 1) {
						var random = getRandomInt(1, 2);
						if(random == 1) {
							var random2 = getRandomInt(1, 2);
							if(random2 == 1) {
								randomCase = 15;
							}else {
								randomCase = 3;
							}
						}else {
							randomCase = 1;
						}
					}else if(randomCase1 == 2) {
						var randomIdinahui = getRandomInt(1, 15);
						randomCase = randomIdinahui;
					}

					query('UPDATE `users` SET `balance`=`balance`-'+SumaLuata+' WHERE `steamid`='+pool.escape(user.steamid));
					setTimeout(function() { getBalance(user, socket); }, 100);





					if(randomCase == 1) {
						amountWon = 1000;
					}else if(randomCase == 2) {
						amountWon = 200;
					}else if(randomCase == 3) {
						amountWon = 55;
					}else if(randomCase == 4) {
						amountWon = 210;
					}else if(randomCase == 5) {
						amountWon = 25;
					}else if(randomCase == 6) {
						amountWon = 123;
					}else if(randomCase == 7) {
						amountWon = 321;
					}else if(randomCase == 8) {
						amountWon = 111;
					}else if(randomCase == 9) {
						amountWon = 112;
					}else if(randomCase == 10) {
						amountWon = 188;
					}else if(randomCase == 11) {
						amountWon = 89;
					}else if(randomCase == 12) {
						amountWon = 24;
					}else if(randomCase == 13) {
						amountWon = 29;
					}else if(randomCase == 14) {
						amountWon = 112;
					}else if(randomCase == 15) {
						amountWon = 0;
					}

					var profit = 0;

					setTimeout(function() {
						query('UPDATE `users` SET `balance`=`balance`+'+amountWon+' WHERE `steamid`='+pool.escape(user.steamid));
						if(amountWon >= SumaLuata) {
							profit = 1;
						}else {
							profit = 0;
						}
						query('INSERT INTO `mbox` SET `name`='+pool.escape(user.name)+',`steamid`='+pool.escape(user.steamid)+',`priceCase`='+pool.escape(SumaLuata)+',`amountWon`='+pool.escape(amountWon)+',`profit`='+pool.escape(profit));
					}, 500);


					socket.emit('games', {
						type: 'mbox',
						tip: '1',
						number: randomCase,
						state: 'open',
						wobble: 0.35,
						balance: row[0].balance
					});

					logger.debug('[MBOX] User: '+pool.escape(user.steamid)+' | Tip: 1 | Numar: '+randomCase);
				}
			});
		}else if(m.tipBox == "2") {
			if(m.amount != 1000) return;

			query('SELECT `balance` FROM `users` WHERE `steamid`='+pool.escape(user.steamid), function(err, row) {
				if(err) return;
				var SumaLuata = m.amount;

				if(row[0].balance < SumaLuata) {
					socket.emit('message', {
						type: 'error',
						enable: true,
						error: 'You do not have coins!'
					});
				}else {

					var randomCase;
					var amountWon;

					var randomCase1 = getRandomInt(1, 2);

					if(randomCase1 == 1) {
						var random = getRandomInt(1, 2);
						if(random == 1) {
							var random2 = getRandomInt(1, 2);
							if(random2 == 1) {
								randomCase = 15;
							}else {
								randomCase = 3;
							}
						}else {
							randomCase = 1;
						}
					}else if(randomCase1 == 2) {
						var randomIdinahui = getRandomInt(1, 15);
						randomCase = randomIdinahui;
					}

					query('UPDATE `users` SET `balance`=`balance`-'+SumaLuata+' WHERE `steamid`='+pool.escape(user.steamid));
					setTimeout(function() { getBalance(user, socket); }, 100);





					if(randomCase == 1) {
						amountWon = 3500;
					}else if(randomCase == 2) {
						amountWon = 800;
					}else if(randomCase == 3) {
						amountWon = 250;
					}else if(randomCase == 4) {
						amountWon = 425;
					}else if(randomCase == 5) {
						amountWon = 741;
					}else if(randomCase == 6) {
						amountWon = 250;
					}else if(randomCase == 7) {
						amountWon = 2300;
					}else if(randomCase == 8) {
						amountWon = 940;
					}else if(randomCase == 9) {
						amountWon = 500;
					}else if(randomCase == 10) {
						amountWon = 100;
					}else if(randomCase == 11) {
						amountWon = 674;
					}else if(randomCase == 12) {
						amountWon = 321;
					}else if(randomCase == 13) {
						amountWon = 556;
					}else if(randomCase == 14) {
						amountWon = 712;
					}else if(randomCase == 15) {
						amountWon = 0;
					}

					var profit = 0;

					setTimeout(function() {
						query('UPDATE `users` SET `balance`=`balance`+'+amountWon+' WHERE `steamid`='+pool.escape(user.steamid));
						if(amountWon >= SumaLuata) {
							profit = 1;
						}else {
							profit = 0;
						}
						query('INSERT INTO `mbox` SET `name`='+pool.escape(user.name)+',`steamid`='+pool.escape(user.steamid)+',`priceCase`='+pool.escape(SumaLuata)+',`amountWon`='+pool.escape(amountWon)+',`profit`='+pool.escape(profit));
					}, 500);


					socket.emit('games', {
						type: 'mbox',
						tip: '2',
						number: randomCase,
						state: 'open',
						wobble: 0.35,
						balance: row[0].balance
					});

					logger.debug('[MBOX] User: '+pool.escape(user.steamid)+' | Tip: 2 | Numar: '+randomCase);
				}
			});
		}else if(m.tipBox == "3") {
			if(m.amount != 3000) return;

			query('SELECT `balance` FROM `users` WHERE `steamid`='+pool.escape(user.steamid), function(err, row) {
				if(err) return;
				var SumaLuata = m.amount;

				if(row[0].balance < SumaLuata) {
					socket.emit('message', {
						type: 'error',
						enable: true,
						error: 'You do not have coins!'
					});
				}else {

					var randomCase;
					var amountWon;

					var randomCase1 = getRandomInt(1, 2);

					if(randomCase1 == 1) {
						var random = getRandomInt(1, 2);
						if(random == 1) {
							var random2 = getRandomInt(1, 2);
							if(random2 == 1) {
								randomCase = 15;
							}else {
								randomCase = 8;
							}
						}else {
							randomCase = 1;
						}
					}else if(randomCase1 == 2) {
						var randomIdinahui = getRandomInt(1, 15);
						randomCase = randomIdinahui;
					}

					query('UPDATE `users` SET `balance`=`balance`-'+SumaLuata+' WHERE `steamid`='+pool.escape(user.steamid));
					setTimeout(function() { getBalance(user, socket); }, 100);





					if(randomCase == 1) {
						amountWon = 4000;
					}else if(randomCase == 2) {
						amountWon = 1200;
					}else if(randomCase == 3) {
						amountWon = 450;
					}else if(randomCase == 4) {
						amountWon = 525;
					}else if(randomCase == 5) {
						amountWon = 941;
					}else if(randomCase == 6) {
						amountWon = 450;
					}else if(randomCase == 7) {
						amountWon = 2900;
					}else if(randomCase == 8) {
						amountWon = 1340;
					}else if(randomCase == 9) {
						amountWon = 700;
					}else if(randomCase == 10) {
						amountWon = 300;
					}else if(randomCase == 11) {
						amountWon = 874;
					}else if(randomCase == 12) {
						amountWon = 666;
					}else if(randomCase == 13) {
						amountWon = 776;
					}else if(randomCase == 14) {
						amountWon = 924;
					}else if(randomCase == 15) {
						amountWon = 0;
					}

					var profit = 0;

					setTimeout(function() {
						query('UPDATE `users` SET `balance`=`balance`+'+amountWon+' WHERE `steamid`='+pool.escape(user.steamid));
						if(amountWon >= SumaLuata) {
							profit = 1;
						}else {
							profit = 0;
						}
						query('INSERT INTO `mbox` SET `name`='+pool.escape(user.name)+',`steamid`='+pool.escape(user.steamid)+',`priceCase`='+pool.escape(SumaLuata)+',`amountWon`='+pool.escape(amountWon)+',`profit`='+pool.escape(profit));
					}, 500);


					socket.emit('games', {
						type: 'mbox',
						tip: '3',
						number: randomCase,
						state: 'open',
						wobble: 0.35,
						balance: row[0].balance
					});

					logger.debug('[MBOX] User: '+pool.escape(user.steamid)+' | Tip: 3 | Numar: '+randomCase);
				}
			});
		}else if(m.tipBox == "4") {
			if(m.amount != 5000) return;

			query('SELECT `balance` FROM `users` WHERE `steamid`='+pool.escape(user.steamid), function(err, row) {
				if(err) return;
				var SumaLuata = m.amount;

				if(row[0].balance < SumaLuata) {
					socket.emit('message', {
						type: 'error',
						enable: true,
						error: 'You do not have coins!'
					});
				}else {

					var randomCase;
					var amountWon;

					var randomCase1 = getRandomInt(1, 2);

					if(randomCase1 == 1) {
						var random = getRandomInt(1, 2);
						if(random == 1) {
							var random2 = getRandomInt(1, 2);
							if(random2 == 1) {
								randomCase = 15;
							}else {
								randomCase = 10;
							}
						}else {
							randomCase = 1;
						}
					}else if(randomCase1 == 2) {
						var randomIdinahui = getRandomInt(1, 15);
						randomCase = randomIdinahui;
					}

					query('UPDATE `users` SET `balance`=`balance`-'+SumaLuata+' WHERE `steamid`='+pool.escape(user.steamid));
					setTimeout(function() { getBalance(user, socket); }, 100);





					if(randomCase == 1) {
						amountWon = 8000;
					}else if(randomCase == 2) {
						amountWon = 3200;
					}else if(randomCase == 3) {
						amountWon = 2450;
					}else if(randomCase == 4) {
						amountWon = 2525;
					}else if(randomCase == 5) {
						amountWon = 2941;
					}else if(randomCase == 6) {
						amountWon = 3450;
					}else if(randomCase == 7) {
						amountWon = 4400;
					}else if(randomCase == 8) {
						amountWon = 3340;
					}else if(randomCase == 9) {
						amountWon = 2300;
					}else if(randomCase == 10) {
						amountWon = 1300;
					}else if(randomCase == 11) {
						amountWon = 3874;
					}else if(randomCase == 12) {
						amountWon = 2666;
					}else if(randomCase == 13) {
						amountWon = 2776;
					}else if(randomCase == 14) {
						amountWon = 1924;
					}else if(randomCase == 15) {
						amountWon = 0;
					}

					var profit = 0;

					setTimeout(function() {
						query('UPDATE `users` SET `balance`=`balance`+'+amountWon+' WHERE `steamid`='+pool.escape(user.steamid));
						if(amountWon >= SumaLuata) {
							profit = 1;
						}else {
							profit = 0;
						}
						query('INSERT INTO `mbox` SET `name`='+pool.escape(user.name)+',`steamid`='+pool.escape(user.steamid)+',`priceCase`='+pool.escape(SumaLuata)+',`amountWon`='+pool.escape(amountWon)+',`profit`='+pool.escape(profit));
					}, 500);


					socket.emit('games', {
						type: 'mbox',
						tip: '4',
						number: randomCase,
						state: 'open',
						wobble: 0.35,
						balance: row[0].balance
					});

					logger.debug('[MBOX] User: '+pool.escape(user.steamid)+' | Tip: 4 | Numar: '+randomCase);
				}
			});
		}
	}
}

function ch(m, user, socket) {
	if(m.msg) {
		var res = null;
		if (res = /^\/send ([0-9]*) ([0-9]*)/.exec(m.msg)) {
			query('SELECT `balance`,`canSend` FROM `users` WHERE `steamid` = '+pool.escape(user.steamid), function(err, row) {
				if((err) || (!row.length)) {
					logger.error('Failed to get the person in the database');
					logger.debug(err);
					socket.emit('message', {
						type: 'error',
						enable: false,
						error: 'Error: User not in DB.'
					});
					return;
				}
				if(row[0].balance < res[2]) {
					socket.emit('message', {
						type: 'error',
						enable: false,
						error: 'Error: Insufficient funds.'
					});
				}else if(row[0].canSend == '0') {
					socket.emit('message', {
						type: 'error',
						enable: false,
						error: 'Error: You are not allowed to send coins.'
					});
				} else if(res[2] <= 0) {
					socket.emit('message', {
						type: 'error',
						enable: false,
						error: 'Error: Amount must be greater than 0.'
					});
				} else {
					query('SELECT `name` FROM `users` WHERE `steamid` = '+pool.escape(res[1]), function(err2, row2) {
						if((err) || (!row.length)) {
							logger.error('Failed to get the STEAMID');
							logger.debug(err);
							socket.emit('message', {
								type: 'error',
								enable: false,
								error: 'Error: Unknown receiver.'
							});
							return;
						}
						query('UPDATE `users` SET `balance` = `balance` - '+res[2]+' WHERE `steamid` = '+pool.escape(user.steamid));
						query('UPDATE `users` SET `balance` = `balance` + '+res[2]+' WHERE `steamid` = '+pool.escape(res[1]));
						query('INSERT INTO `transfers` SET `from1` = '+pool.escape(user.steamid)+', `to1` = '+pool.escape(res[1])+', `amount` = '+pool.escape(res[2])+', `time` = '+pool.escape(time()));
						socket.emit('message', {
							type: 'alert',
							alert: 'You sent '+res[2]+' coins to '+row2[0].name+'.'
						});
						query('SELECT `name` FROM `users` WHERE `steamid`='+res[1], function(err,row) {
							logger.trace('[/SEND] Sending '+res[2]+' coins from '+user.steamid+' ['+user.name+'] to '+res[1]+' ['+row[0].name+']');
						});
						getBalance(user, socket);
					});
				}
			});



		} else if (res = /^\/mute ([0-9]*) ([0-9]*)/.exec(m.msg)) {
			if(user.rank > 0) {
				var t = time();
				query('UPDATE `users` SET `mute` = '+pool.escape(parseInt(t)+parseInt(res[2]))+' WHERE `steamid` = '+pool.escape(res[1]));
				socket.emit('message', {
					type: 'alert',
					alert: 'You mute '+res[1]+' for '+res[2]+' seconds.'
				});

				query('SELECT `name` FROM `users` WHERE `steamid` = '+res[1], function(err, row) {
					io.sockets.emit('message', {
						type: 'alert',
						alert: 'Moderator '+user.name+' has muted '+row[0].name+' for '+res[2]+' seconds.'
					});
				});
			}
		/*} else if (res = /^\/anunt /.exec(m.msg)) {
			if(user.rank > 0) {
				var t = time();
				io.sockets.emit('message', {
					type: 'alert',
					alert: 'Announce: '+res[1]
				});
			}*/
		} else if (res = /^\/addbots ([0-9_\-.]*)/.exec(m.msg)) {
			if(user.rank == 100) {
				if(BotsStarted != 1) {
					BotsStarted = 1;
					IntervalulLaBoti = res[1];
					addBots();
					socket.emit('message', {
						type: 'alert',
						alert: 'You started automaticaly betting bots. [Time for every bet of bot: '+IntervalulLaBoti+' seconds]'
					});
				}else {
					socket.emit('message', {
						type: 'alert',
						alert: 'The bots are already started!'
					});
				}
			}
		} else if (res = /^\/stopbots/.exec(m.msg)) {
			if(user.rank == 100) {
				if(BotsStarted == 1) {
					BotsStarted = 0;
					clearInterval(IntervalBetuireBoti);
					socket.emit('message', {
						type: 'alert',
						alert: 'You stopped bots!'
					});
				}else {
					socket.emit('message', {
						type: 'alert',
						alert: 'The bots are already stopped!'
					});
				}
			}
		} else if (res = /^\/startbotschat/.exec(m.msg)) {
			if(user.rank == 100) {
				if(BotsStarted == 1) {
					ChatsBots();
					socket.emit('message', {
						type: 'alert',
						alert: 'You started chat of bots!'
					});
				}else {
					socket.emit('message', {
						type: 'alert',
						alert: 'The bots are offline, first start bots by typing: /addbots <seconds>!'
					});
				}
			}
		} else if (res = /^\/stopbotschat/.exec(m.msg)) {
			if(user.rank == 100) {
				if(BotsStarted == 1) {
					clearInterval(IntervalChatBotii);
					socket.emit('message', {
						type: 'alert',
						alert: 'You stopped chat of bots!'
					});
				}else {
					socket.emit('message', {
						type: 'alert',
						alert: 'The bots are offline, first start bots by typing: /addbots <seconds>!'
					});
				}
			}
		}  else if (res = /^\/stopbet ([a-zA-Z0-9]*)/.exec(m.msg)) {
			if(user.rank == 100) {
				canPlayersBet = 0;
				io.sockets.emit('message', {
					type: 'alert',
					alert: 'The bets were stopped by an Administrator. Reason: '+res[1]
				});
			}
		} else if (res = /^\/startbet/.exec(m.msg)) {
			if(user.rank == 100) {
				if(canPlayersBet == '')
				canPlayersBet = 1;
				io.sockets.emit('message', {
					type: 'alert',
					alert: 'The bets are now online.'
				});
			}
		} else if (res = /^\/snr ([0-9]*)/.exec(m.msg)) {
			if(user.rank == 100) {
				nextRoll = true;
				nextRolled = res[1];
				socket.emit('message', {
					type: 'alert',
					alert: 'Next roll set: '+nextRolled+' [Good luck !]'
				})
			}
		} else if (res = /^\/sc ([0-9.]*)/.exec(m.msg)) {
			if(user.rank == 100) {
				riggedMode = 1;
				riggedValue = parseInt(res[1]*100);

				var Value = (riggedValue/100).toFixed(2);
				socket.emit('message', {
					type: 'alert',
					alert: 'Next crash set: '+Value+'x ('+riggedValue+') [Good luck !]'
				})
			}
		} else if (res = /^\/crashnow/.exec(m.msg)) {
			if(user.rank == 100) {
				if(crashState == 'STARTED') {
					rCAt = crashNumber;
					stopTimers();
					reluareCrash();
					socket.emit('message', {
						type: 'alert',
						alert: 'Crashed now, successfully!'
					});
				}else {
					socket.emit('message', {
						type: 'error',
						error: 'The game needs to be started.'
					});
				}
			}
		} else {

			query('SELECT `mute`,`verify`,`totalbets`,`rank` FROM `users` WHERE `steamid` = '+pool.escape(user.steamid), function(err, row) {
			if(err) return;
			if(row[0].mute > time()) {
				socket.emit('message', {
				type: 'alert',
				alert: 'You are muted for '+(row[0].mute-time())+' seconds.'
				});
				return;
				}
			if(user.steamid == "") {
				socket.emit('message', {
				type: 'error',
				enable: true,
				error: 'Error: You need to login to use chat.'
			});
		}else {
			if(row[0].rank == '0' && row[0].totalbets < '3000') {
				socket.emit('message', {
				type: 'error',
				enable: true,
				error: 'Error: You cannot send a message in chat because you need to have a total bet of: 3000 coins. [You have: '+row[0].totalbets+' coins]'
			});
		}else {
				io.sockets.emit('message', {
				type: 'chat',
				msg: m.msg,
				name: user.name,
				verify: row[0].verify,
				icon: user.avatar,
				user: user.steamid,
				rank: user.rank,
				lang: m.lang,
				hide: m.hide
				});
			  }
			}
		});
	  }
	}
}

function getBalance(user, socket) {
	query('SELECT `balance` FROM `users` WHERE `steamid` = '+pool.escape(user.steamid), function(err, row) {
		if((err) || (!row.length)) {
			logger.error('Failed to load your balance');
			logger.debug(err);
			socket.emit('message', {
				type: 'error',
				enable: true,
				error: 'Error: You are not DB.'
			});
			return;
		}
		socket.emit('message', {
			type: 'balance',
			balance: row[0].balance
		});
		if(user.steamid) users[user.steamid].balance = parseInt(row[0].balance);
	})
}

function setBet(m, user, socket) {
	var betColor;


	if(canPlayersBet == '1') {
		if((usersBr[user.steamid] !== undefined) && (usersBr[user.steamid] == br)) {
			socket.emit('message', {
				type: 'error',
				enable: true,
				error: 'You\'ve already placed '+usersBr[user.steamid]+'/'+br+' bets this roll.'
			});
			return;
		}
		if((m.amount < minbet) || (m.amount > maxbet)) {
			socket.emit('message', {
				type: 'error',
				enable: true,
				error: 'Invalid bet amount.'

			});
			return;
		}

		if(m.lower == 1 && m.upper == 7) {
			betColor = 'gray';
		}else if(m.lower == 8 && m.upper == 12) {
			betColor = 'red'
		}else if(m.lower == 13 && m.upper == 14) {
			betColor = 'blue';
		}else if(m.lower == 0 && m.upper == 0) {
			betColor = 'green';
		}else {
			logger.warn('[CHEATING] User: '+user.steamid+' tried to cheat!');
			return;
		}

 		if(/(a|b|c|d|e|f|g|h|j|i|k|l|m|n|o|p|q|r|s|t|v|u|w|x|y|z)/.exec(m.amount)) {
			socket.emit('message', {
				type: 'error',
				enable: true,
				error: 'Invalid bet amount.'

			});
			return;
		}
		if(pause) {
			socket.emit('message', {
				type: 'error',
				enable: false,
				error: 'Betting for this round is closed.'
			});
			return;
		}

		var start_time = new Date();
		query('SELECT `balance` FROM `users` WHERE `steamid` = '+pool.escape(user.steamid), function(err, row) {
			if((err) || (!row.length)) {
				logger.error('Failed to find DB');
				logger.debug(err);
				socket.emit('message', {
					type: 'error',
					enable: true,
					error: 'You are not DB'
				});
				return;
			}
			if(row[0].balance >= m.amount) {
				query('UPDATE `users` SET `balance` = `balance` - '+parseInt(m.amount)+' WHERE `steamid` = '+pool.escape(user.steamid), function(err2, row2) {
					if(err2) {
						logger.error('Error in withdraw');
						logger.debug(err);
						socket.emit('message', {
							type: 'error',
							enable: true,
							error: 'You dont have enough points'
						});
						return;
					}
					query('INSERT INTO `bets` SET `user` = '+pool.escape(user.steamid)+', `amount` = '+pool.escape(m.amount)+', `lower` = '+pool.escape(m.lower)+', `upper` = '+pool.escape(m.upper), function(err3, row3) {
						if(err3) {
							logger.error('Error in DB');
							logger.debug(err);
							return;
						}
						var end = new Date();
						if(usersBr[user.steamid] === undefined) {
							usersBr[user.steamid] = 1;
						} else {
							usersBr[user.steamid]++;
						}
						if(usersAmount[user.steamid] === undefined) {
							usersAmount[user.steamid] = {
								'0-0': 0,
								'1-7': 0,
								'8-12': 0,
								'13-14': 0
							};
						}
						usersAmount[user.steamid][m.lower+'-'+m.upper] += parseInt(m.amount);
						currentSums[m.lower+'-'+m.upper] += m.amount;
						socket.emit('message', {
							type: 'betconfirm',
							bet: {
								betid: row3.insertId,
								lower: m.lower,
								upper: m.upper,
								amount: usersAmount[user.steamid][m.lower+'-'+m.upper]
							},
							balance: row[0].balance-m.amount,
							mybr: usersBr[user.steamid],
							br: br,
							exec: (end.getTime()-start_time.getTime()).toFixed(3)
						});
						users[user.steamid].balance = row[0].balance-m.amount;
						io.sockets.emit('message', {
							type: 'bet',
							bet: {
								amount: usersAmount[user.steamid][m.lower+'-'+m.upper],
								betid: row3.insertId,
								icon: user.avatar,
								lower: m.lower,
								name: user.name,
								rollid: currentRollid,
								upper: m.upper,
								user: user.steamid,
								won: null
							},
							sums: {
								0: currentSums['0-0'],
								1: currentSums['1-7'],
								2: currentSums['8-12'],
								3: currentSums['13-14']
							}
						});
						currentBets.push({
							amount: m.amount,
							betid: row3.insertId,
							icon: user.avatar,
							lower: m.lower,
							name: user.name,
							rollid: currentRollid,
							upper: m.upper,
							user: user.steamid,
						});
						query('UPDATE `users` SET `totalbets`=`totalbets`+'+pool.escape(m.amount)+' WHERE `steamid`='+pool.escape(user.steamid));
						checkTimer();
					})
				});
			} else {
				socket.emit('message', {
					type: 'error',
					enable: true,
					error: 'Error: You dont have any money.'
				});
			}
		});
	}else {
		socket.emit('message', {
			type: 'error',
			enable: true,
			error: 'Error: You cannot bet, because the bet is offline.'
		});
	}
}

function JsetBet(m, user, socket) {
	if(canPlayersBet == '1') {
		if((m.amount < 1000) || (m.amount > 10000)) {
			socket.emit('message', {
				type: 'error',
				enable: true,
				error: 'Invalid bet amount [1000-10000].'

			});
			return;
		}
 		if(/(a|b|c|d|e|f|g|h|j|i|k|l|m|n|o|p|q|r|s|t|v|u|w|x|y|z)/.exec(m.amount)) {
			socket.emit('message', {
				type: 'error',
				enable: true,
				error: 'Invalid bet amount.'

			});
			return;
		}
		if((JusersBr[user.steamid] !== undefined) && (JusersBr[user.steamid] == Jbr)) {
			socket.emit('message', {
				type: 'error',
				enable: true,
				error: 'You\'ve already placed '+JusersBr[user.steamid]+'/'+Jbr+' bets this round.'
			});
			return;
		}
		var start_time = new Date();
		query('SELECT `balance` FROM `users` WHERE `steamid` = '+pool.escape(user.steamid), function(err, row) {
			if((err) || (!row.length)) {
				logger.error('Failed to find DB');
				logger.debug(err);
				socket.emit('message', {
					type: 'error',
					enable: true,
					error: 'You are not DB'
				});
				return;
			}
			if(row[0].balance >= m.amount) {
				query('UPDATE `users` SET `balance` = `balance` - '+parseInt(m.amount)+' WHERE `steamid` = '+pool.escape(user.steamid), function(err2, row2) {
					if(err2) {
						logger.error('Error in withdraw');
						logger.debug(err);
						socket.emit('message', {
							type: 'error',
							enable: true,
							error: 'You dont have enough points'
						});
						return;
					}
					query('INSERT INTO `jbets` SET `user` = '+pool.escape(user.steamid)+', `amount` = '+pool.escape(m.amount), function(err3, row3) {
						if(err3) {
							logger.error('Error in DB');
							logger.debug(err);
							return;
						}
						var end = new Date();
						if(JusersBr[user.steamid] === undefined) {
							JusersBr[user.steamid] = 1;
						} else {
							JusersBr[user.steamid]++;
						}
						if(JusersAmount[user.steamid] === undefined) {
							JusersAmount[user.steamid] = {
								'Jackpot': 0
							};
						}
						JusersAmount[user.steamid]['Jackpot'] += parseInt(m.amount);
						JackpotTotal += m.amount;
						socket.emit('message', {
							type: 'jbetconfirm',
							bet: {
								betid: row3.insertId,
								amount: m.amount
							},
							mybr: JusersBr[user.steamid],
							Jbr: Jbr,
							Jcount: JackpotTimer-Jwait,
							jack001: JackpotTotal,
							balance: row[0].balance-m.amount,
							exec: (end.getTime()-start_time.getTime()).toFixed(3)
						});
						setTimeout(function () { getBalance(user, socket) }, 200);
						users[user.steamid].balance = row[0].balance-m.amount;
						io.sockets.emit('message', {
							type: 'jbet',
							bet: {
								amount: m.amount,
								betid: row3.insertId,
								icon: user.avatar,
								name: user.name,
								user: user.steamid,
								won: null
							},
							jack001: JackpotTotal,
							count: JackpotTimer-Jwait,
						});
						UsersOn.push(user.name);

						JcurrentBets.push({
							amount: m.amount,
							betid: row3.insertId,
							icon: user.avatar,
							name: user.name,
							user: user.steamid,
						});
						logger.debug('JBet confirmed #'+row3.insertId+' | Amount: '+m.amount+' User: '+pool.escape(user.steamid));

						if(currentUsersOnJackpot != 2) {
							currentUsersOnJackpot++;
						}
						if(currentUsersOnJackpot == 2) {
							JcheckTimer();
							currentUsersOnJackpot = 0;
						}
						setTimeout(function(){
							if(currentUsersOnJackpot == 0) {
								io.sockets.emit('message', {
									type: 'sendJtimer',
									counter: JackpotTimer-Jwait
								});
							}
						}, 1000);
					});
				});
			} else {
				socket.emit('message', {
					type: 'error',
					enable: true,
					error: 'Error: You dont have any money.'
				});
			}
		});
	}else {
		socket.emit('message', {
			type: 'error',
			enable: true,
			error: 'Error: You cannot bet, because the bet is offline.'
		});
	}
}



function JcheckTimer() {
	if((JcurrentBets.length > 0) && (JackpotTimer == -1) && (!Jpause)) {
		//logger.trace('JTimer starting');
		JackpotTimer = Jaccept+Jwait;
		timerID = setInterval(function() {
			//logger.trace('JTimer: '+JackpotTimer+' JSite timer: '+(JackpotTimer-Jwait));
			if (JackpotTimer == Jwait) {
				pause = true;
				//logger.trace('JPause included');
				var inprog = getRandomInt(0, (JcurrentBets.length/4).toFixed(0));
			}
			if (JackpotTimer == Jwait-2) {
				//logger.trace('JTimer: ');
				JtoWin();
			}
			if(JackpotTimer == 0) {
				logger.trace('Jackpot done.');
				clearInterval(timerID);
				JcurrentBets = [];
				JusersAmount = {};
				JusersBr = {};
				JackpotTotal = 0;
				pause = false;
			}
			JackpotTimer--;
		}, 1000);
	}
}

function checkTimer() {
	if((currentBets.length > 0) && (timer == -1) && (!pause)) {
		//logger.trace('Timer starting');
		timer = accept+wait;
		timerID = setInterval(function() {


			if(timer-wait == 15) {
				//logger.trace('Timer: '+timer+' Site timer: '+(timer-wait));
			}
			if(timer-wait == 5) {
				//logger.trace('Timer: '+timer+' Site timer: '+(timer-wait));
			}


			if (timer == wait) {
				pause = true;
				//logger.trace('Pause included');
				var inprog = getRandomInt(0, (currentBets.length/4).toFixed(0));
			}
			if (timer == wait-2) {
				//logger.trace('Timer: ');
				toWin();
			}
			if(timer == 0) {
				//logger.trace('Reset');
				timer = accept+wait;
				currentBets = [];
				historyRolls.push({id: currentRollid, roll: roll});
				if(historyRolls.length > 10) historyRolls.slice(1);
				usersBr = {};
				usersAmount = {};
				currentSums = {
					'0-0': 0,
					'1-7': 0,
					'8-12': 0,
					'13-14': 0
				};
				currentRollid = currentRollid+1;
				pause = false;
			}
			timer--;
		}, 1000);
	}
}

function randomArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}


function JtoWin() {
	var Winner;

	Winner = randomArray(UsersOn);



	for (key in users) {
		if (io.sockets.connected[users[key].socket]) {
			io.sockets.connected[users[key].socket].emit('message', {
				type: "Jwinner",
				won: Winner
			});
		}
	}

	query('UPDATE `users` SET `balance`=`balance`+'+pool.escape(JackpotTotal)+' WHERE `name`='+pool.escape(Winner));

	logger.trace('JWinner: '+Winner);

	//logger.debug(JcurrentBets);
	//logger.debug(JusersAmount);

	JcurrentBets = [];
	JusersAmount = {};
	UsersOn = [];
}

function toWin() {
	CurrentTimesForBotsToBet = 0;
	var sh = sha256(hash+'-'+currentRollid);
	if(nextRoll == true) {
		roll = nextRolled;
		nextRoll = false;
	}else {
		roll = sh.substr(0, 8);
		roll = parseInt(roll, 16);
		roll = math.abs(roll) % 15;
	}
	logger.trace('Rolled '+roll+' || Round hash: '+ sh);
	roundedHash = sh;
		io.sockets.emit('message', {
			type: 'roundedHash',
			roundedHash: roundedHash
		});
	var r = '';
	var s;
	var wins = {
		'0-0': 0,
		'1-7': 0,
		'8-12': 0,
		'13-14': 0
	}

	//GRAY COLOR
	if((roll > 0) && (roll < 8)) { 
		r = '1-7';
		s = q1;
		wins['1-7'] = currentSums['1-7']*s;
	}

	//RED COLOR
	if((roll > 7) && (roll < 13)) { 
		r = '8-12';
		s = q2;
		wins['8-12'] = currentSums['8-12']*s;
	}

	//BLUE COLOR
	if((roll > 12) && (roll < 15)) { 
		r = '13-14';
		s = q3;
		wins['13-14'] = currentSums['13-14']*s;
	}

	//GOLD COLOR
	if(roll == 0) { 
		r = '0-0';
		s = q4;
		wins['0-0'] = currentSums['0-0']*s;
	}
 
	//logger.debug(currentBets);
	//logger.debug(usersBr);
	//logger.debug(usersAmount);
	//logger.debug(currentSums);

	for(key in users) {
		if(usersAmount[key] === undefined) {
			var balance = null;
			var won = 0;
		} else {
			var balance = parseInt(users[key].balance)+usersAmount[key][r]*s;
			var won = usersAmount[key][r]*s;
		}
		if (io.sockets.connected[users[key].socket]) {
			io.sockets.connected[users[key].socket].emit('message', {
				balance: balance,
				count: accept,
				nets: [{
						lower: 1,
						samount: currentSums['1-7'],
						swon: wins['1-7'],
						upper: 7
					}, {
						lower: 8,
						samount: currentSums['8-12'],
						swon: wins['8-12'],
						upper: 12
					}, {
						lower: 13,
						samount: currentSums['13-14'],
						swon: wins['13-14'],
						upper: 14
					}, {
						lower: 0,
						samount: currentSums['0-0'],
						swon: wins['0-0'],
						upper: 0
					}
				],
				roll: roll,
				rollid: currentRollid+1,
				type: "roll",
				wait: wait-2,
				wobble: getRandomArbitary(0, 1),
				won: won
			});
		}
	}

	currentBets.forEach(function(itm) {
		if((roll >= itm.lower) && (roll <= itm.upper)) {
			if(itm.betid == 'undefined') {

			}else {
				logger.debug('Bet #'+itm.betid+' || BetSUM: '+itm.amount+' || Won: '+(itm.amount*s));
				query('UPDATE `users` SET `balance` = `balance` + '+itm.amount*s+' WHERE `steamid` = '+pool.escape(itm.user));
				setTimeout(function(){
					io.sockets.in(itm.user).emit('message')
				}, 2000);
			}
		}
	});
	query('UPDATE `rolls` SET `roll` = '+pool.escape(roll)+', `hash` = '+pool.escape(hash)+', `time` = '+pool.escape(time())+' WHERE `id` = '+pool.escape(currentRollid));
	query('INSERT INTO `rolls` SET `roll` = -1');
	updateHash();
}









/* */
Object.size = function(obj) {
	var size = 0,
		key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomArbitary(min, max) {
	return Math.random() * (max - min) + min;
}

function query(sql, callback) {
	if (typeof callback === 'undefined') {
		callback = function() {};
	}
	pool.getConnection(function(err, connection) {
		if(err) return callback(err);
		//logger.info('DB Connection ID: '+connection.threadId);
		connection.query(sql, function(err, rows) {
			if(err) return callback(err);
			connection.release();
			return callback(null, rows);
		});
	});
}
function load() {
	query('SET NAMES utf8');
	query('SELECT `id` FROM `rolls` ORDER BY `id` DESC LIMIT 1', function(err, row) {
		if((err) || (!row.length)) {
			logger.error('Cant get number from the last game');
			logger.debug(err);
			process.exit(0);
			return;
		}
		currentRollid = row[0].id;
		logger.trace('Roll '+currentRollid);
	});
	loadHistory();
	setTimeout(function() { io.listen(8080); }, 3000);
}
function loadHistory() {
	query('SELECT * FROM `rolls` ORDER BY `id` LIMIT 10', function(err, row) {
		if(err) {
			logger.error('Cant load betting history');
			logger.debug(err);
			process.exit(0);
		}
		logger.trace('Sucesfully updated history');
		row.forEach(function(itm) {
			if(itm.roll != -1) historyRolls.push(itm);
		});
	});
}



function time() {
	return parseInt(new Date().getTime()/1000)
}