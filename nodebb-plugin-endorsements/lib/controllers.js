/**
 * Convention seems to be that this handles 
 * rendering templates.
 */

'use strict';

const NodeBB = require("./nodebb");

const Controllers = module.exports;

Controllers.renderButton = function (req, res/* , next */) {
    /** handle the implementation of rendering a button 
     * when the corresponding route is called from the library
     * of the plugin */
	
    res.render('/client/topic/postTools'), {title: "Render Endorsement Button"};
};

Controllers.initEnodrsementStatus = async function(postData) {
    /** listens to the hook for post creation.
     *  upon this event, wait for the post to be initalized.
     *  then, update the post fields to include the endorsements field.
     */

    /* wait for the post to intialize in the db */
    await NodeBB.db.setObject(`post:${postData.pid}`, postData);
    /* by default, a post is not endorsed */
    await NodeBB.posts.setPostFields(postData.pid,{'endorsed':false});
    console.log(postData.pid);

};

Controllers.updateEndorsementStatus = async function(postData) {
    console.log("updating endorsement status \n");
    /** TO-DO: error handeling? */
    /* update post endorsement status */
    await NodeBB.posts.setPostFields(postData.pid,{'endorsed':true});
};