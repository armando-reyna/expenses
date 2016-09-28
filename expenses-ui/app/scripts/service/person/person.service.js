(function () {
  'use strict';

  var module = angular.module('expenses');

  module.factory('PersonService', ['$log', '$http', '$q', 'APIService', 'Response',
    function ($log, $http, $q, APIService, Response) {

      var PersonService = {};

      PersonService.save = function (person) {
        var deffered = $q.defer();
        APIService.person.save(person)
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

      PersonService.get = function (postObj) {
        var deffered = $q.defer();
        APIService.person.get(postObj)
          .success(function (response) {
            Response.persons = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      PersonService.getOne = function (id) {
        var deffered = $q.defer();
        APIService.person.getOne(id)
          .success(function (response) {
            Response.person = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      PersonService.activate = function (persons) {
        var deffered = $q.defer();
        APIService.person.activate(persons)
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

      PersonService.deactivate = function (persons) {
        var deffered = $q.defer();
        APIService.person.deactivate(persons)
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

      PersonService.isEmailDuplicated = function (person) {
        var deffered = $q.defer();
        APIService.person.isEmailDuplicated(person)
          .success(function (response) {
            Response.data = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      PersonService.getEmployeeTypes = function () {
        var deffered = $q.defer();
        APIService.person.getEmployeeTypes()
          .success(function (response) {
            Response.employeeTypes = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      return PersonService;

    }]);
})();
