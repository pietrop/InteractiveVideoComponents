// burn_words_json_to_video.js
var fs = require('fs');
var srtToVideo =require('./burn_srt_on_video');
var srtConverter = require('./text_json_to_srt')

function convert(words,src,output){
	var srt = "temp.srt"
	srtConverter.convert(words,srt);
	srtToVideo.burn_text(src,srt,output);
	//TODO: remove srt file
	// fs.unlinkSync(srt);
}


//export
module.exports = {
  convert: function(words,src,output) {
    return convert(words,src,output);
  }
};