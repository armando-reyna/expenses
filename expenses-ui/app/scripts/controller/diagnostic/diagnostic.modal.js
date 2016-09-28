(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('DiagnosticModalCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$state', '$timeout', 'DiagnosticService', 'AddressService', 'Response',
    '$uibModalInstance', 'notiffy', 'client', 'employee',
    function (CONSTANTS, $rootScope, $scope, $state, $timeout, DiagnosticService, AddressService, Response,
              $uibModalInstance, notiffy, client, employee) {

      var vm = this;

      vm.activeTab = 0;
      vm.isFinalStep = false;

      vm.diagnostic = {
        client: client,
        employee: employee
      };

      vm.tabs = [
        {enable: true},
        {enable: false},
        {enable: false}
      ];

      var validateStep = function(currentIndex, newIndex, callback){
        vm.enableNext = true;
        //Force all form validation
        if(newIndex > currentIndex){
          angular.forEach($scope.diagnosticForm, function(val, key){
            if(typeof val === 'object' && val.hasOwnProperty('$modelValue')){
              val.$setDirty(true);
              vm.enableNext = vm.enableNext && val.$valid;
            }
          });
        }
        callback();
      };

      var checkFinalStep = function(){
        vm.isFinalStep = false;
        if(vm.activeTab == 2){
          vm.isFinalStep = true;
        }
      };

      vm.selectTab = function($event, currentIndex, newIndex){
        if($event){
          validateStep(currentIndex, newIndex, function(){
            vm.tabs[newIndex].enable = true;
            if(!vm.enableNext){
              $timeout(function(){
                vm.tabs[newIndex].enable = false;
                vm.activeTab = currentIndex;
              }, 0);
            }
            $timeout(function(){
              checkFinalStep();
            }, 0);
          });
        }
      };

      vm.nextStep = function(){
        validateStep(vm.activeTab, vm.activeTab+1, function(){
          if (vm.enableNext) {
            vm.tabs[vm.activeTab+1].enable = true;
            vm.activeTab++;
          }
          checkFinalStep();
        });
      };

      vm.prevStep = function(){
        vm.activeTab--;
        checkFinalStep();
      };

      vm.save = function () {
        $scope.diagnosticForm.$setDirty(true);
        if ($scope.diagnosticForm.$valid) {
          DiagnosticService.save(vm.diagnostic).then(function () {
            if (Response.response.status == 'success') {
              $uibModalInstance.close();
              notiffy.success('Diagnóstico guardado exitosamente.');
            } else {
              notiffy.error('Error al guardar el diagnóstico.');
            }
          });
        }
      };

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

    }]);

})();