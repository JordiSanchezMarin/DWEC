var masterui = {

    mostrarPistas: function () {
        // añade las pistas para que sean visuales 
        $(".pistas").empty();
        for(i=0 ; i <master.getCasillasOk();i++){
        	$(".pistas").append("<div class='circulo cuadrado red'></div>");
        }
        for(i=0 ; i < master.getCasillasKo();i++){
        	$(".pistas").append("<div class='circulo cuadrado green'></div>");
        }
    },

    añadirPista: function () {
        // añade la ultima pista al array de pistas
        $("#historial_pistas").append("<div class='row clearfix' id='his_"+ config.intentosNow +"'></div>");
        for( i = 0 ; i<5 ; i++){
			$("#his_" + config.intentosNow).append("<div class='col-md-2 column'>" +
                        "<div class='circulo " + master.codigoPrueba.getArrayColor()[i] +"'>" +

                        "</div>" +
				"</div>");	
		}
		$("#his_" + config.intentosNow).append($("#pistas>div").clone().attr("id", "pistas" + config.intentosNow));
    },

    borrarPistas: function () {
        // cuando el juego finalice todas las pistas se borraran
        $("#historial_pistas").empty();
    },
	
	añadirColores: function(id_div){
		//añade los cuadros de colores para elegir
		for( i = 0 ; i<5 ; i++){
			$("#" + id_div).append("<div id='i_" + i + "' class='col-md-2 column' style='text-align:center;padding-top:4px'> " +
                    "<div id='blue_" + i + "' class='cuadrado blue'>0</div><div id='green_" + i + "' class='cuadrado green'>1</div><div id='red_" + i + "' class='cuadrado red'>2</div>" +
                    "<div id='gold_" + i + "' class='cuadrado gold'>3</div><div id='blueviolet_" + i + "' class='cuadrado blueviolet'>4</div><div id='black_" + i + "' class='cuadrado black'>5</div>" +
			"</div>");	
		}
	},
	
	añadirResultado: function(id_div){
		//añade los 5 circulos que varian segun la opcion elegida
		for( i = 0 ; i<5 ; i++){
			$("#" + id_div).append("<div class='col-md-2 column'>" +
                        "<div id='r_" + i + "' class='circulo'>" +

                        "</div>" +
				"</div>");	
		}
		$("#" + id_div).append(
			"<div class='col-md-2 column' id='n_intentos' >" +
                    
		"</div>");
	}
		
};