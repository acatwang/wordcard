// This file contains all the Angular components used in myPage.html



// Retrieve cards
app.factory('db', function($http, $q){
    var GETWORD_API = "https://wordcard.herokuapp.com/api/v1/words/from_user.json?user_id=1&limit=10&offset=0";
    var LOOKUP_API = "http://wordcard.herokuapp.com/api/v1/words/wnlookup.json?word=";
    var db = {};
    var _slides = [];

    var appendWords = function(data){
        for (var i=0;i<data.length;i++){
            _slides.push(data[i]);
        }
    }

    var appendDefs = function(data){
        for (var i=0;i<data.length;i++){
            _slides[i].definition = data[i].data;
        }
    }

    db.getSlides = function(){
        return _slides;
    }

    db.setSlides = function(slides){
        _slides = slides
    }

    db.makeSlides = function(){
        $q.all([db.getCards(), db.getDefs()]).then(function(data){appendWords(data[0]),appendDefs(data[1])});

    }
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

    db.getDefs = function(){
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

    db.lookUpDef = function(word){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:LOOKUP_API+word
        })
            .success(function(data){deferred.resolve(data)})
            .error(function(){deferred.reject('Error')})

        return deferred.promise
    }

    db.findWord = function(newWord){
        var newCard={};
        newCard.content = newWord;
        console.log('find');
        db.lookUpDef(newWord).then(function(response) {
            console.log(response);
            newCard.definition = response;

            _slides.unshift(newCard);
            console.log(newCard);
            console.log(_slides[0]);
            _slides[0].active = true;
        });



    }
    return db;
})

app.controller('carouselCtrl',function($scope,$q,db){

    //db.lookup().then(function(response){console.log(response)});

    //$q.all([db.getCards(), db.getDefs()]).then(function(data){appendWords(data[0]),appendDefs(data[1])});

    db.makeSlides();
    $scope.slides = db.getSlides();

    $scope.findWord = function(){
        db.findWord($scope.newWord);
        $scope.newWord="";
    }

})