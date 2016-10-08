(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['itemsList'];
  function ItemsController(itemsList) {
      var ctrl = this;
      ctrl.items = itemsList.menu_items;
      ctrl.categoryName = itemsList.category.name;
  };

})();
