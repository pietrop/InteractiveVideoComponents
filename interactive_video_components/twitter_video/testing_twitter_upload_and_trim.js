// testing_twitter_upload_and_trim.js

var video_trimmer_uploader = require('./trim_video_and_upload_to_twitter.js')
//test data
var videoFile		= 	"./test_output.mp4";
var videoFileOutput	= 	"debate_test_output.mp4";//needs to be MP4 for twitter specs
var status			=   "Testing Twitter Video API 2";
var inputSeconds	= 2;
var durationSeconds	=	5;

//test function
video_trimmer_uploader.trim_and_upload_to_twitter(videoFile, inputSeconds, durationSeconds,videoFileOutput,status);
