var metadataReader = require('./videoMetadataReader')

var sampleVideo = "/Users/pietropassarelli/Dropbox/Public/Clip16.mov";

metadataReader.read(sampleVideo, function(resp){console.log(resp)});

// metadataReader.readMetadata('/Users/pietropassarelli/Dropbox/Public/Clip16.mov', function(resp){console.log(resp)});

