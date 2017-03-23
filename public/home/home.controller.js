(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.userCount = 0;
        vm.deleteUser = deleteUser;



        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            if ($rootScope.globals.currentUser) {
                vm.user = $rootScope.globals.currentUser.user;
            }
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    if (users !== null) {
                        vm.allUsers = users.data;
                        vm.userCount = users.data.length;
                    }
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();