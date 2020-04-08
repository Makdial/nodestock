const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

 const PORT = process.env.PORT || 5000;

 //use body parser middleware
 app.use(bodyParser.urlencoded({extended: false}));

// API KEYS pk_3bb091ff17514ca0915a0b135d46e392
//Create call API function
function call_api(finishedAPI, ticker){
	request('https://cloud.iexapis.com/stable/stock/'+ ticker +'/quote?token=pk_3bb091ff17514ca0915a0b135d46e392', { json: true }, (err ,res , body) => {
	if (err) {return console.log(err);}
	if(res.statusCode === 200){
		//console.log(body)
		finishedAPI(body);
		};
	});
};



const otherstuff = "this is some news stuff....";
const funct = "Dieu est Grand !"
 //Set handlebars middlewar
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
//Set handlebars index get routes
app.get('/', function (req, res) {
	call_api(function(doneAPI){
		res.render('home',{
    	stock: doneAPI,
    	});
	}, 'tsla');
});

//Set handlebars index post routes
app.post('/', function (req, res) {
	call_api(function(doneAPI){
		//posted_stock = req.body.stock_ticker;
		res.render('home',{
    	stock: doneAPI,
    	});
	}, req.body.stock_ticker);
});

//Create about page route
app.get('/about.html', function (req, res) {
    res.render('about',{
    	stuff2: funct,
    	});
});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));


 app.listen(PORT, () => console.log('Server Listening on port ' + PORT ));