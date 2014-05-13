$(document).ready(function(){
	//se añade el evento click en el boton Enviar, para que se mande una petición ajax a flickr para que devuelva un json
	$("#btn_enviar").click(function(){
		$(this).attr("disabled", "disabled");
		var vartag = "";
		var varid = "";
		//recuperamos los filtros que se han introducido (id user, tag imagen)
		if($("#txtTag").val()!=""){
		    vartag=$("#txtTag").val().trim();
		}
		if($("#txtId").val()!=""){
		    varid=$("#txtId").val().trim();
		}
		//vaciamos las imagenes para volver a cargar las otras
		$("#div_imagenes").fadeOut(function() {
		    $( this ).empty();
		    $("#div_carousel_busqueda>.carousel-inner").empty();
		    $("#div_carousel_busqueda>.carousel-indicators").empty();
		    /*se manda la petición ajax al servidor la arquitectura es la siguiente:
			url: [url de la direccion flickr pasando las variables necesarias por post, para que el servidor interactue con ellas]
			dataType: [tipo de archivo que devolvera el servidor]
			complete: function(jqXHR, textStatus) {
				[codigo que se ejecutara cuando haya finalizado la peticion]
			},
			error: function(jqXHR, textStatus, errorThrown){
				[codigo que ejecutara cuando se produzca un error en la peticion]
			},
			success: function(data){
				[codigo que se ejecutara cuando la peticion haya finalizado con exito]
			}
			*/
			$.ajax({
	            url: "https://api.flickr.com/services/feeds/photos_public.gne?format=json&id="+varid+"&tags="+vartag+"&jsoncallback=?",
	            dataType: "json",
	            complete: function(jqXHR, textStatus) {
	            	//se activa el boton buscar para poder realizar otra busqueda
	            	$("#btn_enviar").removeAttr("disabled");
	            },
	            error: function(jqXHR, textStatus, errorThrown) {
	            	//se hace visible el div del error
	            	 $( "#div_error" ).attr("style", "visibility:visible");
	            	 //se añade el contenido del eeror recibido por el servidor
	            	 $('#div_error').append('<label>Error: '+jqXHR.status+' - '+errorThrown + "<label>");
	            	 $("#div_carousel_busqueda>.carousel-inner").append(
		            	'<div class="item active">' +
						'</div>'	            	
		            );
	            	 //cuando pasen dos segundos el mensaje desaparecera
	            	 setTimeout(function(){
	            	 	$( "#div_error" ).fadeOut( 1000, function() {
						    $( this ).empty();
						 });
	            	 },2000);
	            },
	            success: function(data) {
	            	//se muestra el div que contiene las imaganes
	            	$( "#div_imagenes" ).fadeIn( 1000, function() {
				    });
				    //se realiza un for el cual sirve para recorrer el jsoon recibido en forma de objeto
	            	for (var i=0 ;i<data.items.length;i++) {
	            		//cada tres imagenes se crea una fila de divs
	            		if(i%3 == 0){
	            			$("#div_imagenes").append('<div class="row clearfix"></div>');
	            		}
	            		//si es la primera foto, le damos la classe activa al div de la iamgen y la añadimos en el carousel
	            		if(i == 0){
	            			$("#div_carousel_busqueda>.carousel-inner").append(
				            	'<div class="item active">' +
									'<img width="100%" src='+data.items[i].media.m+' />' +
								'</div>'	            	
				            );
	            		}
	            		//sino es la primera foto se le da la clase item al div e la imagen y la añadimos en el carousel
	            		else{
	            			$("#div_carousel_busqueda>.carousel-inner").append(
				            	'<div class="item">' +
									'<img width="100%" src='+data.items[i].media.m+' />' +
								'</div>'	            	
				            );
	            		}
	            		//se añade todo el contenido de las imagenes en el div_imaganes
	            		$("#div_imagenes:last-child").append("<div class='div_imagen col-lg-4' id='img_"+i+"'></div>");
						$("#img_"+i).append("<img src='"+data.items[i].media.m+"' data-toggle='modal' data-target='#modal_img' /><br>");
			            $("#img_"+i).append("<label> <strong>Id</strong> <span class='glyphicon glyphicon-arrow-right'></span> </label><label>"+data.items[i].author_id+"</label> <br />");
			            $("#img_"+i).append("<label><strong>Tags</strong> <span class='glyphicon glyphicon-arrow-right'></span>"+data.items[i].tags+"</label>");
			            $("#div_carousel_busqueda>.carousel-indicators").append(
								'<li id="bolita_slide_'+i+'" data-target="#div_carousel_busqueda" data-slide-to="'+i+'"></li>'		            	
			            );
					}
					//cuando se ha cargado la peticion ajax se añade un evento a las imagenes para poder visualizarlas en un modal
					$(".div_imagen>img").click(function(){
						var i = $(this).parent().attr("id").split("_")[1];
						$("#bolita_slide_" + i).click();
					});
	            }
	        });
		});
	});
});

