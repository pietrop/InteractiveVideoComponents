// draw_text_on_video.js
// on twitter videos start without sound.
// porpouse of this library is to write the text of the subtitles onto the video 



var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg();

var drawtext = function(src){
	var videoSrc= src;
	// var output = videoSrc.split(".")[0] + ".mp4";//html5
	var command = ffmpeg(videoSrc).output('debate_test_trimmed_drawn.mp4').videoFilters({filter: 'drawtext', options: {fontfile:'./LucidaGrande.ttf', text: 'THIS IS TEXT',  fontsize: 20,  fontcolor: 'white',  x: 4,  y: 50,  shadowcolor: 'black',  shadowx: 2,  shadowy: 2}}).on('end', function() {
	    console.log('Finished writing on video');
	  })
	  .run();
}
// .audioCodec('libfaac')


drawtext('debate_test_trimmed.mp4');

// ISSUE: drawtext in ffmpeg unable to install it properly


// ffmpeg -f dshow -i video="HD Pro Webcam C920" -vf "drawtext=fontfile=arial.ttf:text='%m';fontcolor=white@0.8:x=7:y=460" -vcodec libx264 -vb 2000k -preset ultrafast -f mp4 output.mp4
// ffmpeg -i debate_test_trimmed.mp4 -vf "drawtext=enable='between(t,0,3)':fontfile=LucidaGrande.ttf: text='Test Text'" -acodec copy output.mp4

// http://einar.slaskete.net/2011/09/05/adding-time-stamp-overlay-to-video-stream-using-ffmpeg/