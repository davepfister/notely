'use strict';

var nevernoteBasePath = 'https://nevernote-1150.herokuapp.com/api/v1/',
  apiKey = '$2a$10$d7XzSnDXgHoSKu4jFCs6v.aLSTJep.syPcZo1RFTm6w4xNZSdvUyq';

//define angular module
angular.module('notely.notes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/notes.html'
  //  controller: 'NotesController'
  });
}])

.controller('NotesController', ['$scope', '$http', function($scope, $http) {
  $http.get(nevernoteBasePath + 'notes?api_key=' + apiKey)
    .success(function(notesData) {
      $scope.notes = notesData;
    });

    $scope.commit = function() {
      $http.post(nevernoteBasePath + 'notes', {
        api_key: apiKey,
        note: {
          title: 'The magic of AngularJS',
          body_html: 'Whoever wrote this API must be a person'
        }
      }).success(function(newNoteData) {
        console.log('Saved:');
        console.log(newNoteData);
      });
    };
}]);
