(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('PersonCtrl', [
    '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'PersonService', 'Response', '$uibModal', 'confirmm', 'notiffy',
    function ($rootScope, $scope, $state, $sessionStorage, $timeout, PersonService, Response, $uibModal, confirmm, notiffy) {

      var vm = this;

      vm.stateData = $state.current.data;

      vm.inactivePersons = false;
      vm.updateEnabled = false;
      vm.deactivateEnabled = false;
      vm.activateEnabled = false;
      vm.allselected = false;

      vm.refresh = function () {
        $scope.main.loading = true;
        var postObj = {
          personType: { id: vm.stateData.personType },
          active: !vm.inactivePersons
        };
        PersonService.get(postObj).then(function () {
          vm.personList = Response.persons;
          vm.allselected = false;
          $scope.main.loading = false;
        }, function () {
          notiffy.error('Error al obtener la lista de usuarios.');
          $scope.main.loading = false;
        });
      };

      vm.refresh();

      vm.openPersonModal = function (update) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/person/person.modal.html',
          controller: 'PersonModalCtrl',
          controllerAs: 'vm',
          size: 'lg',
          resolve: {
            person: function () {
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
        angular.forEach(vm.personList, function (person, index) {
          if (person.selected) {
            vm.selectedList.push(person);
          } else {
            vm.allselected = false;
          }
        });
        if (vm.selectedList.length > 0) {
          vm.activateEnabled = true;
          vm.deactivateEnabled = true;
        }
        angular.forEach(vm.selectedList, function (person, index) {
          if (person.active) {
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
        angular.forEach(vm.personList, function (person, index) {
          person.selected = select;
        });
        vm.enableBts();
      };

      vm.activatePersons = function () {
        var message = '';
        angular.forEach(vm.selectedList, function (person, index) {
          message += person.name;
          if (index < vm.selectedList.length - 2) {
            message += ', ';
          } else if (index < vm.selectedList.length - 1) {
            message += ' y ';
          }
        });
        if (vm.selectedList.length > 1) {
          message = 'Desea activar a los usuarios ' + message + '?';
        } else {
          message = 'Desea activar a ' + message + '?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          PersonService.activate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.activated) {
              notiffy.success('Usuarios activados.');
            } else {
              notiffy.error('Error al activar los usuarios.');
            }
            vm.refresh();
          }, function () {
            notiffy.error('Error al activar los usuarios.');
          });
        });
      };


      vm.deactivatePersons = function () {
        var message = '';
        angular.forEach(vm.selectedList, function (person, index) {
          message += person.name;
          if (index < vm.selectedList.length - 2) {
            message += ', ';
          } else if (index < vm.selectedList.length - 1) {
            message += ' y ';
          }
        });
        if (vm.selectedList.length > 1) {
          message = 'Desea inactivar a los usuarios ' + message + '?';
        } else {
          message = 'Desea inactivar a ' + message + '?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          PersonService.deactivate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.deactivated) {
              notiffy.success('Usuarios inactivados.');
            } else {
              notiffy.error('Error al inactivar los usuarios.');
            }
            vm.refresh();
          }, function () {
            notiffy.error('Error al inactivar los usuarios.');
          });
        });
      };

      vm.cloud = function(person){
        Response.stateData = vm.stateData;
        Response.selectedCloud = person;
        $state.go('index.cloud');
      };

      vm.diagnostic = function(person){
        Response.selectedPerson = person;
        $state.go('index.diagnostic');
      };

    }]);

})();