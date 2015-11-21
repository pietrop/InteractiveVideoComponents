// draw_text_on_video.js
// on twitter videos start without sound.
// porpouse of this library is to write the text of the subtitles onto the video 



var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg();

var trim_video = function(src){
	var videoSrc= src;
	var output = videoSrc.split(".")[0] + ".mp4";//html5
	var command = ffmpeg(videoSrc).output('output_text.mp4').videoFilters({filter: 'drawtext', options: {fontfile:'LucidaGrande.ttc', text: 'THIS IS TEXT',  fontsize: 20,  fontcolor: 'white',  x: 4,  y: 50,  shadowcolor: 'black',  shadowx: 2,  shadowy: 2}}).on('end', function() {
	    console.log('Finished writing on video');
	  })
	  .run();
}
// .audioCodec('libfaac')


trim_video('output_test.mov');


// ffmpeg -i output.mp4 -vf "drawtext=fontfile=./LucidaGrande.ttc: timecode='00\:00\:00\:00': r=25: \
// x=(w-tw)/2: y=h-(2*lh): fontcolor=white: box=1: boxcolor=0x00000000@1" -an -y output_timecoded.mp4