var eventos = {

    colorClick: function () {
        $(".cuadrado").click(function () {
                //al hacer click en un cuadrado de color se añade a la redonda como resultado
                var clase = $(this).attr('class');
                var id = $(this).attr('id');
                var array = new Array();
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
        	utils.resetHTML();
        	utils.resetVariables();
        	$( ".cuadrado").unbind( "click" );
        }
    },
	empezarClick: function (){
		utils.preparacionVariables();
		utils.preparacionHTML();
		master.generar();
		eventos.colorClick();
	},
    sliderClick: function () {
        // Antes de iniciar el juego se debe indicar el numero de intentos en una slider bar
    },

    comprobarEnter: function () {
        // Se puede comprobar el codigo poniendo en un textbox el codigo y presionando la tecla ENTER
    }

};