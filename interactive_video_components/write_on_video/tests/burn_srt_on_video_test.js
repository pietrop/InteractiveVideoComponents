// burn_srt_on_video_test.js


var video =require('../burn_srt_on_video');

var src = "./debate_test_trimmed.mp4"; 
var srt = "test.srt";
var output= "test_output.mp4";
video.burn_text(src,srt,output);