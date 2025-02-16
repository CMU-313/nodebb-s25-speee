'use strict';

const nconf = require.main.require('nconf');
const winston = require.main.require('winston');

const meta = require.main.require('./src/meta'); //double check if this works 

const controllers = require('./lib/controllers');

const plugin = {};

plugin.init = async (params) =>{
    console.log(JSON.stringify(params));
    const { router } = params;
    

}


module.exports = plugin;