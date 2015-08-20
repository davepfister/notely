'use strict';

var nevernoteBasePath = 'https://nevernote-1150.herokuapp.com/api/v1/',
  apiKey = '$2a$10$d7XzSnDXgHoSKu4jFCs6v.aLSTJep.syPcZo1RFTm6w4xNZSdvUyq';

  var noteApp = angular.module('notely.notes', ['ngRoute']);

  noteApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/notes', {
      templateUrl: 'notes/notes.html'
    });
  }]);

  noteApp.controller('NotesController', ['$scope', 'NotesBackend', function($scope, NotesBackend) {
    var self = this;
    $scope.note = {};
    $scope.notes = [];

    self.assignNotes = function(notes) {
      $scope.notes = notes;
      //debugger;
    };

    self.findNoteById = function (noteId) {
      for (var i = 0; i < $scope.notes.length; i++) {
        if ($scope.notes[i].id === noteId){
          return $scope.notes[i];
        }
      }
    };

    $scope.buttonText = function (){
      if ($scope.note.id) {
        return "Update Note";
      } else {
        return "Create Note";
      }
    };

    self.cloneNote = function(note) {
      return JSON.parse(JSON.stringify(note));
    };

    $scope.commit = function() {
      if ($scope.note.id) {
          NotesBackend.putNote($scope.note, self.assignNotes);
      } else {
      NotesBackend.postNote($scope.note, self.assignNotes);
    }
    };

    $scope.hasNotes = function() {
      return $scope.notes.length > 0;
    };

    $scope.loadNote = function(note) {
      $scope.note =  self.cloneNote(note);
    };

    NotesBackend.fetchNotes(self.assignNotes);
  }]);
