(function () {
  'use strict';

  angular.module('menudata')
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  MenuDataService.$inject = ['$http', 'ApiBasePath'];
  function MenuDataService($http, ApiBasePath) {
    var svc = this;
    svc.getAllCategories = function () {
      return $http({
        method: 'GET',
        url: (ApiBasePath + '/categories.json')
      }).then(function (response) {
        return response.data;
      });
    };

    svc.getItemsForCategory = function (catShortName) {
      return $http({
        method: 'GET',
        url: (ApiBasePath + '/menu_items.json'),
        params: {
          category: catShortName
        }
      }).then(function (response) {
        return response.data;
      });
    };
  };

})();
