
function searchDict(word){
	// need to relax content_security_policy in order to run the script
	var dictAPI = "https://wordcard.herokuapp.com/api/v1/words/wnlookup.json?word="+word;
	
	// Use JSONP to send cross-domain request
	$.ajax({
		url: dictAPI,
		type:'GET',
	    dataType: "json",
	    success: function( data ) {
	    	console.debug('success');
        	console.log( data ); // server response
        	showDefinition(word,data);
    	},
    	error: function (xhr, status, error) {
    		alert(status);
        	console.log(xhr.responseText);
        	console.debug(status);
    	},
	})
}

function addWordToDB(word){
	var addAPI = "https://wordcard.herokuapp.com/api/v1/words/add.json?content="+word+"&category=search&user_id=1";
	$.ajax({
		url: addAPI,
		type:'GET',
	    dataType: "json",
	    success: function( data ) {
	    	console.debug('success');
        	console.log( data ); // server response
        	$('#message').show();
        	$('b:first').text(word);

    	},
    	error: function (xhr, status, error) {
    		alert(status);
        	console.log(xhr.responseText);
        	console.debug(status);
    	},
	})
}

function showDefinition(word,data){
	$('#definition').show();
	// only show the first definition for testing
	console.log('def');
	console.log(word);
	$('#word p').text(word);
	defApp(data)
}

$('#searchbtn').click(function(){
	$('#definition').empty();
	var lookupword = $('#lookupword').val()? $('#lookupword').val():'test' ;
	console.log('searching');
	searchDict(lookupword);
});


$('#addbtn').click(function(){
	var lookupword = $('#lookupword').val();
	addWordToDB(lookupword);

})


//angular
function defApp(worddef){
	//var worddef = {word:'hyper', pos:'adj',definition:'happy'} ;
	console.log(worddef);
	var app = angular.module('define', []);
  
  	app.controller('defController', function(){
  		this.words = worddef;
  	})
};
