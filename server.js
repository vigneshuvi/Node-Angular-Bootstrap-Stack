/*
 * Author:     Vignesh Kumar
 * Copyright:  vigneshuvi
 * Date:	   23/03/2017
 * This file contains the web service environment configuration and register the services and authentications.
 */

'use strict';

// var config = require("./config.json"); 
var express = require('express'),
	serviceConfig = require('./webservice'),
	auth = require('./auth'),
	request = require('request'),
	config = require('./config.js'),
	https = require('https'),
	http = require('http'),
	fs = require('fs'),
	ejs = require('ejs'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	path = require('path'),
	favicon = require('serve-favicon'),
	app = express(),
	querystring = require('querystring');

// Set the Web service configuration based on Environment.
var wsConfig = config.getConfig();


app.set('title', wsConfig.title);	// Set the Application title
app.use(bodyParser.json());	// for parsing application/json
app.use(cors()); // Enable cross plateform

app.engine('.html', ejs.__express); // Set the ejs engine in Express
app.set('view engine', 'html');		// Set the Engine view
app.use(express.static('./public'));
app.set('views', path.join(__dirname, 'public')); // Set the views path

//app.use(favicon(__dirname + '/public/favicon.ico'));

// Response the Home Url
app.get('/',function(req,res){
    res.render('index', { title: wsConfig.title });
});


// Web sevice of getting version.
app.get('/api/'+wsConfig.version+'/u1v2i3C4o5n6f7i8g9', function(req,res) {
    try {
 		var resJson = {
			status : true,
			message : "successfully hit the config webservice.",
			environment : process.env.NODE_ENV
		}
		return res.status(200).send(resJson);

    } catch (exe) {
    	console.log("Exeception occured while access u1v2i3C4o5n6f7i8g9 webservice. \n Error :",exe);
        return res.sendStatus(404);
    }
});

// Web sevice of user authentication.
app.post('/api/'+wsConfig.version+'/authenticate', function(req, res) {
    try {
    	if (req.body.email && req.body.password) {
    		var userObject = new Object();
			userObject.firstname = "vignesh";
			userObject.lastname = "kumar";
			userObject.email = "vignesh@gmail.com";
	        var resJson = {
				status : true,
				authtoken: "a29jaGlfdmlnbmVzaGt1bWFyQHFidXJzdC5jb206UWJ1cnN0QDIwMTY=",
				data: userObject,
				message : "successfully hit the SHOW user webservice."
			}
			return res.status(200).send(resJson);
    	} else {
	        var resJson = {
				status : false,
				message : "Email or Password is required."
			}
			return res.status(404).send(resJson);
    	}
		
    } catch (exe) {
    	console.log("Exeception occured while access show webservice. \n Error :",exe);
        return res.sendStatus(404);
    }
});

var validateType = null;
// Web Service Authendication validate
if(wsConfig.auth === "required") {
	validateType = auth.authentication;
} else {
	validateType = auth.bypass;
}


// Register the Web service.
if (serviceConfig && serviceConfig.webservices && serviceConfig.webservices.length > 0) {
	try {
		var registerService = serviceConfig.webservices;			// Get the Register Web service module list.
		for (var api in registerService) {
			var registerServiceName = registerService[api].name;	
			var service = registerService[api].methods;				// Get the all register Web service methods.
			var url = "/api/"+wsConfig.version+"/"+registerServiceName;	// Form the web service user based on module and API version.
			for (var servicename in service) {
				var name = servicename.toString();
				var method = service[servicename];
				if (name === "show") {   							//<webserver>/webservice/:id 	GET
			  		app.get(url+"/:id", validateType, method);
			 	} else if (name === "showall") { 					//<webserver>/webservice 		GET 
					app.get(url, validateType, method);
			  	} else if (name === "update") { 					//<webserver>/webservice/:id 	PUT
					app.put(url+"/:id", validateType, method);
			  	} else if (name === "create") {						//<webserver>/webservice 		POST
			  		app.post(url, validateType, method);
			  	} else if (name === "delete") {						//<webserver>/webservice/:id 	DELETE
			  		app.delete(url+"/:id", validateType, method);
			  	}
			}
		}
	} catch ( exe ) {
		console.log("Exeception occured while register webservices. \n Error :",exe);
	}
}

// Validate the https first, if it is enable, just create a https server alone.
if(wsConfig.https.enable) {

	//	Certificate, Private key and CA certificates to use for SSL. Default null.
	//	key:Private key to use for SSL. Default null.
	//	cert: Public x509 certificate to use. Default null.
	/**
	Sample formate
	const options = {
	  	key: fs.readFileSync(wsConfig.https.options.key),
	  	cert: fs.readFileSync(wsConfig.https.options.cert)
	};
	**/

	const options = {
	  	key: null,
	  	cert: null
	};

	// Listen the environment port number
	https.createServer(options, app).listen(wsConfig.https.port, function () {
	  	console.log('Example HTTPS app listening on port '+wsConfig.https.port+'!');
	});
} else {
	// Listen the environment port number
	if(wsConfig.http.enable) {
		http.createServer(app).listen(wsConfig.http.port, function () {
		  console.log('Example HTTP app listening on port '+wsConfig.http.port+'!');
		});
	}
}


// Exit or Kill node 
process.on('exit', function (){
  console.log('Goodbye!');
});