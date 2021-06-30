(function () {

    var module = angular.module('qiqAuth');

    module.factory('authFactory', authFactory);


    authFactory.$inject = ['$q']

    function authFactory($q) {

        var user = {
            isLoggedIn: true,
            email: 'app.dev.student@example.org',
            uid: -1
        };


        return {
            register: register,
            login: login, 
            logout: logout,
            user: user,
            authorize: authorize
        };

        function register(email, password) {
        }

        function authorize() {
            return user.isLoggedIn ? $q.resolve(user) : $q.reject(user);
        }

        function login(email, password) {
        }

        function logout() {
        }
    }


})();