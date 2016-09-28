(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('ProductModalCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$state', '$timeout', 'ProductService', 'CategoryService', 'Response', '$uibModalInstance',
    'notiffy', 'product', 'stateData',
    function (CONSTANTS, $rootScope, $scope, $state, $timeout, ProductService, CategoryService, Response, $uibModalInstance,
              notiffy, product, stateData) {

      var vm = this;

      if (product) {
        vm.action = 'Modificar';
        vm.product = product;
        vm.product.update = true;
      } else {
        vm.action = 'Agregar';
        vm.product = {
          update: false
        };
      }

      vm.stateData = stateData;

      vm.loadCategories = function () {
        vm.loading = true;
        var postObj = {};
        if(vm.stateData.type == CONSTANTS.PRODUCT_TYPE.PRODUCT){
          postObj.product = true;
          postObj.service = false;
        } else {
          postObj.product = false;
          postObj.service = true;
        }
        CategoryService.getByType(postObj).then(function () {
          vm.loading = false;
          vm.categoryList = Response.categoryList;
        }, function(){
          vm.loading = false;
        });
      };

      vm.loadCategories();

      vm.save = function () {
        $scope.productForm.$setDirty(true);
        if ($scope.productForm.$valid) {
          vm.product.productType = vm.stateData.type;
          ProductService.save(vm.product).then(function () {
            if (Response.response.status == 'success') {
              $uibModalInstance.close();
              notiffy.success(vm.stateData.label + ' guardado exitosamente.');
            } else {
              notiffy.error('Error al guardar el ' + vm.stateData.label + '.');
            }
          });
        }
      };

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

    }]);

})();