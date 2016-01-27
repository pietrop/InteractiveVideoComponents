
var timecodes = require('node-timecodes');
var fs = require('fs');

function makeEdlString(edlJson, EDLname, cb){
	var edlString = "";
	var title = "TITLE: "+EDLname+"\nFCM: NON-DROP FRAME\n\n"

	edlString+=title;

	for(var i=0; i<edlJson.length; i++){
		
		var n = i+1;
		if(n.toString().split("").length ==1 ){
			n = "00"+n.toString();
		}else if(n.toString().split("").length ==2 ){
			n = "0"+n.toString()
		}

		var time_in = edlJson[i].sourceStart;
		var tc_meta  = 0; //to add to arguments.
		var time_out = edlJson[i].sourceStart+ edlJson[i].duration;
		var rec_in = (i==0)? (edlJson[i].start) : (edlJson[i-1].duration + edlJson[i-1].start);
		var rec_out =  edlJson[i].start+ edlJson[i].duration;
		var reelFullName = "aReel_Name_longer_then_7_characthers";

		var fileNameArray = edlJson[i].src.split("/")
		var fileName = fileNameArray[(fileNameArray.length -1)]

		edlString+= makeSegment(n, time_in, tc_meta, time_out, rec_in ,rec_out, reelFullName, fileName )
	
	}
	// console.log(edlString);

	if (cb){cb(edlString)};
	return edlString;
}

/*
* Helper method
*/
function makeSegment(n, time_in,tc_meta, time_out, rec_in, rec_out,reelFullName, clipName ){
	
	if(reelFullName.split("").length > 7 ){
		var reel = reelFullName.split("").splice(0,7).join("") 
	}else{
		var reel = reelFullName;
	}

	var result = ""+n+"  "+reel+" AA/V  C        "+timecodes.fromSeconds(time_in + tc_meta) +" "+ timecodes.fromSeconds(time_out + tc_meta)+" "+timecodes.fromSeconds(rec_in)+" "+timecodes.fromSeconds(rec_out)+"\n* FROM CLIP NAME:  "+clipName+"\n* COMMENT: \nFINAL CUT PRO REEL: "+reelFullName+" REPLACED BY: "+reel+"\n\n"

	return result;

}


function makeEDLFile(edlJson, title, path){

	makeEdlString(edlJson, "sample EDL", function(edlStringResult){
		//optional path param for where to save EDL file.
		if(path){
			var locationPath = path;
		}else{
			var locationPath = "."
		}
		fs.writeFileSync(locationPath +'/'+title+'.edl', edlStringResult);		
	});
	
}


//export
module.exports = {
  makeEdlString: function(edlJson, title, cb) {
    return makeEdlString(edlJson, title,cb);
  }, 
  makeEDLFile: function(edlJson, title, path){
  	return makeEDLFile(edlJson, title,path);
  }
};