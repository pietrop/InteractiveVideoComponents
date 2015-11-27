var async = require("async")

async.series([
    function(callback){
    	setTimeout(function(){
		console.log("One")
		callback(null, 'one');
	}, 3000);
    },
    function(callback){
    	console.log("two");
    	callback(null, 'two');
    }
],// optional callback
function(err, results){
    // results is now equal to ['one', 'two']
});