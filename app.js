var http = require("http");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var data = require('./data.js');
var queueProduce = require('./queue/producer.js');
var queueConsume = require('./queue/consumer.js');
//var jQuery = require('jquery');
var logger = require('./log');
//require('bootstrap');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.set('port', 3000);
app.use(express.static(path.join(__dirname, '/public')));


//this method will add book in redis database
app.post('/add', function(req, res){


	

		queueProduce.dataInQueue("add", req.body, function(response){

			console.log("I am in app.js with response = "+JSON.stringify(response));
			if(response){
				//var responseArray = response.split(":");
				//var responseA = responseArray[0];
				//var responseB = responseArray[1];
			res.send(JSON.stringify("{Status:"+response+"}"));
		}

		});
		//queueConsume

	

});


//this method will fetch book information 
app.post('/getDetails', function(req, res){

	
	queueProduce.dataInQueue("getDetails", req.body, function(response){

			console.log("I am in app.js with response = "+response);
			res.send(JSON.stringify(response));

		});
});


//this method will fetch book information 
app.post('/getAllDetails', function(req, res){

	console.log("i am getAllDetails");
	
	queueProduce.dataInQueue("getAllDetails", req.body, function(response){

			console.log("I am in app.js with response = "+response);
			res.send(response);

		});
});


app.post('/delete', function(req, res){

	

	queueProduce.dataInQueue("delete", req.body, function(response){

			console.log("I am in app.js with response = "+response);
			res.send(JSON.stringify("Status:"+response));

		});
	

});

app.post('/update', function(req, res){

	

	queueProduce.dataInQueue("update", req.body, function(response){

			console.log("I am in app.js with response = "+response);
			res.send(JSON.stringify("Status:"+response));

		});
	

});


http.createServer(app).listen(app.get('port'), function(){

	console.log("server is running on port = "+app.get('port'));
	logger.info('server is running on port = '+app.get('port') );

});

module.exports = app ;
