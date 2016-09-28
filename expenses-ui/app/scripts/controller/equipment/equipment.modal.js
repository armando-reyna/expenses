(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('EquipmentModalCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$state', '$timeout', 'EquipmentService', 'CategoryService', 'Response', '$uibModalInstance',
    'notiffy', 'equipment', 'stateData',
    function (CONSTANTS, $rootScope, $scope, $state, $timeout, EquipmentService, CategoryService, Response, $uibModalInstance,
              notiffy, equipment, stateData) {

      var vm = this;

      if (equipment) {
        vm.action = 'Modificar';
        vm.equipment = equipment;
        vm.equipment.update = true;
      } else {
        vm.action = 'Agregar';
        vm.equipment = {
          update: false
        };
      }

      vm.stateData = stateData;

      vm.save = function () {
        $scope.equipmentForm.$setDirty(true);
        if ($scope.equipmentForm.$valid) {
          EquipmentService.save(vm.equipment).then(function () {
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