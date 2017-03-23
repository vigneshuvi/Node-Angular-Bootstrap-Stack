(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(email, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            
            var response;
            UserService.Authenticate({ email: email, password: password })
                .then(function (user) {
                    if (user !== null) {
                        response = user;
                    } else {
                        response = { status: false, message: 'Email or password is incorrect' };
                    }
                    callback(response);
                });


            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });

        }

        function SetCredentials(email, response) {
            
            if(response.authtoken) {
                // set default auth header for http requests
                $http.defaults.headers.common['x-access-token'] = response.authtoken;
                $http.defaults.headers.common['Authorization'] = response.authtoken;

                if(response.data) {
                    $rootScope.globals = {
                        currentUser: {
                            email: email,
                            user: response.data,
                            authdata: response.authtoken 
                        }
                    };
                }

                // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
                var cookieExp = new Date();
                cookieExp.setDate(cookieExp.getDate() + 7);
                $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
            }  
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }

})();