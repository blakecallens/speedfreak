let _ = require('lodash');
let i18nService = require('../services/i18n');

angular.module('speedfreak.app', [])
.controller('FindController', ($scope, $http, $filter) => {
  var apiUrl = 'https://www.speedrun.com/api/v1';

  $scope.i18n = i18nService.getLocalizedString;

  $scope.search = () => {
    if($scope.searchText.length < 3) {
      $scope.searchResults = [];
      return;
    }

    $http.get(apiUrl + '/games', {
      params: {
        name: $scope.searchText
      }
    }).then(result => {
      $scope.searchResults = result.data.data;
      console.log($scope.searchResults);
    });
  };

  $scope.selectGame = game => {
    for(let i = 0; i < $scope.searchResults.length; i++) {
      $scope.searchResults[i].active = false;
    }
    game.active = true;
    $scope.selectedGame = game;
    $scope.getCategorysForGame(game);
  }

  $scope.getCategorysForGame = game => {
    $http.get(apiUrl + '/games/' + game.id + '/categories').then(result => {
      $scope.categoryResults = result.data.data;
      console.log($scope.categoryResults);
    });
  };

  $scope.selectCategory = category => {
    for(let i = 0; i < $scope.categoryResults.length; i++) {
      $scope.categoryResults[i].active = false;
    }
    category.active = true;
    $scope.selectedCategory = category;
    $scope.getRecordsForCategory(category);
  };

  $scope.getRecordsForCategory = category => {
    $scope.categoryRecords = null;
    var link = _.find(category.links, {rel: 'records'});

    $http.get(link.uri).then(result => {
      $scope.categoryRecords = result.data.data;
      console.log($scope.categoryRecords);
    });
  }

  $scope.decodeString = string => {
    try {
      return decodeURIComponent(string)
    }
    catch(err) {
      return string;
    }
  };

  $scope.openExternalLink = link => {
    require('electron').shell.openExternal(link);
  }
});
