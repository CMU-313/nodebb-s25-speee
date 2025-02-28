'use strict';

module.exports = {
	settings: require.main.require('./src/settings'),
	meta: require.main.require('./src/meta'),
	db: require.main.require('./src/database'),
	winston: require.main.require('winston'),
	nconf: require.main.require('nconf'),
	routeHelpers: require.main.require('./src/routes/helpers'),
	posts: require.main.require('./src/posts'),
	plugins: require.main.require('./src/plugins'),
	topics: require.main.require('./src/topics')
};