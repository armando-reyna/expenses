(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('UserModalCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$state', 'UserService', 'Response', '$uibModalInstance', 'notiffy', 'user',
    function (CONSTANTS, $rootScope, $scope, $state, UserService, Response, $uibModalInstance, notiffy, user) {

      var vm = this;

      if (user) {
        vm.action = 'Modificar';
        vm.user = user;
        vm.user.update = true;
      } else {
        vm.action = 'Agregar';
        vm.user = {
          update: false
        };
      }

      vm.loadRoles = function () {
        UserService.getAllUserRoles().then(function () {
          if (!Response.roles) {
            notiffy.error('Error al cargar lista de roles.');
          }
          vm.userRoles = Response.roles;
          if (vm.user.update) {
            vm.setRole();
          }

        });
      };

      vm.setRole = function () {
        angular.forEach(vm.userRoles, function (user, index) {
          if (user.name == vm.user.role.name) {
            vm.user.role = vm.userRoles[index];
          }
        });
      };

      vm.userRoles;
      vm.loadRoles();

      vm.save = function () {
        $scope.userForm.$setDirty(true);
        if ($scope.userForm.$valid) {
          UserService.save(vm.user).then(function () {
            $scope.userForm.user.$setValidity("duplicated", true);
            if (Response.saved.status == 'success') {
              $uibModalInstance.close();
              notiffy.success('Usuario guardado exitosamente.');
              notiffy.success('Se ha enviado un correo a '+vm.user.user+' con la información de acceso.');
            } else if (Response.saved.status == 'failure') {
              if(Response.saved.message == 'duplicated'){
                $scope.userForm.user.$setValidity("duplicated", false);
              }else {
                notiffy.error(Response.saved.message);
              }
            } else {
              notiffy.error('Error al guardar el usuario.');
            }
          });
        }
      };

      // $scope.$watch('vm.user.repeatPassword', function (newVal, oldVal) {
      //   if (vm.user.password == vm.user.repeatPassword) {
      //     $scope.userForm.repeatPassword.$setValidity("notEqual", true);
      //   } else {
      //     $scope.userForm.repeatPassword.$setValidity("notEqual", false);
      //   }
      // });

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

    }]);

})();