function codigo(resultado,correcto)
{
	var arrayColor = new Array();
	var resultado = resultado;
	var correcto = correcto;
	
	this.generarCodigo= function () {
        // se genera el codigo ha adivinar de manera aleatoria, cuando se inicie partida
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
   },
   this.getArrayColor = function(){
   		return arrayColor;
   }
}
	 
