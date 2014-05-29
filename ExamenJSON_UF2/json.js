var divs_arrayPersonajes = Array();
var juego;
var listadoPersonajes;
function getJSON(){
	var jqxhr = $.getJSON( "http://127.0.0.1/projects/Practica_UF2/juego.json", function(juego2) {
		localStorage.setItem('JSON', JSON.stringify(juego2)); 
		juego = juego2;
		listadoPersonajes = new Function(juego.juego.ListadoPersonajes);
		listadoPersonajes();
		mostrarPersonajes();
		mostrarAtaques();
	})
	  .fail(function() {
	    console.log( "error" );
	  });
}
function getLocalStorageJSON(){
	juego = JSON.parse(localStorage.getItem('JSON')); 
	listadoPersonajes = new Function(juego.juego.ListadoPersonajes);
	listadoPersonajes();
	mostrarPersonajes();
	mostrarAtaques();
}
function mostrarPersonajes(){
	$("#container_personajes").empty();
	for( i = 0; i<divs_arrayPersonajes.length ; i++){
		$("#container_personajes").append(divs_arrayPersonajes[i]);
		var infoPers = new Function(juego.juego.arrayPers[i].Informacion);
		infoPers();
	}
}
function mostrarAtaques(){
	for(i=0 ; i<juego.juego.arrayPers.length ; i++){
		div = $(".div_personaje")[i];
		var generarAtaque = new Function(juego.juego.arrayPers[i].genAtaque); 
		$("#container_personajes").find(div).append("<label class='lbl_pers'> Ataque: " + generarAtaque() + " </label>");
	}
}

function ordernarAtaques(){
	divs_arrayPersonajes = null;
	divs_arrayPersonajes = Array();
	juego.juego.arrayPers = juego.juego.arrayPers.sort(function(b, a) { 
		var generarAtaque = new Function("i", b.genAtaque);
		var generarAtaque2 = new Function("i", a.genAtaque); 
		return (parseInt(generarAtaque(juego.juego.arrayPers.length - 1))); 
	});
	localStorage.setItem('JSON', JSON.stringify(juego));
	juego = JSON.parse(localStorage.getItem('JSON')); 
    console.log(juego);
	for(i=0;i<juego.juego.arrayPers.length ; i++){
		divs_arrayPersonajes.push('<div class="div_personaje"><label class="lbl_pers">Nombre: ' + juego.juego.arrayPers[i].Nombre + '</label><label class="lbl_pers">Raza: ' + juego.juego.arrayPers[i].Raza + '</label></div>' );
	}
	mostrarPersonajes();
	mostrarAtaques();
}
