const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express()
app.use(express.json())       
app.use(express.urlencoded()) 
app.set('view engine', 'ejs');
const { Client } = require('pg');


app  
  .use(express.static(__dirname + '/public'))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/chat', function (req, res){   
	res.locals.chatroom = req.body.chatroom;
        res.render('pages/chatroom');
	}
  )
  .post('/snd', function(req, res){

	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

	client.connect(function(err) {
		if (err) throw err;
		console.log("Storing message for: " + req.body.chatroom_id);
		var sql = "INSERT INTO messages VALUES ('" + req.body.msg + "', '" + req.body.usr + "', '" + req.body.d + "', '" + req.body.chatroom_id + "')";
		client.query(sql, function (err, result) {
			if (err) throw err;
			console.log("Record Successfully Inserted");
			client.end();
		});

	});
  })

  .post('/upd', function(req, res){
	var messages_string = "emtpy string";

	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

	client.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		var sql = "SELECT msg, usr, d FROM messages WHERE chatroom_id = '" + req.body.chatroom_id + "';";
		client.query(sql, function (err, result, fields) {
			if (err) throw err;
			res.send(JSON.stringify(result["rows"]));
			console.log(JSON.stringify(result["rows"]));
			console.log("Record Successfully Retrieved");
			client.end();
		});
	});
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))