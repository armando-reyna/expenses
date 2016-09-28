(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('PersonModalCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$state', '$timeout', 'PersonService', 'AddressService', 'Response', '$uibModalInstance',
    'notiffy', 'person', 'stateData',
    function (CONSTANTS, $rootScope, $scope, $state, $timeout, PersonService, AddressService, Response, $uibModalInstance,
              notiffy, person, stateData) {

      var vm = this;

      if (person) {
        vm.action = 'Modificar';
        vm.person = person;
        vm.person.update = true;
      } else {
        vm.action = 'Agregar';
        vm.person = {
          update: false
        };
      }

      if(CONSTANTS.DEV && !vm.person.update){
        vm.person.name = 'Armando Reyna';
        vm.person.rfc = 'REAA880521UI5';
        vm.person.tel = '63818875';
        vm.person.cel = '5525608971';
        vm.person.email = 'armando.i.reyna@gmail.com';
        vm.person.contactName = 'Armando Reyna';
        vm.person.contactEmergency = 'Mariana López';
        vm.person.telEmergency = '63818875';
        vm.person.firstTime = new Date();
        vm.person.address = {
          calle: 'Porto Alegre',
          noExt: '279',
          noInt: '202',
          estado: {
            id: 9,
            name: 'Distrito Federal'
          },
          colonia: 'San Andrés Tetepilco',
          delegacion: 'Iztapalapa',
          cp: '09440'
        };
      }

      vm.stateData = stateData;

      vm.loadAdresses = function () {
        vm.loading = true;
        AddressService.getEstados().then(function () {
          vm.loading = false;
          vm.estados = Response.estados;
        }, function(){
          vm.loading = false;
        });
      };

      vm.loadAdresses();

      vm.loadEmployeeTypes = function () {
        vm.loading = true;
        PersonService.getEmployeeTypes().then(function () {
          vm.loading = false;
          vm.employeeTypes = Response.employeeTypes;
        }, function(){
          vm.loading = false;
        });
      };

      if(vm.stateData.personType == CONSTANTS.PERSON_TYPE.CLIENT){
        vm.tabs = [
          {enable: true},
          {enable: false}
        ];
      } else if(vm.stateData.personType == CONSTANTS.PERSON_TYPE.EMPLOYEE){
        vm.loadEmployeeTypes();
        if(CONSTANTS.DEV && !vm.person.update){
          vm.person.employee = {
            ccto: 'ccto',
            puesto: 'Desarrollador Software',
            fechaIngreso: new Date(),
            horario: '9 a 6',
            salario: '50000',
            otros: 'otros',
            turno: {
              id: 1,
              name: 'Matutino'
            },
            ubicacion: 'Playa Lorena 126',
            jefeDirecto: '-'
          };
        }
        vm.turnos = [
          {id: 1, name: 'Matutino'},
          {id: 2, name: 'Vespertino'}
        ];
        vm.tabs = [
          {enable: true},
          {enable: false},
          {enable: false},
          {enable: false},
          {enable: false}
        ];
        if(!vm.person.employee){
          vm.person.employee = {
            fechaIngreso: new Date()
          };
        }
      } else if(vm.stateData.personType == CONSTANTS.PERSON_TYPE.SUPPLIER){
        vm.tabs = [
          {enable: true},
          {enable: false},
          {enable: false}
        ];
      }

      vm.activeTab = 0;
      vm.isFinalStep = false;

      var validateStep = function(currentIndex, newIndex, callback){
        vm.enableNext = true;
        //Reset duplicity
        $scope.personForm.email.$setValidity("duplicated", true);
        //Force all form validation
        if(newIndex > currentIndex){
          angular.forEach($scope.personForm, function(val, key){
            if(typeof val === 'object' && val.hasOwnProperty('$modelValue')){
              val.$setDirty(true);
              vm.enableNext = vm.enableNext && val.$valid;
            }
          });
        }
        //Check mail duplicity
        if(vm.activeTab == 0 && $scope.personForm.email.$valid){
          vm.loading = true;
          PersonService.isEmailDuplicated(vm.person).then(function () {
            vm.loading = false;
            $scope.personForm.email.$setValidity("duplicated", !Response.data);
            vm.enableNext = vm.enableNext && $scope.personForm.email.$valid;
            callback();
          }, function(){
            vm.loading = false;
          });
        } else {
          callback();
        }
      };

      var checkFinalStep = function(){
        vm.isFinalStep = false;
        if(vm.stateData.personType == CONSTANTS.PERSON_TYPE.CLIENT && vm.activeTab == 1){
          vm.isFinalStep = true;
        } else if(vm.stateData.personType == CONSTANTS.PERSON_TYPE.EMPLOYEE && vm.activeTab == 2){
          vm.isFinalStep = true;
        } else if(vm.stateData.personType == CONSTANTS.PERSON_TYPE.SUPPLIER && vm.activeTab == 2){
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
        $scope.personForm.$setDirty(true);
        if ($scope.personForm.$valid) {
          vm.person.personType = vm.stateData.personType;
          PersonService.save(vm.person).then(function () {
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