//funcion que se utiliza para ejecutar cualquier ajax sin pasar parametros
function mandarAjaxNone(url, funcionFinal)
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	  {
		 funcionFinal(xmlhttp);
	  }
  };
  xmlhttp.open("GET", url +".php",true);
  xmlhttp.send();
}
//funcion que se utiliza para ejecutar cualquier ajax pasando un parametro por GET
function mandarAjax(x, xValue, url, funcionFinal)
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	  {
		 funcionFinal(xmlhttp);
	  }
  };
  xmlhttp.open("GET", url +".php?"+ x + "="+xValue,true);
  xmlhttp.send();
}
//funcion que se utiliza para ejecutar cualquier ajax pasando dos parametro por GET
function mandarAjax2(x, xValue, y, yValue, url, funcionFinal)
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	  {
		 funcionFinal(xmlhttp);
	  }
  };
  xmlhttp.open("GET", url +".php?"+ x + "="+xValue+"&"+y+"="+yValue,true);
  xmlhttp.send();
}
//funcion que se utiliza para ejecutar cualquier ajax pasando tres parametro por GET
function mandarAjax3(x, xValue, y, yValue, z, zValue, url, funcionFinal)
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	  {
		 funcionFinal(xmlhttp);
	  }
  };
  xmlhttp.open("GET", url +".php?"+ x + "="+xValue+"&"+y+"="+yValue+"&"+z+"="+zValue,true);
  xmlhttp.send();
}
//funcion que se utiliza para ejecutar cualquier ajax pasando cuatro parametro por GET
function mandarAjax4(x, xValue, y, yValue, z, zValue, r, rValue, url, funcionFinal)
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	  {
		 funcionFinal(xmlhttp);
	  }
  };
  xmlhttp.open("GET", url +".php?"+ x + "="+xValue+"&"+y+"="+yValue+"&"+z+"="+zValue+"&"+r+"="+rValue,true);
  xmlhttp.send();
}
//se ejecuta cuando se hace click en subir archivo, si no se a seleccionado ningun archivo salta un alert
function uploadFile(){
	if ($("#txt").val() != "")
	{
		_("status").innerHTML = "";
		$("#cancelUpload").attr("style", "display:block;text-align:right"); 
		$("#prog2").attr("style", "display:block;margin-top:4%;height:60px;color:Black");
		$("#btncancel").attr("disabled",false);
		$("#submit").attr("disabled", true);
		$(":input[type=file]").attr("disabled", true);
		$("#modal-1813").attr("disabled", false);
		timer = 0;
		$("#div_subir").empty();
		var span = document.createElement("span");
		span.setAttribute("class", "glyphicon glyphicon-transfer");
		$("#div_subir").append(span);
		var file = _("archivo").files[0];
		var formdata = new FormData();
		formdata.append("archivo", file);
		var ajax = new XMLHttpRequest();
		interval1 = setInterval(function () {timer++;}, 1200) ;
		tiempo_rest = 0;  
		interval2 = setInterval( function(){
			if(timer > 11 && tiempo_rest > 0){
				tiempo_rest--;
			}
		},1100);
		ajax.upload.addEventListener("progress", progressHandler, false);
		ajax.addEventListener("load", completeHandler, false);
		ajax.addEventListener("error", errorHandler, false);
		ajax.addEventListener("abort", abortHandler, false);
		ajax.open("POST", "file.php?tipo=" + $('#tipo').val());
		ajax.send(formdata);
	}
	else 
        {
		bootbox.alert("Seleccione un archivo, porfavor", function() { });
	}
}
//funcion quye se ejecuta cuando el archivo se esta subiendo | ayuda a cargar la barra de proceso y a calcular
// el tiempo y el %
function progressHandler(event){
	if(timer == 10){
		tiempo_rest =  Math.round((event.total * timer) / event.loaded);
	}
	if(timer > 10){
		var minutes = Math.floor( tiempo_rest / 60 );
		var seconds = tiempo_rest % 60;
		result = minutes + " minutos y " + seconds + " segundos";  
	}
	_("loaded_n_total").innerHTML = "Tiempo restante: " + result;
	var percent = (event.loaded / event.total) *100;
	_("progressBar").value = Math.round(percent);
	var per = Math.round(percent) + "%";
	_("progress_bar").setAttribute("style", "width:" + per + ";background-color:#303030");
	_("progress_bar").setAttribute("aria-valuenow", percent );
	_("status").innerHTML = Math.round(percent) + "% completado";
	//evento que se produce cuando se cierra el navegador/carga de nuevo
	window.onbeforeunload = closeIt;
	if(percent > 98)
	{
		_("status").innerHTML = Math.round(percent) + "% completado <br> <br> Finalizando la solicitud, espere por favor";
		clearInterval(interval1);
		clearInterval(interval2);
		_("loaded_n_total").innerHTML = "";
		
	}
}
//funcion que se ejecuta cuando la subida de un archivo ha sido finalizada
function completeHandler(event){
	_("status").innerHTML = event.target.responseText;
	_("progressBar").value = 0;
	_("status").innerHTML = "Archivo subido con exito";
	window.onbeforeunload = null;
	$("#cancelUpload").attr("style", "visibility:hidden"); 
	$("#prog2").attr("style", "visibility:hidden;");
	$("#submit").attr("disabled", false);
	$(":input[type=file]").attr("disabled", false);
	$("#modal-1813").attr("disabled", false);
	$("#div_subir").empty();
	var span = document.createElement("span");
	span.setAttribute("class", "glyphicon glyphicon-arrow-up");
	$("#div_subir").append(span);
	eventosGestionArchivos.cargarArbolTotal();
	//bootbox.alert("Archivo subido correctamente", function() { });
	/*$(":button").click(function(){
		window.onbeforeunload = null;
		location.reload();
	});*/
	/*$(document).keyup(function(e){
		if(e.keyCode == 27){window.onbeforeunload = null;location.reload();}//press escape
	});*/
}
//funcion que se ejecuta cuando hay un fallo en la subida de un archivo
function errorHandler(event){
	window.onbeforeunload = null;
	_("status").innerHTML = "Fallo en la subida, vuelva a intentarlo de nuevo";
}
//funcion que se ejecuta cuando hay un aborto en la subida de un archivo
function abortHandler(event){
	window.onbeforeunload = null;
	_("status").innerHTML = "Fallo en la subida, vuelva a intentarlo de nuevo";
}