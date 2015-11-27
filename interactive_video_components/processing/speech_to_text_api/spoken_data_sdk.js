// spoken_data_sdk.js
// look at implementation of ruby version
//needs to be initialised with keys
//send video - returns UID

//also contains method to retrieve speaker diarizaiton
//this is retrieved as a json that is appended to hypertranscript under hypertranscript.speakerdiarization


//TODO need to add errors if api not responding

var https = require('https');
var fs = require('fs');
var async = require("async")
var parseString = require('xml2js').parseString;
var request = require('request');
var srt_to_hypertranscript = require('../srt_to_hypertranscript')
//config contains API keys
var config = require('../../../config');

var locationWhereToSaveSrtFiles="./"

function SpokenDataAPI() {
	//keys
	this.key 		= config.spokendata.apitoken;
	this.baseurl 	= config.spokendata.baseurl;
	this.userid 	= config.spokendata.userid;
	//end points
	this.ENDPOINTS 	= {};
	this.ENDPOINTS['recordingList']	=	"/recordingList";
	this.ENDPOINTS['recording']		=	"/recording";

	this.baseApiRequest= this.baseurl +"/"+ this.userid +"/" +this.key;	

	this.getRecordingsListURL = function (){
		var url = this.baseApiRequest + this.ENDPOINTS['recordingList']
		return url;
	}

	//returns an XML containing a whole bunch of links to that specific recording
	this.getRecordingURL = function(uid){
		var url = this.baseApiRequest + this.ENDPOINTS['recording'] +"/"+uid
		return url;
	}

	//srt returned as a string
	this.getRecordingSRTURL = function(uid){
		var url = this.baseApiRequest + this.ENDPOINTS['recording'] +"/"+uid+"/subtitles.srt"
		return url;
	}

	//from uid srt fetched, parsed and returned as a hypertranscript json
	this.getRecordingSRT = function(uid){
		var uid = uid;
		var url = this.getRecordingSRTURL(uid);
		async.waterfall([
		    function(callback) {
		    	//get/compose url of destination to open
				// console.log(url);
		        callback(null, url);
		    },
		    function(url,  callback) {
		    	//open url
				request(url, function (error, response, body) {
					  if (!error && response.statusCode == 200) {
					 	callback(null, body);		   
					  }//if
					}//anonimous function handling response
				);	      
		    },
		    function(body, callback) {
		        //write response to file. srt string -> to str file
				var srtFileName =locationWhereToSaveSrtFiles+"file"+uid+".srt";
				fs.writeFileSync(srtFileName, body, 'utf8');
				// console.log(srtFileName);
				// console.log(body);
		        callback(null, srtFileName);
		    },
		    function(srtFileName, callback) {
			//open file	srt file / parse into hypertranscript json
				//TODO srt_to_hypertranscript.convert needs to take in object with video info
				// and needs to take in object with basic transcript info.
		        var hpypertranscript_json= srt_to_hypertranscript.convert(srtFileName)
		        // console.log(hpypertranscript_json);
		        callback(null, hpypertranscript_json);
		    }
		], function (err, result) {
			// console.log(result);
			//TODO: save to db here
			console.log(result);
		    return result;
		});			
	}

		

	//srt returned as a xml, with speaker diarization
	//TODO: should probably parse xml and returns it as a json
	this.getRecordingXMLURL = function(uid){
		var url = this.baseApiRequest + this.ENDPOINTS['recording'] +"/"+uid+"/subtitles.xml"
		return url;
	}


	this.getRecordingXML = function(uid){
		var uid = uid;
		var url = this.getRecordingXMLURL(uid);
		async.waterfall([
		    function(callback) {
		    	//get/compose url of destination to open
				// console.log(url);
		        callback(null, url);
		    },
		    function(url,  callback) {
		    	//open url
				request(url, function (error, response, body) {
					  if (!error && response.statusCode == 200) {
					 	callback(null, body);		   
					  }//if
					}//anonimous function handling response
				);	      
		    },
		    function(xml, callback) {
		        //open xml of body and parse into json
					parseString(xml, function (err, result) {
						//speaker diarization in json object array of segments
				    	callback(null, result);
					});   
		    },
		    function(xml, callback) {
		    	//make into json string to be able to pass it a round
				var speakerdiarization = JSON.stringify(xml);
		        // console.log(hpypertranscript_json);
		        callback(null, speakerdiarization);
		    }
		], function (err, result) {
			// console.log(result);
			//TODO: save speaker diarization to db here
			//or append to hypertranscript?
			//TODO: combine: get recording srt, make hypertranscript.
			//then get speaker diarization and add to hypertranscript
			console.log(result);
		    return result;
		});			
	}




	//returns recording uid
	this.addNewRecordingURL = function(recordingURL){
		var url = this.baseApiRequest + this.ENDPOINTS['recording'] +"/"+"add?url="+recordingURL+"&language=english"	
		return url;
	}//addNewRecordingURL

}//end of spoken data object




SpokenData = new SpokenDataAPI(); 	

//a list of recordings on 
// console.log(SpokenData.getRecordingsListURL());

//contains all the info
// console.log(SpokenData.getRecordingURL(6107));

//if recording available returns srt otherwise returns that is being processed
// SpokenData.getRecordingSRT(6107);


SpokenData.getRecordingSRT(6107);

//returns speaker diarization 
// console.log(SpokenData.getRecordingXML(6107));
SpokenData.getRecordingXML(6107);




module.exports = {
    hypertranscript : function(uid){
    	//returns json of hypertranscript
    return SpokenData.getRecordingSRT(uid);
  },
  speakerdiarization : function(uid){
  	//returns json of speaker diarization
    return SpokenData.getRecordingXML(uid);
  },
  version: function(){
  	return "1.0.0";
  }
};


// exports.version = "1.0.0";






