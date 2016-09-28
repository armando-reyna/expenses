(function () {
  'use strict';

  var module = angular.module('expenses');

  module.factory('CubicleService', ['$log', '$http', '$q', 'APIService', 'Response',
    function ($log, $http, $q, APIService, Response) {

      var CubicleService = {};

      CubicleService.save = function (cubicle) {
        var deffered = $q.defer();
        APIService.cubicle.save(cubicle)
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

      CubicleService.get = function (postObj) {
        var deffered = $q.defer();
        APIService.cubicle.get(postObj)
          .success(function (response) {
            Response.cubicleList = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      CubicleService.getOne = function (id) {
        var deffered = $q.defer();
        APIService.cubicle.getOne(id)
          .success(function (response) {
            Response.cubicle = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      CubicleService.activate = function (cubicles) {
        var deffered = $q.defer();
        APIService.cubicle.activate(cubicles)
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

      CubicleService.deactivate = function (cubicles) {
        var deffered = $q.defer();
        APIService.cubicle.deactivate(cubicles)
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

      return CubicleService;

    }]);
})();
