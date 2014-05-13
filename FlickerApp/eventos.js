$(document).ready(function(){
	$("#btn_enviar").click(function(){
		var vartag = "";
		var varid = "";
		if($("#txtTag").val()!=""){
		    vartag=$("#txtTag").val().trim();
		}
		if($("#txtId").val()!=""){
		    varid=$("#txtId").val().trim();
		}
		$("#div_imagenes").empty();
		$.ajax({
            url: "https://api.flickr.com/services/feeds/photos_public.gne?format=json&id="+varid+"&tags="+vartag+"&jsoncallback=?",
            dataType: "json",
            complete: function(jqXHR, textStatus) {
            	
            },
            error: function(jqXHR, textStatus, errorThrown) {
            	
            },
            success: function(data) {
            	for (var i=0 ;i<data.items.length;i++) {
					$("#div_imagenes").append("<div class='div_imagen' id='img"+i+"'></div>");
					$("#img"+i).append("<img  src='"+data.items[i].media.m+"'/>");
		            $("#img"+i).append("<p>ID = "+data.items[i].author_id+"</p>");
		            $("#img"+i).append("<p>TAGS = "+data.items[i].tags+"</p>");
				}
            }
        });
	});
});

