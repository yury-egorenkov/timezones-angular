'use strict';

/**
 * @ngdoc function
 * @name timezonesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the timezonesApp
 */
angular.module('timezonesApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.showLogin = true;
    $scope.editClock = false;
    $scope.clockToEdit = null;    
    $scope.zone = "";
    $scope.name = "";

    $scope.clocks = [
      {
        time: '12:30',
        zone: '-5',
        name: 'New York'
      },
      {
        time: '12:30',
        zone: '+3',
        name: 'Moscow'
      }      
    ]

    function pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length-size);
    }

    function calcTime(offset) {
        // create Date object for current location
        var d = new Date();

        // convert to msec
        // subtract local time zone offset
        // get UTC time in msec
        var utc = d.getTime() - (d.getTimezoneOffset() * 60000);

        // create new Date object for different city
        // using supplied offset
        var nd = new Date(utc + (3600000 * offset));

        var currentTime = nd.toLocaleString();

        var timeString = pad(nd.getHours(), 2) + ":"  
                     + pad(nd.getMinutes(), 2) + ":" 
                     + pad(nd.getSeconds(), 2);

        // return time as a string
        // return "The local time for city"+ city +" is "+ nd.toLocaleString();
        return timeString;
    }    

    setInterval( function() {
      for (var i = 0; i < $scope.clocks.length; i++) {
        var clock = $scope.clocks[i];
        clock.time = calcTime(clock.zone); 
      }
      $scope.$apply();
    }, 1000);

    $scope.signIn = function() {

      $scope.showLogin = false;
    }

    $scope.addTimeZone = function() {
      $scope.clocks.push({
        zone: $scope.zone,
        name: $scope.name
      });

      $scope.zone = "";
      $scope.name = "";
    }

    $scope.edit = function(clock) {
      $scope.editClock = true;
      $scope.clockToEdit = clock;
      $scope.zone = clock.zone;
      $scope.name = clock.name;      
    }

    $scope.delete = function(clock) {
      var index = $scope.clocks.indexOf(clock);
      $scope.clocks.splice(index, 1);
    }

    $scope.updateTimeZone = function() {
      $scope.clockToEdit.zone = $scope.zone;
      $scope.clockToEdit.name = $scope.name;
      $scope.cancelUpdateTimeZone();
    }

    $scope.cancelUpdateTimeZone = function () {
      $scope.editClock = false;
      $scope.zone = "";
      $scope.name = "";     
    }

  });
