(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('ProductCtrl', [
    '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'ProductService', 'Response', '$uibModal', 'confirmm', 'notiffy',
    function ($rootScope, $scope, $state, $sessionStorage, $timeout, ProductService, Response, $uibModal, confirmm, notiffy) {

      var vm = this;

      vm.stateData = $state.current.data;

      vm.inactiveProducts = false;
      vm.updateEnabled = false;
      vm.deactivateEnabled = false;
      vm.activateEnabled = false;
      vm.allselected = false;

      vm.refresh = function () {
        $scope.main.loading = true;
        var postObj = {
          type: { id: vm.stateData.type },
          active: !vm.inactiveProducts
        };
        ProductService.get(postObj).then(function () {
          vm.productList = Response.productList;
          vm.allselected = false;
          $scope.main.loading = false;
        }, function () {
          notiffy.error('Error al obtener la lista de usuarios.');
          $scope.main.loading = false;
        });
      };

      vm.refresh();

      vm.openProductModal = function (update) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/product/product.modal.html',
          controller: 'ProductModalCtrl',
          controllerAs: 'vm',
          size: 'lg',
          resolve: {
            product: function () {
              if (update) {
                return vm.selectedList[0];
              } else {
                return undefined;
              }
            },
            stateData: function () {
              return vm.stateData;
            }
          }
        });
        modalInstance.result.then(function (selectedItem) {
          vm.refresh();
        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
        });
      };

      vm.enableBts = function () {
        vm.selectedList = [];
        vm.activateEnabled = false;
        vm.deactivateEnabled = false;
        vm.updateEnabled = false;
        vm.allselected = true;
        angular.forEach(vm.productList, function (product, index) {
          if (product.selected) {
            vm.selectedList.push(product);
          } else {
            vm.allselected = false;
          }
        });
        if (vm.selectedList.length > 0) {
          vm.activateEnabled = true;
          vm.deactivateEnabled = true;
        }
        angular.forEach(vm.selectedList, function (product, index) {
          if (product.active) {
            vm.activateEnabled = false;
          } else {
            vm.deactivateEnabled = false;
          }
        });
        if (vm.selectedList.length == 1) {
          vm.updateEnabled = true;
        }
      };

      vm.selectAll = function () {
        var select = !vm.allselected;
        angular.forEach(vm.productList, function (product, index) {
          product.selected = select;
        });
        vm.enableBts();
      };

      vm.activateProducts = function () {
        var message = '';
        angular.forEach(vm.selectedList, function (product, index) {
          message += product.name;
          if (index < vm.selectedList.length - 2) {
            message += ', ';
          } else if (index < vm.selectedList.length - 1) {
            message += ' y ';
          }
        });
        if (vm.selectedList.length > 1) {
          message = 'Desea activar a los usuarios ' + message + '?';
        } else {
          message = 'Desea activar a ' + message + '?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          ProductService.activate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.activated) {
              notiffy.success('Usuarios activados.');
            } else {
              notiffy.error('Error al activar los usuarios.');
            }
            vm.refresh();
          }, function () {
            notiffy.error('Error al activar los usuarios.');
          });
        });
      };


      vm.deactivateProducts = function () {
        var message = '';
        angular.forEach(vm.selectedList, function (product, index) {
          message += product.name;
          if (index < vm.selectedList.length - 2) {
            message += ', ';
          } else if (index < vm.selectedList.length - 1) {
            message += ' y ';
          }
        });
        if (vm.selectedList.length > 1) {
          message = 'Desea inactivar a los usuarios ' + message + '?';
        } else {
          message = 'Desea inactivar a ' + message + '?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          ProductService.deactivate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.deactivated) {
              notiffy.success('Usuarios inactivados.');
            } else {
              notiffy.error('Error al inactivar los usuarios.');
            }
            vm.refresh();
          }, function () {
            notiffy.error('Error al inactivar los usuarios.');
          });
        });
      };

      vm.cloud = function(product){
        Response.stateData = vm.stateData;
        Response.selectedCloud = product;
        $state.go('index.cloud');
      };

    }]);

})();