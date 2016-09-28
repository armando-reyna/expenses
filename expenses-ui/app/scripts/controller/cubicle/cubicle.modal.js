(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('CubicleModalCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$state', 'Response', 'CubicleService', 'EquipmentService', '$uibModalInstance',
    'notiffy', 'cubicle',
    function (CONSTANTS, $rootScope, $scope, $state, Response, CubicleService, EquipmentService, $uibModalInstance,
              notiffy, cubicle) {

      var vm = this;

      if (cubicle != undefined) {
        vm.action = 'Modificar';
        vm.cubicle = cubicle;
        vm.cubicle.update = true;
      } else {
        vm.action = 'Agregar';
      }

      vm.loadEquipments = function () {
        vm.loading = true;
        var postEquipment = vm.cubicle && vm.cubicle.equipment ? vm.cubicle.equipment : undefined;
        EquipmentService.getAvailable(postEquipment).then(function () {
          vm.loading = false;
          vm.equipmentList = Response.equipmentList;
        }, function(){
          vm.loading = false;
        });
      };

      vm.loadEquipments();

      vm.save = function () {
        $scope.cubicleForm.$setDirty(true);
        if ($scope.cubicleForm.$valid) {
          CubicleService.save(vm.cubicle).then(function () {
            if (Response.response.status == 'success') {
              $uibModalInstance.close();
              notiffy.success('Cubículo guardado exitosamente.');
            } else {
              notiffy.error('Error al guardar el cubículo.');
            }
          });
        }
      };

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

    }]);

})();