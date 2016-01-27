/**
* to install ogg codecs for audio and video
* https://trac.ffmpeg.org/wiki/TheoraVorbisEncodingGuide
* brew reinstall ffmpeg --enable-libvorbis --enable-libtheora
* ffmpeg -i input.mkv -codec:v libtheora -qscale:v 7 -codec:a libvorbis -qscale:a 5
*/

var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg();


var convertToOgg = function(src, outputName, callback){
	var videoSrc= src;
	// TODO: change so  that if outputName not defined, then does following line. outputName as optional param
	// var output = videoSrc.split(".")[0] + "_twitter"+".mp4";//html5
	var command = ffmpeg(videoSrc).output(outputName).withAudioCodec('libvorbis').withVideoCodec('libtheora').on('end', callback || function() {
	    console.log('Finished processing');
	  })
	  .run();
	 // return output;
}


module.exports = {
		convertToOgg : function(src, outputName, callback){
		return convertToOgg(src, outputName, callback);
	}//,
};
