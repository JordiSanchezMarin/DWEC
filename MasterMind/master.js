var master = {
	codigoFinal: new codigo(true, null),
	codigoPrueba: null,
	casillasOk: 0,
	casillasKo: 0,
	coloresOk: new Array(),
    generar: function () {
    	master.codigoFinal.generarCodigo();
    },
	getCasillasOk: function(){
		return master.casillasOk;
	},
	getCasillasKo: function(){
		return master.casillasKo;
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

    campoKo: function (color, color2) {
        // devuelve true/false segun si el color existe en la combinación final
        ok = false;
		for(x=0 ; x <5 ; x++){
	    	if(color == color2[x]){
	    		ok=true;
	    	}
	    }
        return ok;
    }

};