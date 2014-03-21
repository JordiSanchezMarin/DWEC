﻿var eventos = {

    colorClick: function () {
        $(".cuadrado").click(function () {
                //al hacer click en un cuadrado de color se añade a la redonda como resultado
                var clase = $(this).attr('class');
                var id = $(this).attr('id');
                var array = new Array();
                id = id.split("_");
                $("#r" + id[1]).removeAttr('class');
                $("#r" + id[1]).addClass("circulo");
                $("#r" + id[1]).addClass(clase);
                $("#r" + id[1]).removeClass("cuadrado");
        });
    },

    colorHover: function(id){
        $("#" + id).hover(
          function () {
              //al pasar por encima de un cuadrado de color se hace una sombra --> CSS
          }, function () {
             //al salir de encima del cuadrado de color la sombra desaparece --> CSS
          }
        );
        
    },

    comprobarClick: function () {
        // Al hacer click en el boton comprobar se recorrera el array de colores introducidos y los irá comparando
    },

    sliderClick: function () {
        // Antes de iniciar el juego se debe indicar el numero de intentos en una slider bar
    },

    comprobarEnter: function () {
        // Se puede comprobar el codigo poniendo en un textbox el codigo y presionando la tecla ENTER
    }

};