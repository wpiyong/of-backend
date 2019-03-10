'use strict';

var rootPath = __dirname + '/..';

const
config = {
	root: rootPath,
	environment : 'development',
	//environment : global.environment || process.env.NODE_ENV || 'development',

	database : {
		development : {
			//url : 'mongodb://woo-admin:woo-tang-clan@10.132.58.95:27017/watchourown-main'
			url: 'mongodb://localhost:27017/lptest'
		}
	},
	port : process.env.PORT || '4000'
};

module.exports = config;