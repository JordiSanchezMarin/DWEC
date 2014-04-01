var eventos = {

    colorClick: function () {
        $(".cuadrado").click(function () {
                //al hacer click en un cuadrado de color se añade a la redonda como resultado
                var clase = $(this).attr('class');
                var id = $(this).attr('id');
                id = id.split("_");
                $("#r_" + id[1]).removeAttr('class');
                $("#r_" + id[1]).addClass("circulo");
                $("#r_" + id[1]).addClass(clase);
                $("#r_" + id[1]).removeClass("cuadrado");
        });
    },
    comprobarClick: function () {
        // Al hacer click en el boton comprobar se recorrera el array de colores introducidos y los irá comparando
        if(config.intentos >= 2){
        	master.comprobarCodigo();
        	config.intentos --;
        	config.intentosNow++;
        	utils.comprobarCodigoHTML();
        	masterui.añadirPista();
        	if(master.codigoFinal.getCorrecto() == true){
        		alert("Enhorabuena ha acertado el codigo secreto");
        		utils.resetHTML();
        		utils.resetVariables();
        		$( ".cuadrado").unbind( "click" );
        		masterui.borrarPistas();
        	}
        }
        else{
        	master.comprobarCodigo();
        	if(master.codigoFinal.getCorrecto() == true){
        		alert("Enhorabuena ha acertado el codigo secreto");
        	}
        	else{
        		alert("Se le han acabado los intentos, vuelva a intentarlo...");
        	}
        	masterui.borrarPistas();
        	utils.resetHTML();
        	utils.resetVariables();
        	$( ".cuadrado").unbind( "click" );
        }
    },
	empezarClick: function (){
		//prepara las variables necesarias para empezar y añade los eventos de click y presskey, que sirven para comprobar el codigo
		utils.preparacionVariables();
		utils.preparacionHTML();
		master.generar();
		eventos.colorClick();
		eventos.comprobarEnter();
	},

    comprobarEnter: function () {
        // Se puede comprobar el codigo poniendo en un textbox el codigo y presionando la tecla ENTER
        $( "#codigo_enter" ).unbind('keypress').keypress(function( event ) {
		  if ( event.which == 13 ) {
		     array =  new Array();
		     array = $(this).val().split("");
		     /[1-4]/
		  	if( !$(this).val().match(/[0-5]{5}/) || utils.comprobarCodigoEnter(array) == false){
		  		alert("Debe introducir bien el codigo");
		  	} 
		  	else{
		  		for(i=0;i<array.length;i++){
			     	$("#r_" + i).removeAttr('class');
	                $("#r_" + i).addClass("circulo");
	                $("#r_" + i).addClass(master.coloresTotal[array[i]]);
	                $("#r_" + i).removeClass("cuadrado");
		     	}
		    eventos.comprobarClick();
		  	}
		  }
		});
    }

};