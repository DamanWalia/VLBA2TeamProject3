(function () {

    var module = angular.module('qiqAuth');

    module.component('qiqLogin', {
        controller: LoginComponentController,
        templateUrl: 'app/auth/qiq-login-template.html'
    });

    LoginComponentController.$inject = ['$location', 'authFactory']

    function LoginComponentController($location, authFactory) {
        var lc = this;
        lc.login = login;
        lc.logout = logout;
        lc.user = authFactory.user
        init();

        function init() {
            lc.isLoggedIn = !!lc.user;
            lc.email = lc.user.email;
        }

        function login() {
            authFactory.login(lc.email, lc.password)
                .then(function () {
                    lc.errorMessage = '';
                    $location.path('/ecomm/gcp');
                }).catch(function (err) {
                    lc.errorMessage = 'Login failed';
                });
        }


        function logout() {
        }
    }
})();