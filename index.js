const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express()
app.use(express.json())       
app.use(express.urlencoded()) 
app.set('view engine', 'ejs');
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/chat', function (req, res){   
	res.locals.chatroom = req.body.chatroom;
        res.render('pages/chatroom');
	}
  )
  .post('/snd', function(req, res){
	client.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		var sql = "INSERT INTO messages (msg, usr) VALUES ('" + req.body.msg + "', '" + req.body.usr + "')";
		client.query(sql, function (err, result) {
			if (err) throw err;
			console.log("Record Successfully Inserted");
		});
	});
  })

  .post('/upd', function(req, res){
	var data = "empty string";
	res.send(data);
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))