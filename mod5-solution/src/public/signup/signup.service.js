(function () {
    'use strict';

    angular.module('public')
        .service('SignUpService', SignUpService);

    SignUpService.$inject = ['MenuService'];
    function SignUpService(MenuService) {
        var service = this;
        var signUp = {
            firstName: '',
            surName: '',
            email: '',
            phone: {
                number: ''
            },
            dishChoice: '',
            dish: {}
        };

        service.setSignUp = function (data) {
            signUp = data;
            MenuService.getDish(data.dishChoice).then(function (response) {
                signUp.dish = response.data;
            });
        }

        service.getSignUp = function () {
            return signUp;
        }

        service.isSignedUp = function () {
            return !!signUp.email;
        }
    }
})();
