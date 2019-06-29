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
	res.write('<html>');
	res.write('<head>');
	res.write('<script>
		function tst(){
			window.alert("test");
		}
		</script>');
	res.write('<body>');
	res.write('<h1> Key: ' + req.body.keycode + '</h1>');
	res.write('test');
	res.write('<button onclick="tst()">TEST</button>');
	res.write('</body></html');
	res.end();
	}
  )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
