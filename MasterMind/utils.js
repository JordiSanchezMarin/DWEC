var utils = {

    cambiarDebug: function (bol) {
        // canvia el estado del debug
        config.debug = bol;
    },
	
	mostrarDebug: function(){
		//depende de la variable muestra por debug o no
		if(config.debug  == true){
			console.clear();
			console.log("Codigo final --> " + master.codigoFinal.getArrayColor());
			console.log("Colores acertados -->" + master.coloresOk);
			console.log("Estado de la partida -->" + config.partidaCurso);
			console.log("Intentos maximos -->" + config.maxIntentos);
			console.log("Intentos restantes -->" + parseInt(config.intentos - 1));
			console.log("casillas ok -->" + master.getCasillasOk());
			console.log("Correcto -->" + master.codigoFinal.getCorrecto());
		}
	},
    cambiarTheme: function () {
        // cambia el css segun el establecido
    },
    
    preparacionVariables: function(){
    	//prepara las variables necesarias cuando se inicia la partida
    	config.maxIntentos = $("#max_value").val();
		config.partidaCurso = true;
		config.intentos = config.maxIntentos;
		config.finish = false;
		master.codigoFinal.setCorrecto(false);
    },
    preparacionHTML: function(){
    	//edita el codigo html para empezar a jugar
		$("#btn_comprobar").css({visibility : "visible"});
		$("#btn_empezar").css({visibility : "hidden"});
		$("#max_value").attr("disabled","disabled");
		$("#p_intentos").empty();
		$("#p_intentos").text("Intentos restantes");
		$("#n_intentos").empty();
        $("#n_intentos").append(config.intentosNow);
    },
    comprobarCodigoVariables: function(){
    	//prepara las variables necesarias cuando se comprueba el codigo
       master.coloresOk = null;
       master.coloresOk = new Array();
       master.codigoPrueba = new codigo(false,null);
       master.codigoPrueba.generarCodigo();
    },
	comprobarCodigoHTML: function(){
		//cambia valores de objetos HTML
		$("#max_value").val(config.intentos + 1);
        $("#rangevalue").val(config.intentos);
        $("#n_intentos").empty();
        $("#n_intentos").append(config.intentosNow);
	},
	resetHTML: function(){
		//preapara los elementos html para poder volver a jugar una vez finalizada la partida
		$("#p_intentos").empty();
		$("#p_intentos").text("Maximo numero de intentos");
		$("#max_value").attr("disabled",false);
		$("#btn_comprobar").css({visibility : "hidden"});
		$("#btn_empezar").css({visibility : "visible"});
		$("#max_value").val(5);
		$("#rangevalue").val(5);
		$(".pistas").empty();
		$("#n_intentos").empty();
		$("#codigo_enter").val("");
		$( "#codigo_enter" ).unbind('keypress');
	},
	resetVariables: function(){
		//preapara las variables para poder volver a jugar una vez finalizada la partida
		master.casillasKo = 0;
		master.casillasOk = 0;
		master.codigoPrueba=null;
		config.partidaCurso = false;
		config.intentos=0;
		config.intentosNow=0;
		config.maxIntentos = 0;
	},
	comprobarCodigoEnter: function(codigo){
		//comprueba que el codigo introducido tenga el formato correcto
		correcto=true;
		for(i=0;i<codigo.length;i++){
			if(!$.isNumeric(codigo[i]) || codigo[i] > 5 ){
				correcto = false;
			}
		}
		return correcto;
	}
};