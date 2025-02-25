'use strict';

function renderPost(req, res/* , next */) {
    /** when a post is endorsed, change the display accordingly
     * should have two views: an endorsed post view, and a 
     * non-endorsed view
    */
    res.render('templates/post.tpl'), {title: "Endorsed Post"};
};

$(document).ready(function () {
    
	$(window).on('action:ajaxify.end', function () {
		if (ajaxify.data.template.topic && app.user.uid == 1) {
			// Want to render
            console.log("WE ARE ADMIN! Adding button");
		}
	});
});