(function () {
    'use strict';

    angular.module('public')
        .controller('InfoController', InfoController);

    InfoController.$inject = ['SignUpService'];
    function InfoController(SignUpService) {
        var $ctrl = this;
        var service = SignUpService;
        $ctrl.data = {};
        $ctrl.isSignedUp = function () {
            $ctrl.data = service.getSignUp();
            return service.isSignedUp();
        }
    }
})();
