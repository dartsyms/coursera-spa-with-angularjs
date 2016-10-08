(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'src/templates/home.template.html'
      })
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/templates/categories.template.html',
        controller: 'MenuCategoryController as ctrl',
        resolve: {
            catList: ['MenuDataService', function (MenuDataService) {
                return MenuDataService.getAllCategories();
            }]
        }
      })
      .state('items', {
        url: '/items/{shortName}',
        templateUrl: 'src/templates/items.template.html',
        controller: 'ItemsController as ctrl',
        resolve: {
            itemsList: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                return  MenuDataService.getItemsForCategory($stateParams.shortName);
            }]
        }
      });
  }
})()
