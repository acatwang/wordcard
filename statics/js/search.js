
function searchDict(word){
	// need to relax content_security_policy in order to run the script
	var dictAPI = "https://wordcard.herokuapp.com/api/v1/words/wnlookup.json?word="+word;
	
	// Use JSONP to send cross-domain request
	$.ajax({
		url: dictAPI,
		type:'GET',
		// The name of the callback parameter, as specified by the YQL service
    	//jsonp: "callback",
 
	    // Tell jQuery we're expecting JSONP
	    dataType: "json",
	    success: function( data ) {
	    	console.debug('success');
        	console.log( data ); // server response
        	showDefinition(data);
    	},
    	error: function (xhr, status, error) {
    		alert(status);
        	console.log(xhr.responseText);
        	console.debug(status);
    	},
	})
}

function showDefinition(data){
	$('#definition').show();
	// only show the first definition for testing
	$('#definition').text(data[0].text);

}

$('#searchbtn').click(function(){
	$('#definition').empty();
	var lookupword = $('#lookupword').val()? $('#lookupword').val():'test' ;
	console.log('searching');
	searchDict(lookupword);
});


//angular
(function (){
	var worddef = {word:'hyper', pos:'adj',definition:'happy'} ;
	var app = angular.module('define', []);
  
  	app.controller('defController', function(){
  		this.product = worddef;
  	})
})();
