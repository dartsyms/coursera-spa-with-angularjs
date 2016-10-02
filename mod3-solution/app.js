(function() {
  'use strict';

  angular.module('MenuChoiceApp', [])
    .controller('MenuChoiceController', MenuChoiceController)
    .service('MenuService', MenuService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");

    MenuChoiceController.$inject = ['MenuService'];
    function MenuChoiceController(MenuService) {
      var menu = this;
      menu.searchTerm = '';
      menu.isError = false;
      menu.found = [];

      menu.getItems = function() {
        var promise = MenuService.getMatchedItems(menu.searchTerm);
        promise.then(function(response) {
          menu.isError = (response.length !== 0) ? false : true;
          menu.found = response;
        }).catch(function(error) {
          menu.isError = true;
        });
      };

      menu.removeItem = function(index) {
        menu.found.splice(index, 1);
        menu.isError = (menu.found.length === 0) ? true : false;
      };

      menu.isEmpty = function () {
        return menu.found.length == 0;
      }
    }

    MenuService.$inject = ['$http', 'ApiBasePath'];
    function MenuService($http, ApiBasePath) {
      var service = this;
      service.getMatchedItems = function(term) {
        var searchTerm = (term || '').trim().toLowerCase();
        return $http({ method: "GET", url: (ApiBasePath)})
                .then(function (response) {
                  var menu = response.data.menu_items;
                  var found = [];
                  if (searchTerm.length !== 0) {
                    menu.forEach(function(item) {
                      if (item.description.toLowerCase().indexOf(searchTerm) >= 0) {
                          found.push(item);
                          console.log('description:', '"' + item.description + '"');
                      }
                    });
                  }
                  return found;
              });
      };
    }

    function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'found.template.html',
        scope: {
          items: '<',
          onRemove: '&',
        },
        controller: MenuChoiceController,
        controllerAs: 'found',
        bindToController: true,
      };

      return ddo;
    }

})();
