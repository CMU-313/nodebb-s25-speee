'use strict';

function renderPost(req, res/* , next */) {
    /** when a post is endorsed, change the display accordingly
     * should have two views: an endorsed post view, and a 
     * non-endorsed view
    */
    res.render('templates/post.tpl'), {title: "Endorsed Post"};
};

$(document).ready(function () {
    require(['plugins'], function (plugins) {
        $(window).on('action:posts.loaded', function () {
            console.log("User info: ", app.user, ajaxify);
            if (ajaxify.data.template.topic && app.user.uid == 1) {
                // Want to render
                console.log("WE ARE ADMIN! Adding button");
                $("#endorsement-button").addClass('btn');
                $("#endorsement-button").addClass('btn-primary');

                $("#endorsement-button").on("click", async function() {
                    console.log("button was clicked!\n", app.user);
                    /** call controllers functions */
                    await plugins.hooks.fire('filter:post.endorse',{postData: app.user});
                    console.log("Called controller");
                });
            } else {
                $("#endorsement-button").attr('class', 'd-none btn btn-primary');
            }
	    });
    });
});