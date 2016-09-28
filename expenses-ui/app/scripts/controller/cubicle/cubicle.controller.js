(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('CubicleCtrl', [
    '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'CubicleService', 'CONSTANTS', 'Response', '$uibModal', 'confirmm', 'notiffy', 'StorageService',
    function ($rootScope, $scope, $state, $sessionStorage, $timeout, CubicleService, CONSTANTS, Response, $uibModal, confirmm, notiffy, StorageService) {
      var vm = this;

      vm.inactiveCubicles = false;
      vm.updateEnabled = false;
      vm.deactivateEnabled = false;
      vm.activateEnabled = false;
      vm.allselected = false;

      vm.stateData = $state.current.data;

      vm.refresh = function () {
        $scope.main.loading = true;
        var inactive = {
          inactive: vm.inactiveCubicles
        };
        CubicleService.get(inactive).then(function () {
          vm.cubicleList = Response.cubicleList;
          vm.allselected = false;
          $scope.main.loading = false;
        }, function () {
          notiffy.error('Error al obtener la lista de cubículos.');
          $scope.main.loading = false;
        });
      };

      vm.refresh();

      vm.enableBts = function () {
        vm.selectedList = [];
        vm.activateEnabled = false;
        vm.deactivateEnabled = false;
        vm.updateEnabled = false;
        vm.allselected = true;
        angular.forEach(vm.cubicleList, function (cubicle, index) {
          if (cubicle.selected) {
            vm.selectedList.push(cubicle);
          } else {
            vm.allselected = false;
          }
        });
        if (vm.selectedList.length > 0) {
          vm.activateEnabled = true;
          vm.deactivateEnabled = true;
        }
        angular.forEach(vm.selectedList, function (cubicle, index) {
          if (cubicle.active) {
            vm.activateEnabled = false;
          } else {
            vm.deactivateEnabled = false;
          }
        });
        if (vm.selectedList.length == 1) {
          vm.updateEnabled = true;
        }

        vm.isStatusEditMode = false;
        if (vm.cubicle != undefined) {
          $scope.statusForm.$setPristine();
        }
      };

      vm.selectAll = function () {
        var select = !vm.allselected;
        angular.forEach(vm.cubicleList, function (cubicle, index) {
          cubicle.selected = select;
        });
        vm.enableBts();
      };

      vm.openCubicleModal = function (update) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/cubicle/cubicle.modal.html',
          controller: 'CubicleModalCtrl',
          controllerAs: 'vm',
          resolve: {
            cubicle: function () {
              if (update) {
                return vm.selectedList[0];
              } else {
                return undefined;
              }
            }
          }
        });
        modalInstance.result.then(function (selectedItem) {
          vm.refresh();
        }, function () {
        });
      };

      vm.cubiclesActivate = function () {
        var message = '';
        angular.forEach(vm.selectedList, function (cubicle, index) {
          message += cubicle.name;
          if (index < vm.selectedList.length - 2) {
            message += ', ';
          } else if (index < vm.selectedList.length - 1) {
            message += ' y ';
          }
        });
        if (vm.selectedList.length > 1) {
          message = 'Desea activar los cubículos ' + message + '?';
        } else {
          message = 'Desea activar ' + message + '?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          CubicleService.activate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.activated) {
              if (vm.selectedList.lenght > 1) {
            	  notiffy.success('Cubículos activados.');
              } else {
            	  notiffy.success('Cubículo activado.');
              }
            } else {
              notiffy.error('Error al activar cubículo(s).');
            }
            vm.refresh();
          }, function () {
            notiffy.error('Error al activar cubículo(s).');
          });
        });
      };

      vm.cubiclesDeactivate = function () {
        var message = '';
        angular.forEach(vm.selectedList, function (cubicle, index) {
          message += cubicle.name;
          if (index < vm.selectedList.length - 2) {
            message += ', ';
          } else if (index < vm.selectedList.length - 1) {
            message += ' y ';
          }
        });
        if (vm.selectedList.length > 1) {
          message = 'Desea inactivar los cubículos ' + message + '?';
        } else {
          message = 'Desea inactivar a ' + message + '?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          CubicleService.deactivate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.deactivated) {
              if (vm.selectedList.length > 1) {
            	  notiffy.success('Cubículos inactivados.');  
              } else {
            	  notiffy.success('Cubículo inactivado.');
              }
            } else {
              notiffy.error('Error al inactivar cubículo(s).');
            }
            vm.refresh();
          }, function () {
            notiffy.error('Error al inactivar cubículo(s).');
          });
        });
      };

      vm.cloud = function(equipment){
        Response.stateData = vm.stateData;
        Response.selectedCloud = equipment;
        $state.go('index.cloud');
      };

    }
  ]);
})();