function Persona(id, color, ok) {
    this.id = id;
    this.color = color;
    this.ok = ok;

    function comportamiento(callback){
        callback();
    }

    function getId() {
        return this.id;
    }

    function getColor() {
        return this.color;
    }

    function getOk() {
        return this.ok;
    }

    function setColor(color) {
        this.color = color;
    }
}

function Casilla(id, persona, ocupada, fila, columna) {
    this.id = id;
    this.persona = persona;
    this.ocupada = ocupada;
    this.fila = fila;
    this.columna = columna;

    function getId() {
        return this.id;
    }

    function getPersona() {
        return this.persona;;
    }

    function getOcupada() {
        return this.ocupada;
    }

    function getFila() {
        return this.fila;
    }

    function getColumna() {
        return this.columna;
    }

    function setPersona(persona) {
        this.persona = persona;
    }

    function setOcupada(ocupada) {
        this.ocupada = ocupada;
    }

    function borrarPersona() {
        if (this.persona != null) {
            this.persona = null;
            this.ocupada = false;
        }
    }
}

function Tablero() {
    this.Casillas = new Array();

    function llenarTablero() {
        for (var ca in this.Casillas) {
           
            pe = new Persona();
            ca.setPersona();
        }
    }

    this.crear = function () {
        fila = 0;
        columna = 0;
        for (var i = 0; i < 90; i++, fila++) {
            div = document.createElement("div");
            div.setAttribute("id", i);
            div.setAttribute("style", "width:50px;height:50px;float:left;border:1px solid Black;margin:2px");
            $("#total").append(div);
            if (fila >= 10) {
                fila = 0;
                columna++;
            }
            this.Casillas[i] = Casilla(i, null, false, fila, columna);
        }

    };
}