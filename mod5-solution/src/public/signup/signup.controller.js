(function () {
    'use strict';

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$timeout','$scope', 'MenuService', 'SignUpService'];
    function SignUpController($timeout, $scope, MenuService, SignUpService) {
        var $ctrl = this;
        var service = SignUpService;
        $ctrl.data = {};
        $ctrl.isChecked = false;

        $ctrl.signUp = function () {
            $ctrl.data.firstName = $ctrl.capitalizeWord($ctrl.data.firstName);
            $ctrl.data.surName = $ctrl.capitalizeWord($ctrl.data.surName);
            $ctrl.checkInput();
        }

        $ctrl.checkInput = function () {
            $ctrl.isChecked = false;
            $ctrl.isSignedUp = true;
            var dish = $ctrl.data.dishChoice;
            if (!dish) {
                service.setSignUp($ctrl.data);
                $ctrl.data = {};
                $ctrl.data.message = "Info Saved.";
                $scope.signupForm.$setPristine();
                $ctrl.isChecked = true;
                return;
            }

            MenuService.dishExists(dish).then(function (result) {
                if (result) {
                    $timeout(function () {
                        service.setSignUp($ctrl.data);
                        $ctrl.data = {};
                        $ctrl.data.message = "Info Saved.";
                        $scope.signupForm.$setPristine();
                        $ctrl.isChecked = true;
                    });
                } else {
                    $ctrl.data.message = "There is no such choice in our menu.";
                    $ctrl.isSignedUp = false;
                    $ctrl.isChecked = true;
                }
            })
        }

        $scope.$watch('ctrl.data.email', function () {
            if ($scope.ctrl.data.email) {
                $scope.ctrl.data.email = $scope.ctrl.data.email.toLowerCase();
            }
        });

        $scope.$watch('ctrl.data.dishChoice', function () {
            if ($scope.ctrl.data.dishChoice) {
                $scope.ctrl.data.dishChoice = $scope.ctrl.data.dishChoice.toUpperCase();
            }
        });

        $ctrl.capitalizeWord = function (word) {
            return word.toLowerCase().substring(0, 1).toUpperCase() + word.toLowerCase().substring(1);
        }
    }
})();
