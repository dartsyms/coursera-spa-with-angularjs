(function () {
    'use strict';

    angular.module('MenuApp')
      .controller('MenuCategoryController', MenuCategoryController);

    MenuCategoryController.$inject = ['catList'];
    function MenuCategoryController(catList) {
        this.catList = catList;
    };
})();
