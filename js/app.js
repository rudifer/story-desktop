var app = angular.module('app', ['firebase', 'ngSanitize', 'ngRoute', 'ngAnimate'])

app.controller("main", function($scope, $firebaseObject) {
  $scope.items = [1,2,3,4];

  var ref = new Firebase('https://scorching-torch-4944.firebaseio.com/');
  console.log('PostSSS Ctrl here')
  // download the data into a local object
  $scope.posts = $firebaseObject(ref);
  console.log($scope.posts)
  $scope.viewClass = 'animate-home';

  ref.on("value", function(snapshot) {
    console.log(snapshot.val());
    x = snapshot.val()
    z = x.posts

    $scope.pz = z

  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });


});
app.controller("detail", function($scope, $routeParams, $firebaseObject) {
  $scope.myvalue = $routeParams.id;

  var ref = new Firebase('https://scorching-torch-4944.firebaseio.com/posts/'+ $routeParams.id);
  console.log('PostCtrl here!')
  // download the data into a local object
  $scope.post = $firebaseObject(ref);
  console.log($scope.post)
  $scope.viewClass = 'animate-post';


  ref.on("value", function(snapshot) {
    console.log(snapshot.val());
    xx = snapshot.val()
    zz = xx.post

    $scope.pzz = zz;

  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
});

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main',
        controller: 'main'
      })
      .when('/post/:id', {
        templateUrl: 'detail',
        controller: 'detail'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true);
  });
