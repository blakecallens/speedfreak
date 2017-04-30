let _ = require('lodash');
let async = require('async');
let i18nService = require('../services/i18n');

angular.module('speedfreak.app', [])
.controller('FindController', ($scope, $http, $filter) => {
  let apiUrl = 'https://www.speedrun.com/api/v1';

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
      $scope.selectedGame = null;
      $scope.categoryResults = null;
      $scope.selectedCategory = null;
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
      $scope.selectedCategory = null;
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
      let records = result.data.data[0].runs;
      $scope.categoryRecords = [];

      for(record of records) {
        if(record.place > 3) {
          continue
        }

        var placeNames = ['1st', '2nd', '3rd'];

        $scope.categoryRecords.push({
          place: record.place,
          time: record.run.times.realtime_t,
          icon: $scope.selectedGame.assets['trophy-' + placeNames[record.place - 1]].uri
        });
      }

      $scope.categoryRecords = $filter('orderBy')($scope.categoryRecords, '+place');
      console.log($scope.categoryRecords);
    });
  }

  $scope.getGameCategoryName = () => {
    return `${$scope.decodeString($scope.selectedGame.names.twitch)} | ${$scope.decodeString($scope.selectedCategory.name)}`;
  };

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
