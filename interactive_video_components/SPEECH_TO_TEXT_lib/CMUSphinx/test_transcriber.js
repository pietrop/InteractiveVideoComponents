var transcriber = require('./transcriber')

var samplevideo ="./debate_test_trimmed.mp4"


// transcriber.videoTosrtString(samplevideo, function(resp){console.log(resp)});
// transcriber.videoTosrtToFile(samplevideo,'sample','.',function(resp){console.log(resp)});

transcriber.videoToHypertranscript(samplevideo, function(resp){console.log(resp)});