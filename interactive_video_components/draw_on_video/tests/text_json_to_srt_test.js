var srtConverter = require('../text_json_to_srt')

var srtFileName = 'sample.srt';
var words = [{
		start: 0,
	    end: 200, //milliseconds
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
	    end: 1500, //milliseconds
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
	}
];

srtConverter.convert(words,srtFileName);