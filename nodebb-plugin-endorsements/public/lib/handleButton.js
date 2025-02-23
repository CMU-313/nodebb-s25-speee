
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

export function init(){
    console.log("attempted to intialize a handleButton Module");
    receiveEndorsement();
}


function receiveEndorsement() {
    $("#button").on("click",function(){
        console.log("button was clicked!\n");
        /** call controlllers functions */
    });

}

