'use strict';

/** user defined collection of nodebb modules that are relevant */
const NodeBB = require('./lib/nodebb');

const nconf = require.main.require('nconf');
const winston = require.main.require('winston');

const meta = require.main.require('./src/meta');

const routeHelpers = require.main.require('./src/routes/helpers');

const plugin = {};

plugin.init = async (params) => {
	const { router /* , middleware , controllers */ } = params;

	// Settings saved in the plugin settings can be retrieved via settings methods
	const { setting1, setting2 } = await meta.settings.get('endorsement');
	if (setting1) {
		console.log(setting2);
	}

	/**
	 * We create two routes for every view. One API call, and the actual route itself.
	 * Use the `setupPageRoute` helper and NodeBB will take care of everything for you.
	 *
	 * Other helpers include `setupAdminPageRoute` and `setupAPIRoute`
	 * */
	routeHelpers.setupPageRoute(router, '/endorse', [(req, res, next) => {
		winston.info(`[plugins/nodebb-plugin-endorsements] In middleware. This argument can be either a single middleware or an array of middlewares`);
		setImmediate(next);
	}], (req, res) => {
		winston.info(`[plugins/nodebb-plugin-endorsements] Navigated to ${nconf.get('relative_path')}/endorse`);
		res.render('endorse', { uid: req.uid });
	});

	// routeHelpers.setupAdminPageRoute(router, '/admin/plugins/endorse', controllers.renderAdminPage);
};

plugin.addRoutes = async ({ router, middleware, helpers }) => {
	const middlewares = [
		middleware.ensureLoggedIn,			// use this if you want only registered users to call this route
		middleware.admin.checkPrivileges,	// use this to restrict the route to administrators
	];

	routeHelpers.setupApiRoute(router, 'get', '/endorse/:pid', middlewares, (req, res) => {
		console.log("Endorsing: ", req.params);
		// Get this PID + endorse it
		helpers.formatApiResponse(200, res, {
			pid: req.params.pid,
		});
	});
};

plugin.addAdminNavigation = (header) => {
	header.plugins.push({
		route: '/plugins/endorse',
		icon: 'fa-tint',
		name: 'Endorsement',
	});

	return header;
};

plugin.init = async (params) => {
    console.log("hooking in to the app intialization function");
	const { router /* , middleware , controllers */ } = params;

	// Settings saved in the plugin settings can be retrieved via settings methods
	const { setting1, setting2 } = await NodeBB.meta.settings.get('endorsements');
    // console.log(settings1);
	if (setting1) {
		console.log(setting2);
	}

	/**
	 * We create two routes for every view. One API call, and the actual route itself.
	 * Use the `setupPageRoute` helper and NodeBB will take care of everything for you.
	 * */
	NodeBB.routeHelpers.setupApiRoute(router, 'get', '/endorse/:pid', [(req, res, next) => {
		NodeBB.winston.info(`[plugins/posts/endorsements] In middleware. This argument can be either a single middleware or an array of middlewares`);
		setImmediate(next);
	}], (req, res) => {
		NodeBB.winston.info(`[plugins/posts/endorsements] Navigated to ${nconf.get('relative_path')}/endorsements`);
		res.render('endorsements', { uid: req.uid });
	});
	NodeBB.routeHelpers.setupPageRoute(router,
		'/client/topic/postTools',
		controllers.renderButton, 
	);

};

plugin.initializeEndorsements = async (params) => {
	console.log("hooking into the post initalization functio. \n");
	console.log(params);
	/** asynchronlously update endorsement status */
	// await NodeBB.posts.setPostFields(params.post.pid, {'endorsed':true});

	/** need to pass on the params, otherwise won't be able to intialize the post */
	return params;
};


plugin.updateEndorsementStatus = async function(postData)
{
    /* 
	upon receiving an endorsement, a post should be marked as endorsed
    in the database  
	*/
	controllers.updateEndorsementStatus(postData);
};

plugin.buildPostTools = function(postData) {
	console.log("attempted to build post tools \n");
	return postData;
}

plugin.buildTools = function(threadData) {
	/** alternative method for future implementations
	 *  If modifying harmony theme templates is too brittle
	 *  we could listen for the post to be loaded and add a class displaying whether its endorsed
	 *  not sure if this class would persist across loads tho
	 */
	console.log("attempted to buidl topic tools\n");
	return threadData;
}

plugin.addRoutes = async({router, middleware, helpers}) => {
	console.log("adding api routes \n");
	routeHelpers.setupApiRoute(router, 
		'get', 
		'/update-endorsement/:param1', 
		[], 
		controllers.updateEndorsementStatus);
}
module.exports = plugin;
