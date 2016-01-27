
var converter = require('./videogrepTranscriber.js')
var parser = require('subtitles-parser')
var fs = require('fs');

function videoToHypertranscript (fileName,callback){

	converter.transcribe(fileName, function(t){
	// console.log(t);
		converter.convert_transcription(fileName+".transcription.txt",function(d){
		console.log(d);

		//making a sequence that meets specs of 'subtitles-parser' modeule
		// var sq=[];
		// for(var i=0; i<d[0].length ; i++ ){
		// 		var seg={};
		// 		seg.id = i+1;
		// 		//in milliseconds 
		// 		seg.startTime = d[0][i].start *1000;
		// 		seg.endTime =d[0][i].end *1000;
		// 		seg.text =d[0][i].text;
		// 		sq.push(seg);
		// }

		// console.log(sq);
			// var dataMs = parser.fromSrt(sq)
			// var dataMs = parser.toSrt(sq) ;
			// if (callback) callback(dataMs);
			// return dataMs;
			if (callback) {callback(d)};
			return d;
		});
	});
}


function videoTosrtString(fileName,callback){
		converter.transcribe(fileName, function(t){
	// console.log(t);
		converter.convert_transcription(fileName+".transcription.txt",function(d){
		// console.log(d);
		// making a sequence that meets specs of 'subtitles-parser' modeule
		var sq=[];
		for(var i=0; i<d[0].length ; i++ ){
				var seg={};
				seg.id = i+1;
				//in milliseconds 
				seg.startTime = d[0][i].start *1000;
				seg.endTime =d[0][i].end *1000;
				seg.text =d[0][i].text;
				sq.push(seg);
		}
		// console.log(sq);
			// var dataMs = parser.fromSrt(sq)
			var dataMs = parser.toSrt(sq) ;
			if (callback) callback(dataMs);
			return dataMs;
		});
	});
}


function videoTosrtToFile(fileName,output,path,callback){
	videoTosrtString(fileName, function(data){
		var srtFileName = fileName+'.srt';
		var destinationName =path+'/'+output+'.srt';
		fs.writeFileSync(destinationName,data);
		if (callback) callback(destinationName);
		return destinationName;
	})
}

// function videoToHypertranscript(fileName,callback){

// 	if (callback) callback();
// }




module.exports = {
  videoTosrtString: function(fileName) {
    return videoTosrtString(fileName);
  },
       
  videoTosrtToFile: function(fileName,output, path, cb) {
    return videoTosrtToFile(fileName, output, path, cb);
  },
  videoToHypertranscript: function(fileName,cb){
  	return videoToHypertranscript(fileName,cb);
  }
};

/**
*
how do you destroy i said i needed
<s> 0.160 0.180 0.998501
how 0.190 0.340 0.070404
do 0.350 0.510 0.740274
you 0.520 0.890 0.979021
destroy 0.900 1.260 0.768872
i 1.270 1.490 0.201456
said 1.500 1.700 0.611245
<sil> 1.710 2.050 0.992924
i 2.060 2.240 0.329978
needed(2) 2.250 2.640 0.435223
</s> 2.650 3.040 1.000000
*/

/**
* Make hypertranscript from CMUSphinx text
[ [ { start: 0.18, end: 1.71, text: 'how do you destroy i said' },
    { start: 2.05, end: 2.65, text: 'i needed' } ],
  [ { start: 0.19, end: 0.34, text: 'how' },
    { start: 0.35, end: 0.51, text: 'do' },
    { start: 0.52, end: 0.89, text: 'you' },
    { start: 0.9, end: 1.26, text: 'destroy' },
    { start: 1.27, end: 1.49, text: 'i' },
    { start: 1.5, end: 1.7, text: 'said' },
    { start: 2.06, end: 2.24, text: 'i' },
    { start: 2.25, end: 2.64, text: 'needed' } ] ]
*/
