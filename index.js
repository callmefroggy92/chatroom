onst express = require('express')
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
    tst += JSON.stringify(row);
  }
  client.end();
});


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

