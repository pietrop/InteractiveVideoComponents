/**
* Burns cotent of srt file on a video file
*/
var ffmpeg = require('fluent-ffmpeg');
var spawn = require('child_process').spawn;
var Path = require('path');
//ffmpeg -i video.avi -vf subtitles=subtitle.srt out.avi
// .inputOptions('-fv subtitles=subtitle.srt')

/**
* src: file path of video, with file name
* srt: file path of srt file with file name
* output: file path of
*/
function burn_text(src,srt,output, cb){

// Using spawn with ffmpeg system call instead of ffmpeg fluent as could not work out
// how to set  -vf subtitles in ffmpeg fluent
//however with span you can set the binary of ffmpeg if ie you are packaging it inside nwjs for instance
// var ffmpeg = spawn(Path.join(__dirname, 'videogrep_standalone/ffmpeg'), ['-y', '-i', path, '-acodec', 'pcm_s16le', '-ac', '1', '-ar', '16000', new_name]);
	//TODO: temp.srt needs to be a variable
	// var subtitle =  'subtitles=temp.srt';
	var subtitle =  "subtitles="+srt+":force_style='FontName=DejaVu Serif,FontSize=42'"

	// +":force_style='FontName=DejaVu Serif,PrimaryColour=&HAA00FF00'";
	var ffmpeg = spawn(Path.join('ffmpeg'), ['-y', '-i', src, '-vf', subtitle,  output]);

	ffmpeg.stdout.on('data', function(data) {
	    console.log('' + data);
	  });

	/**
	* Gets called when ffmpeg processed is completed
	* TODO: add and testoptional callback inside
	*/
	ffmpeg.on('close', function(code) {
	    console.log('finished converting');
	    if(cb){cb}
	});
}

//export
module.exports = {
  burn_text: function(src, srt,output) {
    return burn_text(src, srt,output);
  }
};



// https://stackoverflow.com/questions/21363334/how-to-add-font-size-in-subtitles-in-ffmpeg-video-filter
