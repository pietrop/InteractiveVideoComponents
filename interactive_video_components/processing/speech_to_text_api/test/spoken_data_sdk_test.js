var SpokenData = require('../src/spoken_data_sdk.js');


var UID = 6160;
var fileNameTest ='../twit_export.mp4';
var youTubeUrlTest = "https://youtu.be/iG9CE55wbtY";

exports.test_version = function(test){
    test.equals( SpokenData.version(), "1.0.0");
    test.done();
}

/**
* getvideoUrl
*/
exports.getvideoUrl_from_uid = function(test){
    test.equals( SpokenData.getvideoUrl(UID, function(resp){ console.log(resp)}), "http://147.229.8.44/glocal/data/70-20150902-004052-977-000794-CyOvRHJWYa/steps/020/out/04_webbrowser/video_HD.mp4");
    test.done();
}

/**
* getTranscription
*/
exports.getTranscription_from_uid = function(test){
    test.equals( SpokenData.getTranscription(UID, function(resp){ console.log(resp)}), "?");
    test.done();
}

/**
* getSpeakerDiarization
*/
exports.getSpeakerDiarization_from_uid = function(test){
    test.equals( SpokenData.getSpeakerDiarization(UID, function(resp){ console.log(resp)}), "?");
    test.done();
}

/**
* addNewRecording
*/
exports.addNewRecording_from_video_file = function(test){
    test.equals( SpokenData.addNewRecording(fileNameTest, function(resp){ console.log(resp)}), "some uid -typeof int?");
    test.done();
}

/**
* addNewRecordingByURL
*/
exports.addNewRecordingByURL = function(test){
    test.equals( SpokenData.addNewRecordingByURL(youTubeUrlTest, function(resp){ console.log(resp)}), "some uid-typeof int?");
    test.done();
}
