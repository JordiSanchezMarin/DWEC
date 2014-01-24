function Persona(id, color, ok) {
    var id = id;
    var color = color;
    var ok = ok;
    var img = document.createElement("img");

    this.comportamiento = function(callback){
        callback();
    }

    this.getId = function() {
        return id;
    }

    this.getColor= function(){
        return color;
    }

    this.getOk = function(){
        return ok;
    }

    this.setColor = function(color) {
        this.color = color;
    }

    this.setImg = function (img) {
        this.img= img;
    }
}

function Casilla(id, persona, ocupada, fila, columna) {
    var id = id;
    var persona = persona;
    var ocupada = ocupada;
    var fila = fila;
    var columna = columna;

    this.getId = function(){
        return id;
    }

    this.getPersona = function(){
        return persona;;
    }

    this.getOcupada = function() {
        return ocupada;
    }

    this.getFila = function() {
        return fila;
    }

    this.getColumna = function() {
        return columna;
    }

    this.setPersona = function(persona) {
        persona = persona;
    }

    this.setOcupada = function(ocupada) {
        ocupada = ocupada;
    }

    this.borrarPersona = function () {
        if (persona != null) {
            persona = null;
            ocupada = false;
        }
    }
}

function Tablero() {
    this.Casillas = new Array();
    this.Personas = new Array();
    this.crear = function () {
        fila = 0;
        columna = 0;
        for (var i = 0; i < 100; i++, fila++) {
            div = document.createElement("div");
            div.setAttribute("id", i);
            div.setAttribute("style", "width:50px;height:50px;float:left;border:1px solid Black;margin:2px");
            $("#total").append(div);
            if (fila >= 10) {
                fila = 0;
                columna++;
            }
            this.Casillas[i] = new Casilla(i, null, false, fila, columna);
        }

    };

    this.llenarTablero = function () {
        tipoFicha = "blanca";
        for (i = 0; i < 34; i++) {
            this.Personas[i] = new Persona(i, tipoFicha, true);
            if (i == 16) {
                tipoFicha = "negra";
            }
            rnd = Math.round(Math.random() * 99);
            if (this.Casillas[rnd].getPersona() == null) {
                this.Casillas[rnd].setPersona(this.Personas[i]);
                this.Casillas[rnd].setOcupada(true);
                img = document.createElement("img");
                if (this.Personas[i].getColor() == "negra") {
                    img.setAttribute("src", "FichaNegra.png");
                }
                else if (this.Personas[i].getColor() == "blanca") {
                    img.setAttribute("src", "FichaBlanca.png");
                }
                img.setAttribute("width", "48px");
                img.setAttribute("height", "48px");
                this.Personas[i].setImg(img);
                $("#" + rnd).append(img);
            }
            else {
                i--;
            }
        }
        console.log(this.Personas);
        console.log(this.Casillas);
    }

   
}