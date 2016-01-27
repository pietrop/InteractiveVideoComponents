 var edlMaker = require('./edlFileMaker')
 var fs = require('fs')

var edlJsonSample = [ { type: 'video', id: 0, sourceStart: 44.4, src: './media/video_HD2.ogg', duration: 4.829999999999998, start: 0 },  { type: 'video', id: 1, sourceStart: 17.53, src: './media/debate_test.ogg', duration: 3.2300000000000004, start: 4.829999999999998 } ];

/**
* You can create the EDL as a string and then use the callback to write it
*/
var edlStringResult = edlMaker.makeEdlString(edlJsonSample, "sample EDL", function(edlStringResult){
	fs.writeFileSync('./samplE.edl', edlStringResult);
});


/**
* Or you can use the callback to display it
*/
var edlStringResult = edlMaker.makeEdlString(edlJsonSample, "sample EDL", function(edlStringResult){
	console.log( edlStringResult);
});

/**
*  or you can use the function that provided json, title of edl/file, and optional location where to save it
* will write the edl directly.
*/

edlMaker.makeEDLFile(edlJsonSample, "sample EDL", ".");



/**
* this is what the edl would look like

TITLE: sample EDL
FCM: NON-DROP FRAME

001  aReel_N AA/V  C        00:00:44:10 00:00:49:05 00:00:00:00 00:00:04:20
* FROM CLIP NAME:  video_HD2.ogg
* COMMENT: 
FINAL CUT PRO REEL: aReel_Name_longer_then_7_characthers REPLACED BY: aReel_N

002  aReel_N AA/V  C        00:00:17:13 00:00:20:19 00:00:04:20 00:00:08:01
* FROM CLIP NAME:  debate_test.ogg
* COMMENT: 
FINAL CUT PRO REEL: aReel_Name_longer_then_7_characthers REPLACED BY: aReel_N

*/