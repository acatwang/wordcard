
function searchDict(word){
	// need to relax content_security_policy in order to run the script
	var dictAPI = "https://api.wordnik.com/v4/word.json/"+word+"/definitions?limit=200&includeRelated=true&sourceDictionaries=webster&useCanonical=true&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
	
	// Use JSONP to send cross-domain request
	$.ajax({
		url: dictAPI,
		type:'GET',
		// The name of the callback parameter, as specified by the YQL service
    	//jsonp: "callback",
 
	    // Tell jQuery we're expecting JSONP
	    dataType: "jsonp",
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