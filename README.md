Work in progress

# InteractiveVideoComponents
A collection of node modules that can be used on video projects, centred a round the idea of hypertranscript as a way into the content of the video.

When refactoring [quickQuote](http://times.github.io/quickQuote/) from ruby on rails to node, adding a live video stream as input and export to twitter video API, 
decided to abstract core components in common between quickQuote and [autoEdit](http://pietropassarelli.com/autoEdit.html) into
 a collection of `InteractiveVideoComponents` in this repository, to make it easier to quickly get off the ground on similar video/transcription based projects.
 
Currently this is a work in progress.

The [wiki section](https://github.com/pietrop/InteractiveVideoComponents/wiki) of this project is up to date with the description and state of the development of the various components. 


## Config file

Config file is in git ignore, but the following code create one for your project. 

```js
var config = {};

config.twitter = {};
config.spokendata={};

config.spokendata.baseurl 		=	process.env.SPOKENDATA_BASEURL 		|| "";
config.spokendata.userid 		=	process.env.SPOKENDATA_USERID		|| ;
config.spokendata.apitoken 		=	process.env.SPOKENDATA_APITOKEN		|| "";

config.twitter.consumer_key 	=	process.env.TWITTER_CONSUMER_KEY 	|| "";
config.twitter.consumer_secret 	= 	process.env.TWITTER_CONSUMER_SECRET || "";
config.twitter.token 			=	process.env.TWITTER_TOKEN 			|| "";
config.twitter.token_secret		= 	process.env.TWITTER_SECRET 			|| "";

module.exports = config;
```

## Install dependencies

```bash
npm install
```


## video file

as the video file is 207.5 mb is not included in the git repo, and the `.gitignore` is set to exclude videos from the repo to stop it from upload. So here is a[link to video file](https://dl.dropboxusercontent.com/u/449999/debate_test.mp4). 