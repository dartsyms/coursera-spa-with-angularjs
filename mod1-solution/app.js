(function() {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.countCheck = function() {
      $scope.empty = true;
      $scope.tooMuch = false;
      if ($scope.items == undefined || $scope.items === '') {
        $scope.message = "Please, enter the data first!";
        return;
      }
      // empty elements are not counted as items
      var count = 0;
      $scope.items.split(',').forEach(function(element) {
        if (element.trim() != '') {
            count++;
        }
      });

      if (count > 3) {
        $scope.empty = false;
        $scope.tooMuch = true;
        $scope.message = "Too much!";
      } else if (count == 0) {
        $scope.empty = true;
        $scope.message = "An empty is not an item";
      } else {
        $scope.empty = false;
        $scope.message = "Enjoy!";
      }
    };
  }
})();
