var utils = {

    cambiarDebug: function (bol) {
        // canvia el estado del debug
        config.debug = bol;
    },
	
	mostrarDebug: function(){
		//depende de la variable muestra por debug o no
		if(config.debug  == true){
			console.log(config.debug);
			console.log(master.codigoFinal.getArrayColor());
		}
	},
    cambiarTheme: function () {
        // cambia el css segun el establecido
    }

};