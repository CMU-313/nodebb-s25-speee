'use strict';

const nconf = require.main.require('nconf');
const winston = require.main.require('winston');

const meta = require.main.require('./src/meta'); //double check if this works 

const controllers = require('./lib/controllers');

const plugin = {};

plugin.init = async (params) =>{
    /* upon intialzing the app, create system groups */
    console.log('intializing the app \n');
    console.log(JSON.stringify(params));
    const { router } = params;
    await controllers.createCourseGroups();
    await controllers.giveCourseGroupPrivs();

}

plugin.intializePrivs = async (privsData) => {
    /* initalize global privileges iwth new information */
    console.log('intializing privileges \n');
    console.log(JSON.stringify(privsData));
    await controllers.intializePrivs(privsData);
}

module.exports = plugin;