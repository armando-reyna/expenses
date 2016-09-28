(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('StoreCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'ProductService', 'Response',
    '$uibModal', 'confirmm', 'notiffy',
    function (CONSTANTS, $rootScope, $scope, $state, $sessionStorage, $timeout, ProductService, Response, $uibModal,
              confirmm, notiffy) {

      var vm = this;

      vm.stateData = $state.current.data;

      function buildFileURL(products) {
        angular.forEach(products, function (product) {
          angular.forEach(product.productFiles, function (file) {
            file.fileURL = 'productId=' + product.id + '&fileName=' + file.name;
          });
        });
      }

      vm.refresh = function () {
        $scope.main.loading = true;
        var postObj = {
          type: { id: vm.stateData.type },
          active: true
        };
        ProductService.get(postObj).then(function () {
          vm.productList = Response.productList;
          buildFileURL(vm.productList);
          vm.allselected = false;
          $scope.main.loading = false;
        }, function () {
          notiffy.error('Error al obtener la lista de usuarios.');
          $scope.main.loading = false;
        });
      };

      vm.refresh();

      vm.addToCart = function(product){

        var newProduct = angular.copy(product);

        if($sessionStorage.cart){

          var newItem = true;
          angular.forEach($sessionStorage.cart, function (cartProduct) {
            if(newProduct.id == cartProduct.id){
              newItem = false;
              cartProduct.items++;
              cartProduct.total = cartProduct.price * cartProduct.items;
            }
          });

          if(newItem){
            newProduct.items = 1;
            newProduct.total = newProduct.price;
            $sessionStorage.cart.push(newProduct);
          }

        }else {
          newProduct.items = 1;
          newProduct.total = newProduct.price;
          $sessionStorage.cart = [newProduct];
        }
        $state.go('index.cart');
      }

    }]);

})();