const Iroh = require('iroh');
const fs = require('fs');



/** does not handle full javascript files well */
const apiFileContents = fs.readFileSync('./test/api.txt').toString();

let stage = new Iroh.Stage(apiFileContents);

let varListener = stage.addListener(Iroh.VAR); /** Listen for a variable being assigned */
let funcListener = stage.addListener(Iroh.FUNCTION) /** Listen for function events */

varListener.on("after", (e) => {
    console.log(`Assigned ${e.name} to value ${e.value}`)
});

funcListener.on("return", (e) => {
    console.log(`returned from ${e.name}`)
});

eval(stage.script);