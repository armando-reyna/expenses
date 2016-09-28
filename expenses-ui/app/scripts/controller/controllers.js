(function() {
  'use strict';

  var module = angular.module('expenses');

  module.controller('MainCtrl', ['CONSTANTS', '$scope', '$state', '$sessionStorage', '$rootScope', '$window',
    '$uibModal', 'ProductService', 'Response', 'StorageService',
    function (CONSTANTS, $scope, $state, $sessionStorage, $rootScope, $window, $uibModal, ProductService, Response,
              StorageService){

      this.token = $sessionStorage.userToken;

      var vm = this;

      vm.logout = function(){
        delete $sessionStorage.userToken;
        delete $sessionStorage.notifications;
        $window.location.href = 'index.html';
      };

      vm.toggled = function(open) {
        if(!open){
          angular.forEach($rootScope.notifications, function(notification) {
            notification.unread = false;
          });
        }
      };

      vm.showChangePassword = function(){
        var modalInstance = $uibModal.open({
          templateUrl: 'views/user/password.modal.html',
          controller: 'PasswordModalCtrl',
          controllerAs: 'vm',
          resolve: {
            askOldPassword: function () {
              return true;
            },
            user: function () {
              return vm.token;
            }
          }
        });
        modalInstance.result.then(function () {

        }, function () {

        });
      };

      function buildFileURL(products) {
        angular.forEach(products, function (product) {
          angular.forEach(product.productFiles, function (file) {
            file.fileURL = 'productId=' + product.id + '&fileName=' + file.name;
          });
        });
      }

      vm.getBanners = function() {
        $scope.main.loading = true;
        StorageService.getBanners().then(function () {
          $scope.main.loading = false;
          var files = Response.banners;
          vm.images = [];
          angular.forEach(files, function (file, index) {
            vm.images.push({
              id: index,
              url: CONSTANTS.API_URI + 'files/banner/' + file.name
            });
          });
        }, function () {
          $scope.main.loading = false;
          notiffy.error('Error al obtener lista de archivos.');
        });
      };

      vm.refreshProducts = function () {
        $scope.main.loading = true;
        var postObj = {
          type: { id: CONSTANTS.PRODUCT_TYPE.PRODUCT },
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

      vm.refreshServices = function () {
        $scope.main.loading = true;
        var postObj = {
          type: { id: CONSTANTS.PRODUCT_TYPE.SERVICE },
          active: true
        };
        ProductService.get(postObj).then(function () {
          vm.serviceList = Response.productList;
          buildFileURL(vm.serviceList);
          vm.allselected = false;
          $scope.main.loading = false;
        }, function () {
          notiffy.error('Error al obtener la lista de usuarios.');
          $scope.main.loading = false;
        });
      };

      vm.getBanners();
      vm.refreshProducts();
      vm.refreshServices();

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
        $window.location.href = 'index.app.html#/index/cart';
      }

    }
  ]);

})();