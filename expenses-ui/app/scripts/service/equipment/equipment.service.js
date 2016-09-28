(function () {
  'use strict';

  var module = angular.module('expenses');

  module.factory('EquipmentService', ['$log', '$http', '$q', 'APIService', 'Response',
    function ($log, $http, $q, APIService, Response) {

      var EquipmentService = {};

      EquipmentService.save = function (equipment) {
        var deffered = $q.defer();
        APIService.equipment.save(equipment)
          .success(function (response) {
            Response.response = response;
            deffered.resolve();
          })
          .error(function (err) {
            alert(err.toSource());
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      EquipmentService.get = function (postObj) {
        var deffered = $q.defer();
        APIService.equipment.get(postObj)
          .success(function (response) {
            Response.equipmentList = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      EquipmentService.getOne = function (id) {
        var deffered = $q.defer();
        APIService.equipment.getOne(id)
          .success(function (response) {
            Response.equipment = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      EquipmentService.activate = function (equipments) {
        var deffered = $q.defer();
        APIService.equipment.activate(equipments)
          .success(function (response) {
            Response.activated = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      EquipmentService.deactivate = function (equipments) {
        var deffered = $q.defer();
        APIService.equipment.deactivate(equipments)
          .success(function (response) {
            Response.deactivated = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      EquipmentService.getAvailable = function (equipment) {
        var deffered = $q.defer();
        APIService.equipment.getAvailable(equipment)
          .success(function (response) {
            Response.equipmentList = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      return EquipmentService;

    }]);
})();
