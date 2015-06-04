
function searchDict(word){
	
	var dictAPI = "http://api.wordnik.com:80/v4/word.json/"+word+"/definitions?limit=200&includeRelated=true&sourceDictionaries=webster&useCanonical=true&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
	// Use JSONP to send cross-domain request
	$.ajax({
		url: dictAPI,
		type:'GET',
		// The name of the callback parameter, as specified by the YQL service
    	//jsonp: "callback",
 
	    // Tell jQuery we're expecting JSONP
	    dataType: "jsonp",
	    success: function( data ) {
	    	console.log('success');
        	console.log( data ); // server response
    	},
    	error: function (xhr, status, error) {
        	console.log(xhr.responseText);
        	console.log(status);
    	},
	})
}

$('#searchbtn').click(function(){
	console.log('searching');
	 	searchDict($('#lookupword').val());
});