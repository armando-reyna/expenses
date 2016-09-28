(function () {
  'use strict';

  var module = angular.module('expenses');

  module.factory('CategoryService', ['$log', '$http', '$q', 'APIService', 'Response',
    function ($log, $http, $q, APIService, Response) {

      var CategoryService = {};

      CategoryService.save = function (category) {
        var deffered = $q.defer();
        APIService.category.save(category)
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

      CategoryService.get = function (postObj) {
        var deffered = $q.defer();
        APIService.category.get(postObj)
          .success(function (response) {
            Response.categoryList = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      CategoryService.activate = function (categories) {
        var deffered = $q.defer();
        APIService.category.activate(categories)
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

      CategoryService.deactivate = function (categories) {
        var deffered = $q.defer();
        APIService.category.deactivate(categories)
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

      CategoryService.getByType = function (postObj) {
        var deffered = $q.defer();
        APIService.category.getByType(postObj)
          .success(function (response) {
            Response.categoryList = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      return CategoryService;

    }]);
})();
