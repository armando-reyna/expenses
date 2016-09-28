(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('AppontmentModalCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$state', 'Response', 'AppointmentService', '$uibModalInstance', '$sessionStorage', 'notiffy', 'date', 'cubicle', 'UserService',
    function (CONSTANTS, $rootScope, $scope, $state, Response, AppointmentService, $uibModalInstance, $sessionStorage, notiffy, date, cubicle, UserService) {

      var vm = this;

      vm.userId = $sessionStorage.userToken.id;
      vm.appointment = {
        date: date
      };

      vm.now = moment();

      vm.tomorrow = vm.appointment.date.date() > vm.now.date();

      if(date.minutes()>0){
        vm.appointment.startHour = date.hour()+0.5;
      }else {
        vm.appointment.startHour = date.hour();
      }

      var HOURS = [];
      for(var i=0; i<24; i=i+.5){
        HOURS.push(i);
      }

      vm.startHours = angular.copy(HOURS);
      vm.endHours = angular.copy(HOURS);

      $scope.$watch('vm.appointment.date', function(newVal, oldVal) {
        if(newVal){
          vm.startHours = [];
          var auxDate = new Date();
          var auxHr = auxDate.getHours();
          if(auxDate.getMinutes()>=30){
            auxHr += .5;
          }
          angular.forEach(HOURS, function(hr) {
            if(vm.tomorrow || hr > auxHr){
              vm.startHours.push(hr);
            }
          });
        }
      });

      $scope.$watch('vm.appointment.startHour', function(newVal, oldVal) {
        if(newVal || newVal === 0){
          vm.endHours = [];
          angular.forEach(HOURS, function(hr) {
            if(hr > newVal+0.5){
              vm.endHours.push(hr);
            }
          });
        }
      });

      vm.isLoggedUserAdmin = function () {
        var isAdmin = false;
        if ($sessionStorage.userToken.role.id == 2) {
          isAdmin = true;
        }
        return isAdmin;
      };
      vm.isAdmin = vm.isLoggedUserAdmin();
      vm.doctorList = [];
      if (vm.isAdmin == true) {
        AppointmentService.getDoctors().then(function () {
          vm.loading = false;
          if (Response.doctor.status == 'success') {
            vm.doctorList = Response.doctor.data;
          } else {
            notiffy.error(Response.file.message);
          }
        }, function () {
          notiffy.error('Error al obtener doctores.');
        })
      }

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

      vm.isDirty = function(){
        return $scope.appointmentForm.$dirty && $scope.submitted;
      };

      vm.save = function () {
        $scope.appointmentForm.$setDirty(true);
        $scope.submitted = true;
        if ($scope.appointmentForm.$valid) {
          vm.loading = true;
          if (vm.isAdmin == true) {
        	  vm.userId = vm.appointment.doctor.id;
          }
          var event = {
            title: vm.appointment.title,
            date: vm.appointment.date,
            startHour: vm.appointment.startHour,
            endHour: vm.appointment.endHour,
            cubicleId: cubicle.id,
            userId: vm.userId
          };
          AppointmentService.save(event).then(function () {
            vm.loading = false;
            if (Response.saved.status == 'success') {
              event.id = Response.saved.data.id;
              $uibModalInstance.close(event);
              notiffy.success('El evento se ha agendado correctamente.');
              if (vm.isAdmin == false) {
            	  UserService.refreshUser(vm.userId).then(function () {
                     $rootScope.token = Response.user.data;
        	      }, function () {
//        	          notiffy.error('Error al obtener la informaci\u00F3n del usuario.');
        	      });
              }
            } else if (Response.saved.status == 'failure') {
              if(Response.saved.message.indexOf('horario') == -1){
                vm.cancel();
                $state.go("index.doctors-store");
              }
              notiffy.error(Response.saved.message);
            } else {
              notiffy.error('Error al guardar evento. Por favor intente nuevamente');
            }
          });
        }
      };

    }]);

})();