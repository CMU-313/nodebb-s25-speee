/**
 * Convention seems to be that this handles 
 * rendering templates.
 */

'use strict';

const Controllers = module.exports;

Controllers.renderButton = function (req, res/* , next */) {
    /** handle the implementation of rendering a button 
     * when the corresponding route is called from the library
     * of the plugin */
	
    res.render('templates/path/to/button.tpl'), {title: "Enodorsement Button"};
};

Controllers.initEnodrsementStatus = function(req, res) {
    /** listens to the hook for post creation
     *  upon this event, sets post fields to include 
     *  endorsements, which should be false
     */
};