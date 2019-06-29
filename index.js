const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
app.use(express.json())       
app.use(express.urlencoded()) 

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/chat', function (req, res){
	console.log(req.body);
	res.send('Key: ' + req.body.keycode);
	}
  )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
