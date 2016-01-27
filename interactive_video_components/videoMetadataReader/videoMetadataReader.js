/**
* module to read video metadata needed for EDL
* reel, timecode, fps. 
* TODO: replace "NA" with undefined
*/

var ffmpeg = require('fluent-ffmpeg');

function readMetadata(file, cb){
  ffmpeg.ffprobe(file, function(err, metadata ) {

    if(cb){cb(metadata)};

      return metadata
  });
}

function readVideoMetadataForEDL(file, cb){
var video ={};

ffmpeg.ffprobe(file, function(err, metadata ) {
  // uncomment this to see the metadata associated with the video file
  // console.log(metadata)
    
      if(metadata.format!= undefined && metadata.format.filename != undefined ){
          
          video.filePathName =metadata.format.filename;
      }else{

          video.filePathName = "NA";//"Time.now";
      }

      // DATE
      if(metadata.streams[0]!= undefined && metadata.streams[0].tags != undefined &&  metadata.streams[0].tags.creation_time != undefined){
          // document.getElementById('inputVideoDate').value = metadata.streams[0].tags.creation_time;
          video.date = metadata.streams[0].tags.creation_time;
      }else{
        // document.getElementById('inputVideoDate').value = "Time.now";
          video.date = "NA";//"Time.now";
      }

     //REEL
     if(metadata.streams[2]!= undefined && metadata.streams[2].tags != undefined &&  metadata.streams[2].tags.reel_name != undefined){
       // document.getElementById('inputVideoReelName').value = metadata.streams[2].tags.reel_name;
       video.reelName = metadata.streams[2].tags.reel_name;
     }else {
       // document.getElementById('inputVideoReelName').value = "not available";
        video.reelName = "NA";
        //+write it to video
     }
    
    //TIMECODE
    if(metadata.streams[0]!= undefined && metadata.streams[0].tags != undefined &&  metadata.streams[0].tags.timecode != undefined){

     // document.getElementById('inputVideoTimecode').value = metadata.streams[0].tags.timecode;
     video.timecode =  metadata.streams[0].tags.timecode;
   }else{
     // document.getElementById('inputVideoTimecode').value = "00:00:00:00";
       video.timecode =  "NA";//"00:00:00:00";
       //+write it to video
       //enable field 
   }

   // fps
    if(metadata.streams[0]!= undefined && metadata.streams[0].codec_time_base != undefined ){
      // document.getElementById('inputVideoTimebase').value = metadata.streams[0].codec_time_base;
      video.fps =  metadata.streams[0].codec_time_base;
    }else{
      // document.getElementById('inputVideoTimebase').value ="1/25";
    video.fps =  "NA";//"1/25";
    //enable field 
    }
    //duration
     if(metadata.streams[0]!= undefined && metadata.streams[0].duration != undefined ){
          // document.getElementById('inputVideoDuration').value = metadata.streams[0].duration;
          video.duration = metadata.streams[0].duration;
      }else{
        // document.getElementById('inputVideoDuration').value = "NA";
        video.duration = "NA";
          //enable field 
      }

      // console.log(JSON.stringify(video));
      // console.log(video);
      cb(video);
      return video;
  });

// return video;
}


// var video = readVideoMetadata('/Users/pietropassarelli/Dropbox/Public/Clip16.mov', function(resp){console.log(resp)});

module.exports = {
    read : function(videoFileName, cb){
    return readVideoMetadataForEDL(videoFileName, cb);
    },
    readMetadata: function(videoFileName, cb){
      readMetadata(videoFileName, cb);
    }
  }