(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('EquipmentCtrl', [
    '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'EquipmentService', 'Response', '$uibModal', 'confirmm', 'notiffy',
    function ($rootScope, $scope, $state, $sessionStorage, $timeout, EquipmentService, Response, $uibModal, confirmm, notiffy) {

      var vm = this;

      vm.stateData = $state.current.data;

      vm.inactiveEquipments = false;
      vm.updateEnabled = false;
      vm.deactivateEnabled = false;
      vm.activateEnabled = false;
      vm.allselected = false;

      function buildFileURL(equipments) {
        angular.forEach(equipments, function (equipment) {
          angular.forEach(equipment.equipmentFiles, function (file) {
            file.fileURL = 'equipmentId=' + equipment.id + '&fileName=' + file.name;
          });
        });
      }

      vm.refresh = function () {
        $scope.main.loading = true;
        var postObj = {
          type: { id: vm.stateData.type },
          active: !vm.inactiveEquipments
        };
        EquipmentService.get(postObj).then(function () {
          vm.equipmentList = Response.equipmentList;
          buildFileURL(vm.equipmentList);
          vm.allselected = false;
          $scope.main.loading = false;
        }, function () {
          notiffy.error('Error al obtener la lista de equipos.');
          $scope.main.loading = false;
        });
      };

      vm.refresh();

      vm.openEquipmentModal = function (update) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/equipment/equipment.modal.html',
          controller: 'EquipmentModalCtrl',
          controllerAs: 'vm',
          size: 'lg',
          resolve: {
            equipment: function () {
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
        angular.forEach(vm.equipmentList, function (equipment, index) {
          if (equipment.selected) {
            vm.selectedList.push(equipment);
          } else {
            vm.allselected = false;
          }
        });
        if (vm.selectedList.length > 0) {
          vm.activateEnabled = true;
          vm.deactivateEnabled = true;
        }
        angular.forEach(vm.selectedList, function (equipment, index) {
          if (equipment.active) {
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
        angular.forEach(vm.equipmentList, function (equipment, index) {
          equipment.selected = select;
        });
        vm.enableBts();
      };

      vm.activateEquipments = function () {
        var message = '';
        angular.forEach(vm.selectedList, function (equipment, index) {
          message += equipment.name;
          if (index < vm.selectedList.length - 2) {
            message += ', ';
          } else if (index < vm.selectedList.length - 1) {
            message += ' y ';
          }
        });
        if (vm.selectedList.length > 1) {
          message = 'Desea activar a los equipos ' + message + '?';
        } else {
          message = 'Desea activar a ' + message + '?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          EquipmentService.activate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.activated) {
              notiffy.success('Equipos activados.');
            } else {
              notiffy.error('Error al activar los equipos.');
            }
            vm.refresh();
          }, function () {
            notiffy.error('Error al activar los equipos.');
          });
        });
      };


      vm.deactivateEquipments = function () {
        var message = '';
        angular.forEach(vm.selectedList, function (equipment, index) {
          message += equipment.name;
          if (index < vm.selectedList.length - 2) {
            message += ', ';
          } else if (index < vm.selectedList.length - 1) {
            message += ' y ';
          }
        });
        if (vm.selectedList.length > 1) {
          message = 'Desea inactivar a los equipos ' + message + '?';
        } else {
          message = 'Desea inactivar a ' + message + '?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          EquipmentService.deactivate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.deactivated) {
              notiffy.success('Equipos inactivados.');
            } else {
              notiffy.error('Error al inactivar los equipos.');
            }
            vm.refresh();
          }, function () {
            notiffy.error('Error al inactivar los equipos.');
          });
        });
      };

      vm.cloud = function(equipment){
        Response.stateData = vm.stateData;
        Response.selectedCloud = equipment;
        $state.go('index.cloud');
      };

    }]);

})();