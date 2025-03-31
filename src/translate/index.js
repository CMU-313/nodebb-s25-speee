var request = require('request');

const translatorApi = module.exports;

translatorApi.translate = async function (postData) {
    // Edit the translator URL below
    const TRANSLATOR_API = "http://translator:5000/"
    const response = await fetch(TRANSLATOR_API+'/?content='+postData.content);
    const data = await response.json();
    console.log(data)
    return [data["is_english"], data["translated_content"]]
}