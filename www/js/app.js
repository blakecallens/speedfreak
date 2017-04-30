let timeService = require('./services/time');

angular.module('speedfreak.app', [])
.controller('MainController', ($scope, $interval) => {
  $scope.getSplits = () => {
    return timeService.getSplits();
  };

  $interval(() => {
    $scope.currentTime = timeService.getTotalTime();
  }, 1);
});
