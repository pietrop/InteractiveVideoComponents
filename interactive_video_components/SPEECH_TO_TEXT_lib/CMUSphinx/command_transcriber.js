/**
* To run from terminal
*/
var fs = require('fs');
var arguments = process.argv

var videodilename = "./"+arguments[2];

// for(var i =0; i<arguments.length;i++){
// 	console.log(arguments[i]);
// }

videoFileNameAr = videofilename.split("/");
videoFileNameAr[videoFileNameAr.length-1]
var jsonFileName = 

transcriber.videoToHypertranscript(videofilename, function(data){
  console.log(data);
  
  fs.writeFileSync("videofilename.json", data, 'utf8');
});