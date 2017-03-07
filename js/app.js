var myApp = angular.module("myApp",[]);

myApp.controller("mainController",["$scope","$http",function($scope,$http){
    console.log("mainController");
    $scope.movieName = "";

    $scope.getMovie = function(){
        console.log("fun");
    $http.get("http://www.omdbapi.com/?t="+$scope.movieName)
    .then(function(res){
        $scope.movieDetail = res.data;   
        console.log($scope.movieDetail);             
    }, function(res){
        console.log("fail");
    })
    }
 
// $scope.topNewsFeed = [];

// var getTopNews = function getTopNews(){
// for(var i=0;i<sourceLen;i++){    
//     $http.get("https://newsapi.org/v1/articles?source="+ $scope.sourceList[i].id+"&sortBy=top&apiKey="+$scope.authKey)    
//     .then(function(res){
//         angular.forEach(res.data.articles,function(o){
//         $scope.topNewsFeed.push(o);     
//         })        
//         console.log($scope.topNewsFeed);
//     }, function(res){
//         console.log("fail");
//     })
// }
// }


}
]);

