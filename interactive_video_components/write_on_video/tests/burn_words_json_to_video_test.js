// burn_words_json_to_video_test.js

var burner = require('../burn_words_json_to_video')

//milliseconds
var words = [{
		start: 0,
	    end: 200,
	    text: "Call"
	},
	{
		 start: 200,
	     end: 300,
	     text: "me"
	},
	{
		 start: 300,
	     end: 500,
	     text: "Ishmael"
	},
	{
		 start: 600,
	     end: 900,
	     text: "Some"
	},
	{
		 start: 1000,
	     end: 1200,
	     text: "years"
	},{
		start: 1200,
	    end: 1500,
	    text: "ago"
	},
	{
		 start: 1500,
	     end: 1900,
	     text: "never"
	},
	{
		 start: 1900,
	     end: 2200,
	     text: "mind"
	},
	{
		 start: 2200,
	     end: 2500,
	     text: "how"
	},
	{
		 start: 2500,
	     end: 2900,
	     text: "long"
	},
	{
		 start: 2900,
	     end: 3100,
	     text: "precisely"
	},
	{
		 start: 3200,
	     end: 3600,
	     text: "having"
	}
	,
	{
		 start: 4000,
	     end: 5000,
	     text: "little"
	}
];

var src = "./debate_test_trimmed2.mp4"; 
var output= "test_output.mp4";
burner.convert(words,src,output);
