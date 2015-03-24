'use strict';

/**
 * @ngdoc overview
 * @name timezonesApp
 * @description
 * # timezonesApp
 *
 * Main module of the application.
 */
angular
  .module('timezonesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
