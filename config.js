/*
 * Author:     Vignesh Kumar
 * Copyright:  vigneshuvi
 * Date:	   23/03/2017
 * This file contains the environment setup based on the NODE_ENV variable.
 */

'use strict';

var config = require("./envconfig.json"); 

// Return the environment configuration based on the NODE_ENV variable.
module.exports.getConfig = function() {
    switch(process.env.NODE_ENV) {
        case 'PROD':
            return config.PROD;

        case 'QA':
            return config.QA;

        case 'DEV':
        	return config.DEV;  

        default:
            return config.DEV;
    }
};