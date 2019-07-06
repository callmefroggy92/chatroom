const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express()
app.use(express.json())       
app.use(express.urlencoded()) 
app.set('view engine', 'ejs');

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

