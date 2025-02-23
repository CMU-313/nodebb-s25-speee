'use strict';

function renderPost(req, res/* , next */) {
    /** when a post is endorsed, change the display accordingly
     * should have two views: an endorsed post view, and a 
     * non-endorsed view
    */
    res.render('templates/path/to/endorsed/post.tpl'), {title: "Endorsed Post"};
};


function updateEnodrsementStatus() {
    /* upon receiving an endorsement, a post should be marked as endorsed
       in the database  */
};