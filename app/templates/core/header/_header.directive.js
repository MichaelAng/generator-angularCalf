'use strict';

/**
 * Directive of the header.module App
 */

angular.module('header.module')
  .directive('header', function(){
    return {
      name: 'header',
      restrict: 'A',
      controller: function($scope, $element, $attrs, $location) {
        $scope.activeRoute = function (route) {
          return route === $location.path();
        };
      },
      templateUrl: 'components/core/header/header.view.html',
    };
  });

