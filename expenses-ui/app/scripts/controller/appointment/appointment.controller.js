(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('AppointmentCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'Response', '$uibModal', 'confirmm', 'notiffy',
    '$compile', 'AppointmentService', 'CubicleService', 'UtilService', '$stateParams',
    function (CONSTANTS, $rootScope, $scope, $state, $sessionStorage, $timeout, Response, $uibModal, confirmm, notiffy, $compile,
              AppointmentService, CubicleService, UtilService, $stateParams) {
      var vm = this;

      vm.calendarView = 'Month';

      vm.user = $sessionStorage.userToken;

      vm.selected = {};

      vm.eventsLoaded = false;
      if ($stateParams.reload == 'true' && $sessionStorage.alreadyReloaded == 'false') {
    	$sessionStorage.alreadyReloaded = 'true';
    	window.location.reload();  
      }

      vm.isLoggedUserAdmin = function () {
        var isAdmin = false;
        if ($sessionStorage.userToken.role.id == 2) {
          isAdmin = true;
        }
        return isAdmin;
      };

      vm.isAdmin = vm.isLoggedUserAdmin();

      vm.isDirty = function () {
        return $scope.appointmentDate.$dirty && $scope.submitted;
      };

      vm.loadCubicles = function () {
        $scope.main.loading = true;
        CubicleService.get({active: true}).then(function () {
          $scope.main.loading = false;
          vm.cubicles = Response.cubicleList;
          buildFileURL(vm.cubicles);
        }, function () {
          notiffy.error('Error al obtener la lista de cub\u00EDculos.');
          $scope.main.loading = false;
        });
      };

      vm.getUserAppointments = function () {
        $scope.main.loading = true;
        var inactive = {
          inactive: false
        };
        AppointmentService.getUserAppointments(vm.user.id).then(function () {
          $scope.main.loading = false;
          if (Response.appointments.status == 'failure') {
            notiffy.error(Response.cubicles.message);
            return;
          }
          vm.cubicles = Response.cubicles.data;
        }, function () {
          notiffy.error('Error al obtener la lista de citas.');
          $scope.main.loading = false;
        });
      };

      vm.clearSelectedView = function () {
        delete vm.selectedCubicle;
        vm.isGalleryView = false;
        vm.isSelectCubicle = true;
        vm.eventsLoaded = false;
        $("#calendarWrapper").css("margin-left", "1000000000000px");
      };

      vm.loadCubicles();

      vm.selectedCubicle;

      vm.selectCubicle = function (cubicle) {
        angular.forEach(vm.cubicles, function (cubicle, index) {
          cubicle.isSelected = false;
        });
        cubicle.isSelected = true;
        vm.selectedCubicle = cubicle;
      };

      vm.isGalleryView = false;
      vm.isSelectCubicle = true;
      vm.showGalleryView = function () {
        vm.isGalleryView = true;
        vm.isSelectCubicle = false;
        vm.loading = true;
        CubicleService.getCubicleFiles(vm.selectedCubicle.id).then(function () {
          vm.loading = false;
          if (Response.result) {
            vm.files = Response.result;
            buildGalleryURL(vm.files);
          } else {
            notiffy.error('Error al obtener lista de archivos.');
          }
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener lista de archivos.');
        });
        $("#calendarWrapper").css("margin-left", "1000000000000px");
      };

      vm.showApptView = function () {
        vm.isGalleryView = false;
        vm.isSelectCubicle = false;
        vm.eventsLoaded = true;
      };

      function buildGalleryURL(files) {
        angular.forEach(files, function (file, index) {
          file.url = 'cubicleId=' + vm.selectedCubicle.id + '&fileName=' + file.name;
        });
      }

      function buildFileURL(cubicles) {
        angular.forEach(cubicles, function (cubicle) {
          angular.forEach(cubicle.cubicleFiles, function (file) {
            file.url = 'cubicleId=' + cubicle.id + '&fileName=' + file.name;
          });
        });
      }

      vm.carouselModal = function (files, index) {
        $uibModal.open({
          templateUrl: 'views/common/carousel.modal.html',
          controller: 'CubilclesCarouselModalCtrl',
          controllerAs: 'vm',
          resolve: {
            files: function () {
              return files;
            },
            index: function () {
              return index;
            }
          }
        });
      };

    }
  ]);
})();