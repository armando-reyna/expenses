(function () {
  'use strict';

  var loginModule = angular.module('expenses');

  loginModule.controller('LoginCtrl', [
    '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'UserService', 'Response', '$uibModal',
    function ($rootScope, $scope, $state, $sessionStorage, $timeout, UserService, Response, $uibModal) {

      var vm = this;

      var invalid = function(){
        vm.loginForm.user.$dirty = true;
        vm.loginForm.password.$dirty = true;
        return vm.loginForm.user.$invalid
          || vm.loginForm.password.$invalid;
      };

      var showChangePassword = function(){
        var modalInstance = $uibModal.open({
          templateUrl: 'views/user/password.modal.html',
          controller: 'PasswordModalCtrl',
          controllerAs: 'vm',
          resolve: {
            askOldPassword: function () {
              return false;
            },
            user: function () {
              return vm.token;
            }
          }
        });
        modalInstance.result.then(function () {
          $sessionStorage.userToken = vm.token;
          $state.go("index.main");
        }, function () {

        });
      };

      vm.loginAction = function(){
        if(!invalid()){
          $scope.$parent.main.loading = true;
          UserService.login(vm.user).then(function() {
            vm.token = Response.user;
            if(vm.token){
              if(vm.token.passwordChanged){
                $sessionStorage.reload = true;
                $sessionStorage.userToken = vm.token;
                $state.go("index.main");
              }else {
                showChangePassword();
              }
            }else{
              vm.loginError = true;
            }
            $scope.$parent.main.loading = false;
          });
        }
      };

    }]);

})();