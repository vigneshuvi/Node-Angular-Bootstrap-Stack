/*
 * Author:     Vignesh Kumar
 * Copyright:  vigneshuvi
 * Date:	   23/03/2017
 * This file contains the User Web service for all request type of GET, POST, PUT, DELETE.
 */

'use strict';

var userModel = require('./model/UserModel');

var exports = module.exports = {};

exports.show = function(req, res) {
    try {
    	var requestId = req.params.id;
		console.log("Show requestId : "+ requestId);
		var userObject = new Object();
		userObject.firstname = "vignesh";
		userObject.lastname = "kumar";
		userObject.email = "vignesh@gmail.com";
        var resJson = {
			status : true,
			data: userObject,
			message : "successfully hit the SHOW user webservice."
		}
		return res.status(200).send(resJson);
    } catch (exe) {
    	console.log("Exeception occured while access show webservice. \n Error :",exe);
        return res.sendStatus(404);
    }
};

exports.show = function(req, res) {
    try {
    	var requestId = req.params.id;
		console.log("Show requestId : "+ requestId);
		var userObject = new Object();
		userObject.firstname = "vignesh";
		userObject.lastname = "kumar";
		userObject.email = "vignesh@gmail.com";
        var resJson = {
			status : true,
			data: userObject,
			message : "successfully hit the SHOW user webservice."
		}
		return res.status(200).send(resJson);
    } catch (exe) {
    	console.log("Exeception occured while access show webservice. \n Error :",exe);
        return res.sendStatus(404);
    }
};

exports.showall = function(req, res) {
    try {
    	// create User object array.
        var userObjectArray = []
        // First user
		var userObject1 = new Object();
		userObject1.firstname = "vignesh";
		userObject1.lastname = "kumar";
		userObject1.email = "vignesh@gmail.com";
		userObject1.status = "All ways there is a way";
		userObject1.lastUpdatedTime = new Date().getTime();
		userObject1.socialsupport = [{network_id : 1} ,{network_id : 2} ];

		userObjectArray.push(userObject1);

		// Secound user
		var userObject2 = new Object();
		userObject2.firstname = "vinoth";
		userObject2.lastname = "kumar";
		userObject2.email = "vinoth@gmail.com";
		userObject2.status = "Love you baby ❤️";
		userObject2.lastUpdatedTime = new Date().getTime();
		userObject2.socialsupport = [{network_id : 1} ,{network_id : 4} ];

		userObjectArray.push(userObject2);

		var resJson = {
			status : true,
			data: userObjectArray,
			message : "successfully hit the SHOWALL user webservice."
		}
		return res.status(200).send(resJson);
    } catch (exe) {
    	console.log("Exeception occured while access showall webservice. \n Error :",exe);
        return res.sendStatus(404);
    }
};
   
exports.update = function(req, res) {
	try {
		var requestId = req.params.id;
		console.log("Update requestId : "+ requestId);

		// Create a User object.
		var userObject = new Object();
		userObject.firstname = "vignesh";
		userObject.lastname = "kumar";
		userObject.email = "vignesh@gmail.com";

        var resJson = {
			status : true,
			data: userObject,
			message : "successfully hit the UPDATE user webservice."
		}
		return res.status(200).send(resJson);
    } catch (exe) {
    	console.log("Exeception occured while access update webservice. \n Error :",exe);
        return res.sendStatus(404);
    }
};

exports.create = function(req, res) {
	try {
		if (req.body) {
			if(!req.body.firstname) {
				var resJson = {
					status : false,
					message : "First Name is required."
				}
				return res.status(404).send(resJson);
			} else if(!req.body.lastname) {
				var resJson = {
					status : false,
					message : "Last Name is required."
				}
				return res.status(404).send(resJson);
			} else if(!req.body.email) {
				var resJson = {
					status : false,
					message : "Email is required."
				}
				return res.status(404).send(resJson);
			} else if(!req.body.password) {
				var resJson = {
					status : false,
					message : "Password is required."
				}
				return res.status(404).send(resJson);
			} else {
				// Create a User object.
	    		var userObject = new Object();
				userObject.firstname = "vignesh";
				userObject.lastname = "kumar";
				userObject.email = "vignesh@gmail.com";
		        var resJson = {
					status : true,
					authtoken: "a29jaGlfdmlnbmVzaGt1bWFyQHFidXJzdC5jb206UWJ1cnN0QDIwMTY=",
					data: userObject,
					message : "successfully user created."
				}
				return res.status(200).send(resJson);
			}
		}
    } catch (exe) {
    	console.log("Exeception occured while access create webservice. \n Error :",exe);
        return res.sendStatus(404);
    }
};

exports.delete = function(req, res) {
	try {
		var requestId = req.params.id;
		console.log("Delete requestId : "+ requestId);
		// Create a User object.
		var userObject = new Object();
		userObject.firstname = "vignesh";
		userObject.lastname = "kumar";
		userObject.email = "vignesh@gmail.com";

        var resJson = {
			status : true, 
			data: userObject,
			message : "successfully hit the DELETE user webservice."
		}
		return res.status(200).send(resJson);
    } catch (exe) {
    	console.log("Exeception occured while access delete webservice. \n Error :",exe);
        return res.sendStatus(404);
    }
};