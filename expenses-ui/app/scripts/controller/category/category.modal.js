(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('CategoryModalCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$state', 'CategoryService', 'Response', '$uibModalInstance', 'notiffy', 'category',
    function (CONSTANTS, $rootScope, $scope, $state, CategoryService, Response, $uibModalInstance, notiffy, category) {

      var vm = this;

      if (category) {
        vm.action = 'Modificar';
        vm.category = category;
        vm.category.update = true;
      } else {
        vm.action = 'Agregar';
        vm.category = {
          update: false,
          service: false,
          product: false
        };
      }

      vm.save = function () {
        $scope.categoryForm.$setDirty(true);
        if ($scope.categoryForm.$valid) {
          CategoryService.save(vm.category).then(function () {
            if (Response.response.status == 'success') {
              $uibModalInstance.close();
              notiffy.success('Categoría guardada exitosamente.');
            } else {
              notiffy.error('Error al guardar la categoría.');
            }
          });
        }
      };

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

    }]);

})();