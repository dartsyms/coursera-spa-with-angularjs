(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['items'];
  function ItemsController(items) {
      var ctrl = this;
      ctrl.items = items.menu_items;
      ctrl.categoryName = items.category.name;
  };

})();
