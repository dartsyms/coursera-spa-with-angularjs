(function() {
  'use strict';
  angular.module('ShoppingListCheckOff', [])
      .controller('ToBuyShoppingController', ToBuyShoppingController)
      .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyShoppingController(ShoppingListCheckOffService) {
      this.items = ShoppingListCheckOffService.getToBuyList();
      this.isEmpty = ShoppingListCheckOffService.isToBuyListEmpty;
      this.checkOut = ShoppingListCheckOffService.checkOut;
    }

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
      this.items = ShoppingListCheckOffService.getAlreadyBoughtList();
      this.isEmpty = ShoppingListCheckOffService.isAlreadyBoughtListEmpty;
    }

    function ShoppingListCheckOffService() {
      var service = this;
      service.toBuyList = [
          { name: "Scotch Whiskey", quantity: "2 bottle" },
          { name: "Beer", quantity: "20 bottles" },
          { name: "Ground Beef", quantity: "7 pounds" },
          { name: "Eggs", quantity: "3 dozen" },
          { name: "Farmland Bacon", quantity: "5 packs" },
          { name: "Canned Salmon", quantity: "300 g"},
          { name: "BY Sharp Cheddar", quantity: "500 g" },
          { name: "Parmesan", quantity: "300 g" },
          { name: "Coca-Cola", quantity: "20 bottles" },
          { name: "Beans", quantity: "3 cans" }
      ];
      service.alreadyBoughtList = [];

      service.checkOut = function (itemIndex) {
        var boughtItem = service.toBuyList.splice(itemIndex, 1)[0];
        service.alreadyBoughtList.push(boughtItem);
      };

      service.getToBuyList = function () {
        return service.toBuyList;
      };

      service.getAlreadyBoughtList = function () {
        return service.alreadyBoughtList;
      };

      service.isToBuyListEmpty = function () {
        return service.toBuyList.length == 0;
      };

      service.isAlreadyBoughtListEmpty = function () {
        return service.alreadyBoughtList.length == 0;
      };
    }
})();
