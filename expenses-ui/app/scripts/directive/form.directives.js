/**
 * INSPINIA - Responsive Admin Theme
 *
 */

(function() {
  'use strict';

  var module = angular.module('expenses');

  module.directive('inputValidator', ['$state', '$timeout', function($state, $timeout) {
    return {
      scope: {
        inputName: "@",
        label: "@",
        type: "@",
        model: "=",
        form: "=",
        required: "=",
        minLength: "=",
        maxLength: "=",
        placeholder: "@",
        onlyDigits: "@"
      },
      restrict: "EA",
      templateUrl: 'views/directive/input.validator.html',
      link: function (scope, element, attrs, modelCtrl) {

        scope.type = scope.type ? scope.type : 'text';
        scope.formModel = scope.form[scope.inputName];
        scope.onlyDigits = scope.onlyDigits ? true : false;

      }
    };
  }]);

  module.directive('selectValidator', ['$state', '$timeout', function($state, $timeout) {
    return {
      scope: {
        inputName: "@",
        list: "=",
        label: "@",
        optionLabel: "@",
        model: "=",
        form: "=",
        required: "="
      },
      restrict: "EA",
      templateUrl: 'views/directive/select.validator.html',
      link: function (scope, element, attrs, modelCtrl) {

        scope.type = scope.type ? scope.type : 'text';
        scope.formModel = scope.form[scope.inputName];
        scope.onlyDigits = scope.onlyDigits ? true : false;

      }
    };
  }]);

  module.directive('textareaValidator', ['$state', '$timeout', function($state, $timeout) {
    return {
      scope: {
        inputName: "@",
        label: "@",
        type: "@",
        model: "=",
        form: "=",
        required: "=",
        minLength: "=",
        maxLength: "=",
        rows: "=",
        placeholder: "@",
        onlyDigits: "@"
      },
      restrict: "EA",
      templateUrl: 'views/directive/textarea.validator.html',
      link: function (scope, element, attrs, modelCtrl) {

        scope.type = scope.type ? scope.type : 'text';
        scope.formModel = scope.form[scope.inputName];
        scope.onlyDigits = scope.onlyDigits ? true : false;

      }
    };
  }]);

  module.directive('dateValidator', ['$state', '$timeout', function($state, $timeout) {
    return {
      scope: {
        inputName: "@",
        label: "@",
        model: "=",
        form: "=",
        required: "="
      },
      restrict: "EA",
      templateUrl: 'views/directive/date.validator.html',
      link: function (scope, element, attrs, modelCtrl) {

        scope.formModel = scope.form[scope.inputName];

      }
    };
  }]);

})();
