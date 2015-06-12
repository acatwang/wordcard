//angular
(function(){
	var app = angular.module('showcard', []);

	// Retrieve cards
	var getAPI = "https://wordcard.herokuapp.com/api/v1/words/from_user.json?user_id=1&limit=10&offset=0";

	app.factory('getService', function($http){
		return {
			getFoo: function(){
				return $http.get(getAPI).then(function(result){
					return result.data;
				})
			}
		}
	})
  
  	app.controller('cardController', function($scope, getService){
  		getService.getFoo().then(function(data){
  			$scope.cards = data;
  			console.log(data);
  		})
  	})
})();