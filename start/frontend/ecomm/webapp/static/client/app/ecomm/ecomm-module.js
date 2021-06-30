(function () {

    var module = angular.module('qiqEcomm', ['ngRoute']);

    module.config(['$routeProvider', config]);


    function config($routeProvider) {
        $routeProvider.when('/ecomm/:name', {
            controller: 'EcommController',
            controllerAs: 'qc',
            templateUrl: 'app/ecomm/ecomm-template.html'
        });
    }


})();