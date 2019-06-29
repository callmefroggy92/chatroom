const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express()
app.use(express.json())       
app.use(express.urlencoded()) 

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/chat', function (req, res){
	console.log(req.body);
	res.send('<h1> Key: ' + req.body.keycode + '</h1>');
	}
  )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
