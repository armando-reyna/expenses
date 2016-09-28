(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('DiagnosticCtrl', [
    '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'DiagnosticService', 'Response', '$uibModal', 'confirmm', 'notiffy',
    function ($rootScope, $scope, $state, $sessionStorage, $timeout, DiagnosticService, Response, $uibModal, confirmm, notiffy) {

      var vm = this;

      vm.client = Response.selectedPerson;
      vm.user = $sessionStorage.userToken;

      if(!vm.client || !vm.user){
        $state.go('index.client');
      }

      vm.refresh = function () {
        $scope.main.loading = true;
        DiagnosticService.get(vm.client).then(function () {
          vm.diagnosticList = Response.diagnostics;
          vm.allselected = false;
          $scope.main.loading = false;
        }, function () {
          notiffy.error('Error al obtener el historial de diagnósticos.');
          $scope.main.loading = false;
        });
      };

      vm.refresh();

      vm.openDiagnosticModal = function () {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/diagnostic/diagnostic.modal.html',
          controller: 'DiagnosticModalCtrl',
          controllerAs: 'vm',
          size: 'lg',
          resolve: {
            client: function () {
              return vm.client;
            },
            employee: function () {
              return vm.user.person;
            }
          }
        });
        modalInstance.result.then(function (selectedItem) {
          vm.refresh();
        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
        });
      };

      vm.deactivateDiagnostics = function (diagnostic) {
        var message = 'Desea inactivar el diagnóstico?';
        confirmm.confirm(message, function () {
          $scope.main.loading = true;
          DiagnosticService.deactivate([diagnostic]).then(function () {
            $scope.main.loading = false;
            if (Response.deactivated) {
              notiffy.success('Diagnóstico inactivado.');
            } else {
              notiffy.error('Error al inactivar el diagnóstico.');
            }
            vm.refresh();
          }, function () {
            notiffy.error('Error al inactivar el diagnóstico.');
          });
        });
      };

    }]);

})();