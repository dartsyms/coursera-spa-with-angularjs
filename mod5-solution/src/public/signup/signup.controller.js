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
            $ctrl.data.firstName = $ctrl.firstLetterToUpperCase($ctrl.data.firstName);
            $ctrl.data.lastName = $ctrl.firstLetterToUpperCase($ctrl.data.surName);
            $ctrl.checkData();
        }

        $ctrl.checkData = function () {
            $ctrl.isChecked = false;
            $ctrl.isSignedUp = true;
            var dish = $ctrl.data.dishChoice;
            if (!dish) {
                service.setSignUp($ctrl.data);
                $ctrl.data = {};
                $ctrl.data.message = "Saved.";
                $scope.signupForm.$setPristine();
                $ctrl.isChecked = true;

                return;
            }

            MenuService.dishExists(dish).then(function (result) {
                if (result) {
                    $timeout(function () {
                        service.setSignUp($ctrl.data);
                        $ctrl.data = {};
                        $ctrl.data.message = "Saved.";
                        $scope.signupForm.$setPristine();
                        $ctrl.isChecked = true;
                    });
                } else {
                    $ctrl.data.message = "There is no such choice.";
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

        $ctrl.firstLetterToUpperCase = function (data) {
            if (data) {
                var tmp = data.toLowerCase();
                tmp = tmp.substring(0, 1).toUpperCase() + tmp.substring(1);
                return tmp;
            } else {
                return data;
            }
        }
    }
})();
