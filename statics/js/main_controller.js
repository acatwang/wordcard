// This file contains all the Angular components used in myPage.html



// Retrieve cards
app.factory('db', function($http, $q){
    var GETWORD_API = "https://wordcard.herokuapp.com/api/v1/words/from_user.json?user_id=1&limit=10&offset=0";
    var LOOKUP_API = "http://wordcard.herokuapp.com/api/v1/words/wnlookup.json?word=";
    var db = {};
    var cards = [];
    db.getCards = function(){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:GETWORD_API
        })
            .success(function(data){deferred.resolve(data)})
            .error(function(){deferred.reject('Error')})

        return deferred.promise
    }

    db.lookup = function(){
       return $http.get(GETWORD_API)
            .then(function(results){
                return results.data;
            })
            .then(function(words){
               var urls = []
               for (var i=0;i<words.length;i++){
                   urls.push($http.get(LOOKUP_API+words[i].content));
               }
                return $q.all(urls)
            })
            .then(function(results){
                //console.log(results);
                return results;
            })
    }

    return db;
})



app.controller('carouselCtrl',function($scope,$q,db){

    $scope.slides = [];

    var appendWords = function(data){
        for (var i=0;i<data.length;i++){
            $scope.slides.push(data[i]);
        }
    }

    var appendDefs = function(data){
        for (var i=0;i<data.length;i++){
            $scope.slides[i].definition = data[i].data;
        }
    }

    //db.getCards().then(function(results){
    //    $scope.slides = results;
    //    console.log($scope.slides);
    //
    //})

    db.lookup().then(function(response){console.log(response)});

    $q.all([db.getCards(), db.lookup()]).then(function(data){appendWords(data[0]),appendDefs(data[1])});


    $scope.addCard = function(){
        $scope.slides.unshift({content:$scope.newWord});
        $scope.slides[0].active=true;
        $scope.newWord="";

    }
})