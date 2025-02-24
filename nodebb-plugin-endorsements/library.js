'use strict';

/** user defined collection of nodebb modules that are relevant */
const NodeBB = require('./lib/nodebb');
// const winston = require.main.require('winston');

// const meta = require.main.require('./src/meta');

const controllers = require('./lib/controllers');

// const routeHelpers = require.main.require('./src/routes/helpers');

const plugin = {};

plugin.init = async (params) => {
    console.log("hooking in to the app intialization function");
	const { router /* , middleware , controllers */ } = params;

	// Settings saved in the plugin settings can be retrieved via settings methods
	const { setting1, setting2 } = await NodeBB.meta.settings.get('quickstart');
    // console.log(settings1);
	if (setting1) {
		console.log(setting2);
	}

	/**
	 * We create two routes for every view. One API call, and the actual route itself.
	 * Use the `setupPageRoute` helper and NodeBB will take care of everything for you.
	 * */
	NodeBB.routeHelpers.setupPageRoute(router, '/posts/endorsements', [(req, res, next) => {
		NodeBB.winston.info(`[plugins/posts/endorsements] In middleware. This argument can be either a single middleware or an array of middlewares`);
		setImmediate(next);
	}], (req, res) => {
		NodeBB.winston.info(`[plugins/posts/endorsements] Navigated to ${nconf.get('relative_path')}/endorsements`);
		res.render('endorsements', { uid: req.uid });
	});


};

plugin.initializeEndorsements = async (params) => {
	console.log("hooking into the post initalization functio. \n");
	console.log(params);
	/** asynchronlously update endorsement status */
	controllers.initEnodrsementStatus(params.post);

	/** need to pass on the params, otherwise won't be able to intialize the post */
	return params;
};

module.exports = plugin;