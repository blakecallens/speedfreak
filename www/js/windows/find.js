let i18nService = require('../services/i18n');

angular.module('speedfreak.app', [])
.controller('FindController', ($scope, $http) => {
  var apiUrl = 'https://www.speedrun.com/api/v1';

  $scope.i18n = i18nService.getLocalizedString;

  $scope.search = () => {
    if($scope.searchText.length < 3) {
      return;
    }

    $http.get(apiUrl + '/games', {
      params: {
        name: $scope.searchText
      }
    }).then(result => {
      $scope.searchResults = result.data.data;
    })
  }
});
