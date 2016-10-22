var express = require('express');
var moment = require('moment');
var path = require('path');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
	res.status(200);
	res.set('Content-Type', 'text/html');
	fs.createReadStream('./views/index.html').pipe(res);
})

app.get('/:timestamp', function(req, res){
	console.log('timestamp: ' + req.params.timestamp);
	var time = moment(req.params.timestamp, "MMMM DD, YYYY", true);
	if(!time.isValid()){
		time = moment.unix(req.params.timestamp);
		if(!time.isValid()){
			
			res.json({
				unix : null,
				natural : null
			});
		}

	}
	res.json({
		unix : time.format('X'),
		natural : time.format('MMMM DD, YYYY')
	});
});

app.listen(port, function(){
	console.log("timestamp microservice is running on port " + port);
});