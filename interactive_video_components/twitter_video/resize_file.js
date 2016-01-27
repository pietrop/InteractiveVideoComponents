/**
* Resize video file to meet user defined size in MB.
* TODO: not working. 16-12-2015
*/

// bitrate = file size / duration

// (50 MB * 8192 [converts MB to kilobits]) / 600 seconds = ~683 kilobits/s total bitrate
// 683k - 128k (desired audio bitrate) = 555k video bitrate


//desired video file size?
var videoFileSizeMb = 50; //MB
//get video file duration 
var videoFileDurationSeconds = 600; // seconds

//conversions
var videoFileSizeKb =videoFileSizeMb * 8192; //[converts MB to kilobits]
var kilobitsTotalBitrate = videoFileSizeKb / videoFileDurationSeconds;// = ~683 //kilobits/s total bitrate
var desiredAudioBitrate = 128;//k
var videoBitrate =  kilobitsTotalBitrate - desiredAudioBitrate;// = 555k video bitrate


// `fmpeg -y -i input -c:v libx264 -preset medium -b:v 555k -pass 1 -c:a libfdk_aac -b:a 128k -f mp4 /dev/null && \
// ffmpeg -i input -c:v libx264 -preset medium -b:v 555k -pass 2 -c:a libfdk_aac -b:a 128k output.mp4`

var input = 'debate_test.mp4';
var output ='output50mb.mp4';

var cmd = "ffmpeg -y -i "+input+" -c:v libx264 -preset medium -b:v "+videoBitrate+"k -pass 1 -c:a libfdk_aac -b:a "+desiredAudioBitrate+"k -f mp4 /dev/null && \ ffmpeg -i "+input+" -c:v libx264 -preset medium -b:v "+videoBitrate+"k -pass 2 -c:a libfdk_aac -b:a "+desiredAudioBitrate+"k "+output;

var exec = require('child_process').exec;
console.log(cmd);

// var cmd = 'ls';

exec(cmd, function(error, stdout, stderr) {
  // command output is in stdout
  console.log(stdout);
});