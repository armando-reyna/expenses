(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('CartCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'BuyService', 'Response',
    '$uibModal', 'confirmm', 'notiffy',
    function (CONSTANTS, $rootScope, $scope, $state, $sessionStorage, $timeout, BuyService, Response, $uibModal,
              confirmm, notiffy) {

      var vm = this;

      vm.client = $sessionStorage.userToken;

      vm.cart = $sessionStorage.cart ? $sessionStorage.cart : [];

      vm.remove = function(product){
        angular.forEach($sessionStorage.cart, function (cartProduct, index) {
          if(product.id == cartProduct.id){
            vm.cart.splice(index, 1);
          }
        });
      };

      vm.calculateTotal = function(){
        vm.total = 0;
        angular.forEach(vm.cart, function (cartProduct, index) {
          vm.total += cartProduct.total;
        });
      };

      vm.calculateTotal();

      vm.performBuy = function(){
        $scope.main.loading = true;
        var postObj = {
          client: vm.client.person,
          products: vm.cart
        };
        console.log(postObj);
        BuyService.save(postObj).then(function () {
          $scope.main.loading = false;
          confirmm.success('Su compra se ha generado exitosamente, Gracias por comprar con nosotros!');
        }, function () {
          notiffy.error('Error al finalizar la compra.');
          $scope.main.loading = false;
        });
      }

    }]);

})();