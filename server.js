var express = require('express');
var app = express();
var moment = require('moment');

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

app.listen(3000, function(){
	console.log("Example app listening on port 3000!");
});