'use strict';

/**
 * Route of the <%= module_name %>
 */

angular.module('<%= module_name %>')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'components/main/main.view.html',
        controller: 'mainCtrl'
      })
      .when('/about', {
        templateUrl: 'components/about/about.view.html',
        controller: 'aboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
