function codigo(resultado,correcto)
{
	var arrayColor = new Array();
	var resultado = resultado;
	var correcto = correcto;
	
	//funcion que cambiara la array a correcta/incorrecta
	this.setCorrecto = function (cor){
		correcto = cor;
	},
	//funcion que sirve para recibir la variable correcto
	this.getCorrecto = function(){
		return correcto;
	},
	this.generarCodigo= function () {
        // se genera el codigo ha adivinar de manera aleatoria, cuando se inicie partida
        if(resultado == true){
        	array = new Array();
	    	array[0] = "red";
	    	array[1] = "black";
	    	array[2] = "green";
	    	array[3] = "blue";
	    	array[4] = "gold";
	    	array[5] = "blueviolet";
    	    for(i=0; i<5 ; i++){
    			arrayColor[i] = array[Math.floor((Math.random()*5) + 1)];
    		}
        }
        //se genera cada vez que hagas un intento para poder compararla con la final
        else if(resultado == false){
        	for(i=0; i<5 ; i++){
        		arrayColor[i] = $("#r_" + i).attr("class");
        	}
        }
     
 };
 //funcion que recuperra el array de colores del codigo
   this.getArrayColor = function(){
   		return arrayColor;
   };
}
	 
