var master = {
	codigoFinal: new codigo(true, null),
    generar: function () {
    	master.codigoFinal.generarCodigo();
    },

    comprobarCodigo: function () {
       //comprueba el ultimo codigo introducido y devuelve true/false
    },

    campoOk: function (id) {
        // devuelve true/false segun si el color esta en la posicion correcta
    },

    campoKo: function () {
        // devuelve true/false segun si el color existe en la combinación final
    }

};