/*
 * Author:     Vignesh Kumar
 * Copyright:  vigneshuvi
 * Date:	   23/03/2017
 * This file contains the register the web service modules and its file path.
 */


'use strict';

module.exports = {
	webservices: [
		{
			name : "users",
			methods : require('./services/v1/user/user')
		}
	]
};