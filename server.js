var express = require('express');
var app = express();
var moment = require('moment');
var fs = require('fs');
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
	fs.createReadStream('./views/index.html').pipe(res);
});

app.get('/:timestamp', function(req, res){
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