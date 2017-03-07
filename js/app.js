var myApp = angular.module("myApp",[]);


myApp.factory('$localstorage',['$window', function($window){
    return{
        set: function(key, value){
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue){
            return $window.localStorage[key] || false;
        },
        setObject: function(key,value){
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key){
            if($window.localStorage[key] != undefined){
                return JSON.parse($window.localStorage[key] || false);
            }
        }
    }
}
]);




myApp.controller("mainController",["$scope","$http","$localstorage",function($scope,$http,$localstorage){

    if($localstorage.getObject("Movie")){
        $scope.usermovie = $localstorage.getObject("Movie");
    }else{
        $scope.usermovie = [];
    }
    
    $scope.movieName = "";
    

    $scope.getMovie = function(){
    $scope.addlib = "Add to Personal Library";
    $http.get("http://www.omdbapi.com/?t="+$scope.movieName)
    .then(function(res){
        $scope.movieDetail = res.data;   
        console.log($scope.movieDetail);             
        if($scope.movieDetail.Response === "False"){
            $scope.movieDetail = []; 
            $scope.movieDetail.Title = "Sorry, The Movie doesnt Exist";
            $scope.movieDetail.Poster = "";
            console.log($scope.movieDetail);
        }

    }, function(res){
        console.log("fail");
    })
}

    $scope.addMovie = function($userMovieDetails){
        var details = $userMovieDetails;
        var exist = $scope.usermovie.some(function(e1){
            return e1.imdbID == $userMovieDetails.imdbID;
        });
        if(!exist){
            $scope.usermovie.push($userMovieDetails);
        }
        $localstorage.setObject("Movie",$scope.usermovie);
        $scope.addlib = "Movie Added";
         console.log($scope.usermovie);
    console.log($localstorage);
    }
   
}
]);


myApp.controller("libController",["$scope","$http","$localstorage",function($scope,$http,$localstorage){
     if($localstorage.getObject("Movie")){
        $scope.usermovie = $localstorage.getObject("Movie");        
    }else{
        $scope.usermovie = [];        
    }
    if($scope.usermovie.length > 0){
        $scope.msg = "";
    }else{
        $scope.msg = "No movies added yet";
    }
}]);
