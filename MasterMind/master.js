var master = {
	codigoFinal: new codigo(true, null),
	codigoPrueba: null,
	casillasOk: 0,
	casillasKo: 0,
	coloresOk: new Array(),
    coloresTotal: new Array(),
    //esta funcion genera el codigo al principio del juego
    generar: function () {
    	master.generarTodosColores();
    	master.codigoFinal.generarCodigo();
    },
    //devuelve todas las casillas correctas
	getCasillasOk: function(){
		return master.casillasOk;
	},
	//devuelve todas las casillas semicorrectas
	getCasillasKo: function(){
		return master.casillasKo;
	},
	//genera una array que contiene todos los colores posibles
	generarTodosColores: function(){
		master.coloresTotal[0] = "blue";
		master.coloresTotal[1] = "green";
		master.coloresTotal[2] = "red";
		master.coloresTotal[3] = "gold";
		master.coloresTotal[4] = "blueviolet";
		master.coloresTotal[5] = "black"; 
	},	
    comprobarCodigo: function () {
       //comprueba el ultimo codigo introducido y devuelve true/false
       utils.comprobarCodigoVariables();
       master.casillasOk = 0;
       master.casillasKo = 0;
       var codigoF = new Array();
       codigoF = master.codigoFinal.getArrayColor();
       var codigoP = new Array();
       codigoP = master.codigoPrueba.getArrayColor();
       for(i=0 ; i<5 ; i++){
       		x = new Array();
       	    x = codigoP[i].split(" ");
       		if(master.campoOk(x[1],codigoF[i])==true){
       			master.casillasOk++;
       			master.coloresOk.push(x[1]);
       		}
       		else if(master.campoKo(x[1],codigoF) == true){
       			master.casillasKo++;
       		}
       }
       
       if(master.casillasOk == 5){
       	 	master.codigoFinal.setCorrecto(true);
       }
       masterui.mostrarPistas();
       utils.mostrarDebug();
    },

    campoOk: function (color, color2) {
        // devuelve true/false segun si el color esta en la posicion correcta
        if(color == color2){
        	return true;
        }
        else{
        	return false;
        }
    },
    //comprueba si un color ya es correcto
	colorCorrecto: function(color){
		correcto = false;
		for(y=0;y<master.coloresOk.length;y++){
			if(color == master.coloresOk[y] ){
				correcto = true;
			}
		}
		return correcto;
	},
    campoKo: function (color, color2) {
        // devuelve true/false segun si el color existe en la combinación final
        ok = false;
		for(x=0 ; x <5 ; x++){
	    	if(color == color2[x] && master.colorCorrecto(color) == false){
	    		ok=true;
	    	}
	    }
        return ok;
    },
    guardarCookie: function(cookie){
    	$.cookie('tiradas_maxima', cookie);
    },
    extraerCookie: function(){
    	if ($.cookie('tiradas_maxima') == null){
    		alert("No hay cookies disponibles");
    	}else{
    		config.maxIntentos = $.cookie('tiradas_maxima');
    		alert(config.maxIntentos);
    	}
    	
    }

};