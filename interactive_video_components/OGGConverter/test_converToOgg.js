// test_converToOgg.js

var oggConverter = require('./convertToOgg.js')
var sampleVideo = "/Users/pietropassarelli/Dropbox/Public/Clip16.mov";
oggConverter.convertToOgg(sampleVideo, './clip16.ogg');