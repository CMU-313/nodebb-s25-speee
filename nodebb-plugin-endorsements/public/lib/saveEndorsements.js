'use strict';

define('forum/topic/postTools', [],function () {
	const  module = {};
	module.init = function () {
		console.log("intialized function\n");
	};
    module.updateEndorsementStatus = async function(pid) {
        console.log("received this pid:")
        console.log("updating endorsement status\n");
    }
	return module;
});