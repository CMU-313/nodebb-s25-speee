
/**
 * handle interactions with the client in this file.
 * Keep in mind, this script will only be called based
 * on the routes that were mounted in the plugin library.
 * Also, note only the initialization function will be 
 * called. 
 * 
 * Further, note these files can be treated as scripts or modules.
 * Scripts will be bundeled into the javascript that is 
 * served to the client. 
 * Modules will not be included with javscript served to the
 * client. Instead, they will be dynamically loaded on a 
 * page by page basis
 */

'use strict';

// (async () => {
// 	const hooks = await app.require('hooks');

// 	hooks.on('action:app.load', () => {
//         console.log("app loaded\n");
// 		// called once when nbb has loaded
// 	})

// 	hooks.on('action:ajaxify.end', (/* data */) => {
// 		// called everytime user navigates between pages including first load
//         console.log("navigating between pages\n");
// 	});
// })();

// function getData(postEl, data) {
//     const res = postEl.parents().closest('li');
//     console.log(res);
//     return res.attr(data);
// }


$(document).ready(function () {

    
    console.log("document is ready\n");

    const toolsEl = $('[class="sticky-tools"]');

    if (!toolsEl.length) {
        return;
    }

    require(['client/endorse','api'], function(postTools,api) {
        $('.menu-itme').on('click', async function () {
            // const toolsEl = $([component="topic"]);
            console.log("plugin registered post tools being clicked!\n");
            // console.log(postTools);
            // const pid = getData(toolsEl, 'data-pid');
            // console.log(pid);
            // postTools.updateEndorsementStatus(pid);
            await api.get(`/update-endorsement/${pid}`);
            
        });

    });

    
});

// define("forum/topic/postTools", [], function(){
    
//     const endorseTools = {};

//     endorseTools.init = function() {
//         $('[component="topic"]').on('show.bs.dropdown', '[component="post/tools"]', function () {
//             console.log("plugin registered post tools being clicked!\n");
//         })

//     }
    
// });

// define('forum/topics/postTools'), [], function () {
//     const EndorseTools = {};

//     EndorseTools.init = function () {
//         console.log("attempted to intialize a handleButton Module \n");
//         $('[component=post]').on('show.bs.dropdown','[component="post/tools"]',
//             function(){
//                 console.log("button was clicked!\n");
//                 /** call controlllers functions */
//                 // plugins.hooks.fire('filter:endorsements.updateEnodrsementStatus',{postData: {}});
//         });

//     }
// };
