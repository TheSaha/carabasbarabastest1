				connection.query("SELECT DropCount, DropSum FROM users WHERE steamid = "+pool.escape(user.steamid), function(err, rows, fields){
    if(!!err) {
		console.log('Error query');
	}else {
		console.log('Successfull query');
		console.log(rows);
	}});
	
	var express = require('express');
var app = express();
var sc3 = 'GFODJJFG8R8UG45JG9ERK0GI4G5818R4GH6F48GFD4';
var connection = mysql.createConnection({
	host: "localhost",
    user: "root",
    password: "tb5AqO30uLW0",
	database: "csgo"
});
app.listen(1337);