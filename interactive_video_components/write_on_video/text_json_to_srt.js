/**
* Takes in a array of words objects like so
[{
		start: 0,
	    end: 200, //in milliseconds
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
	...
]

* and groups words by wordFrequencey var, to convert it to a json data structure that 
	[{
	     id: '1',
	     startTime: 2000,
	     endTime: 6000,
	     text: 'Subtitle 1.1\nSubtitle 1.2' 
	 },

That can be passed to the subtitle-parser module to make an srt string `parser.toSrt(data)`
This can then be written to file
*/

var fs = require('fs');
var parser = require('subtitles-parser');
var wordFrequencey = 4; 

function convert(words,output, cb){
	var data = wordsToSrtJson(words);

	fs.writeFileSync(output, parser.toSrt(data) )
}

function wordsToSrtJson(words){
	var lines=[];
	//[{
	//     id: '1',
	//     startTime: 2000,
	//     endTime: 6000,
	//     text: 'Subtitle 1.1\nSubtitle 1.2' 
	// },
//TODO: current way every words becomes a line.
//needs to group words, ie in groups of 4 or as defined by wordFrequencey
//and make line with those.
//using start and end of fist and last.
//perhaps intermedia step making nested array in groups of var wordFrequencey(?)
	
	/**
	* Helper function to group array in subarray
	* in this case, words object into sub array of the number of words to show at same
	* time on screen
	*/
	function chunks(array, size) {
	  var results = [];
	  while (array.length) {
	    results.push(array.splice(0, size));
	  }
	  return results;
	};

	
	/**
	* Helper method Dividing array of words
	* in array of lines for srt composing
	*/
	function convertWordsToLines(arrayOfArrayOfWords){
		var lines=[];
		for(var j=0; j<arrayOfArrayOfWords.length; j++){
			var arrayOfWords = arrayOfArrayOfWords[j];
			var line={};
				line.id = j+1;
				line.startTime = arrayOfWords[0].start;
				line.endTime = arrayOfWords[arrayOfWords.length-1].end;
				line.text = "";
			for(i=0; i<arrayOfWords.length; i++){
				line.text +=arrayOfWords[i].text+" ";
			}

			lines.push(line);
		}
		return lines;
	}


	var arrayOfArrayOfWords = chunks(words, wordFrequencey )

	return convertWordsToLines(arrayOfArrayOfWords);
}

//export
module.exports = {
  convert: function(words,output) {
    return convert(words,output);
  }
};