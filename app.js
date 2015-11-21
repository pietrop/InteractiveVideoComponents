var config = {};

config.twitter = {};
config.spokendata={};

// config.default_stuff =  ['red','green','blue','apple','yellow','orange','politics'];
config.spokendata.baseurl 		=	process.env.SPOKENDATA_BASEURL 		|| "https://spokendata.com/api";
config.spokendata.userid 		=	process.env.SPOKENDATA_USERID		||794;
config.spokendata.apitoken 		=	process.env.SPOKENDATA_APITOKEN		||"ewxha78944eod837ao3cuolrx65n3ytv10q4csrd";

config.twitter.consumer_key 	=	process.env.TWITTER_CONSUMER_KEY 	|| 'UHbh0ikV113GSCIDL7ILZK7fG';
config.twitter.consumer_secret 	= 	process.env.TWITTER_CONSUMER_SECRET || 'uwNIEWby6Zz9NcAOo7zta0UhzYxbGxpwQPlqs2WK4VuLrRLCWk';
config.twitter.token 			=	process.env.TWITTER_TOKEN 			|| '75041621-PHvBc9KP5fdZq1DgEP9go1cHujxB9zQLd8bmBTqtl';
config.twitter.token_secret		= 	process.env.TWITTER_SECRET 			||'nPbsgUt2GL1Mj8PDQtKqiqMxVt020XiSaOuxhrTI9ZcEc';


module.exports = config;