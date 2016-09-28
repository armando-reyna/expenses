(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('CloudCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'StorageService', 'Response',
    '$uibModal', 'confirmm', 'notiffy', '$window', 'EquipmentService', 'CubicleService', 'PersonService', 'ProductService',
    function (CONSTANTS, $rootScope, $scope, $state, $sessionStorage, $timeout, StorageService, Response, $uibModal,
              confirmm, notiffy, $window, EquipmentService, CubicleService, PersonService, ProductService) {

      var vm = this;

      vm.stateData = Response.stateData;

      if (!vm.stateData) {

        $state.go('index.main');

      } else {

        vm.selectedCloud = Response.selectedCloud;
        vm.name = vm.selectedCloud.name;

        vm.filesPath = CONSTANTS.API_URI + 'files/' + vm.stateData.path + '/';

        vm.refreshCloud = function () {

          switch(vm.stateData.path){
            case CONSTANTS.FILE_PATH.equipment : {
              $scope.main.loading = true;
              EquipmentService.getOne(vm.selectedCloud.id).then(function () {
                $scope.main.loading = false;
                vm.selectedCloud = Response.equipment;
                vm.files = vm.selectedCloud.equipmentFiles;
                vm.name = vm.selectedCloud.name;
              }, function () {
                $scope.main.loading = false;
                notiffy.error('Error al obtener lista de archivos.');
              });
              break;
            }
            case CONSTANTS.FILE_PATH.banner : {
              $scope.main.loading = true;
              StorageService.getBanners().then(function () {
                $scope.main.loading = false;
                vm.files = Response.banners;
              }, function () {
                $scope.main.loading = false;
                notiffy.error('Error al obtener lista de archivos.');
              });
              break;
            }
            case CONSTANTS.FILE_PATH.cubicle : {
              $scope.main.loading = true;
              CubicleService.getOne(vm.selectedCloud.id).then(function () {
                $scope.main.loading = false;
                vm.selectedCloud = Response.cubicle;
                vm.files = vm.selectedCloud.cubicleFiles;
                vm.name = vm.selectedCloud.name;
              }, function () {
                $scope.main.loading = false;
                notiffy.error('Error al obtener lista de archivos.');
              });
              break;
            }
            case CONSTANTS.FILE_PATH.person : {
              $scope.main.loading = true;
              PersonService.getOne(vm.selectedCloud.id).then(function () {
                $scope.main.loading = false;
                vm.selectedCloud = Response.person;
                vm.files = vm.selectedCloud.personFiles;
                vm.name = vm.selectedCloud.name;
              }, function () {
                $scope.main.loading = false;
                notiffy.error('Error al obtener lista de archivos.');
              });
              break;
            }
            case CONSTANTS.FILE_PATH.product : {
              $scope.main.loading = true;
              ProductService.getOne(vm.selectedCloud.id).then(function () {
                $scope.main.loading = false;
                vm.selectedCloud = Response.product;
                vm.files = vm.selectedCloud.productFiles;
                vm.name = vm.selectedCloud.name;
              }, function () {
                $scope.main.loading = false;
                notiffy.error('Error al obtener lista de archivos.');
              });
              break;
            }
          }

        };

        vm.refreshCloud();

        vm.uploadFile = function (file) {
          vm.file = file;
          if (vm.file) {
            $scope.main.loading = true;
            StorageService.upload({
              file: vm.file
            }, {
              id: vm.selectedCloud.id,
              path: vm.stateData.path
            }).then(function () {
              $scope.main.loading = false;
              if (Response.response.status == 'success') {
                notiffy.success(Response.response.message);
                vm.refreshCloud();
              } else {
                notiffy.error(Response.response.message);
              }
            }, function () {

              $scope.main.loading = false;
              notiffy.error('Error al subir el archivo.');
            });
          } else {
            vm.isOverMaxSize = true;
          }
        };

        vm.deleteFile = function (file) {
          var fileDto = {
            id: file.id,
            path: vm.stateData.path
          };
          confirmm.confirm("Desea eliminar la imágen?", function () {
            $scope.main.loading = true;
            StorageService.remove(fileDto).then(function () {
              if (Response.response.status == 'success') {
                $scope.main.loading = false;
                notiffy.success(Response.response.message);
                vm.refreshCloud();
              } else {
                notiffy.error('Error al eliminar la imágen.');
                $scope.main.loading = false;
              }
            }, function () {
              notiffy.error('Error al eliminar la imágen.');
              $scope.main.loading = false;
            });
          });
        };

        vm.openFile = function(files, index){
          if(vm.isImage(files[index].name)){
            var images = [files[index]];
            angular.forEach(files, function(file){
              if(file.id != files[index].id && vm.isImage(file.name)){
                images.push(file);
              }
            });
            vm.carouselModal(images, 0);
          }else {
            $window.open(vm.filesPath+files[index].name, '_blank');
          }
        };

        vm.carouselModal = function (files, index) {
          $uibModal.open({
            templateUrl: 'views/common/carousel.modal.html',
            controller: 'CarouselModalCtrl',
            controllerAs: 'vm',
            resolve: {
              url: function () {
                return vm.filesPath;
              },
              files: function () {
                return files;
              },
              index: function () {
                return index;
              }
            }
          });
        };

        vm.isImage = function (name) {
          var nameAux = name.toUpperCase();
          var image = false;
          if (nameAux.endsWith('JPG') || nameAux.endsWith('PNG')) {
            image = true;
          }
          return image;
        }

      }

    }]);

})();