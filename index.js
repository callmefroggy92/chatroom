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

client.connect();

var tst = "";

client.query('SELECT * FROM messages;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    tst = console.log(JSON.stringify(row));
  }
  client.end();
});

// const connectionString = process.env.DATABASE_URL || "postgres://cecltehghqyiaf:cc2311a1c616c5479c0c6f0baac59f7ab77bd60a06671cf6f6e839513e8b24ce@ec2-50-19-221-3?ssl=true"
// const pool = new Pool({connectionString: connectionString});


app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/chat', function (req, res){   
	res.locals.chatroom = tst;
        res.render('pages/chatroom');
	}
  )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
