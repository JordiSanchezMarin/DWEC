$(document).ready(function(){
	$("#btn_enviar").click(function(){
		$.getJSON("http://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=5c9026d4cfbf2ef9b29747d878da99c8&user_id=12403504@N02", 
		displayImages);
	
	
	});
	function displayImages(data) {
	
	    // Start putting together the HTML string
	    var htmlString = "a";
	    
	    // Now start cycling through our array of Flickr photo details
	    $.each(data.items, function(i,item){
	    
	        // I only want the ickle square thumbnails
	        var sourceSquare = (item.media.m).replace("_m.jpg", "_s.jpg");
	        
	        // Here's where we piece together the HTML
	        htmlString += '<li><a href="' + item.link + '" target="_blank">';
	        htmlString += '<img title="' + item.title + '" src="' + sourceSquare;
	        htmlString += '" alt="'; htmlString += item.title + '" />';
	        htmlString += '</a></li>';
	    
	    });
	    
	    // Pop our HTML in the #images DIV
	    $('#div_imaganes').html(htmlString);
	    
	    // Close down the JSON function call
	}
});

