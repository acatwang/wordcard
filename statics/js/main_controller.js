// This file contains all the Angular components used in myPage.html


var API_URL = "https://wordcard.herokuapp.com/api/v1/words/from_user.json?user_id=1&limit=10&offset=0";

// Retrieve cards
app.factory('getService', function($http){
	return {
		getFoo: function(){
			return $http.get(API_URL).then(function(result){
				return result.data;
			})
		}
	}
})



app.controller('carouselCtrl',function($scope,getService){
    console.log($scope);
    console.log(this);
    getService.getFoo().then(function(data){
        $scope.slides = data;
        console.log(data);
    })

    $scope.addCard = function(){
        console.log($scope);
        $scope.slides.unshift({content:$scope.newWord});
        $scope.newWord="";

    }
})