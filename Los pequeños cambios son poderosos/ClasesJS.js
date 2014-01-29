function Persona(id, colo, ok) {
    this.id = id;
    this.color = colo;
    this.ok = ok;
    this.img = document.createElement("img");
    this.comportamiento = function (callback) {
        callback();
    };

    this.getId = function () {
        return this.id;
    };

    this.getImg = function () {
        return this.img;
    };

    this.getColor = function () {
        return this.color;
    };

    this.getOk = function () {
        return this.ok;
    };

    this.setColor = function (col) {
        this.color = col;
    };

    this.setImg = function (img) {
        this.img.setAttribute("src", img);
        this.img.setAttribute("width", "48px");
        this.img.setAttribute("height", "48px");
        this.img.setAttribute("id", "img" + this.id);
    };

    this.setOk = function (ok) {
        this.ok = ok;
    };
}

function Casilla(id, persona, ocupada, fila, columna) {
    this.id = id;
    this.persona = persona;
    this.ocupada = ocupada;
    this.fila = fila;
    this.columna = columna;

    this.getId = function () {
        return this.id;
    };

    this.getPersona = function () {
        return this.persona; 
    };

    this.getOcupada = function () {
        return this.ocupada;
    };

    this.getFila = function () {
        return this.fila;
    };

    this.getColumna = function () {
        return this.columna;
    };

    this.setPersona = function (persona) {
        this.persona = persona;
    };

    this.setOcupada = function (ocupada) {
        this.ocupada = ocupada;
    };

    this.borrarPersona = function () {
        if (this.persona != null) {
            this.persona = null;
            this.ocupada = false;
        }
    };
}

function Tablero() {
    this.Casillas = new Array();
    this.Personas = new Array();
    this.Norma1 = new Norma(1, "Norma1");
    this.crear = function () {
        fila = 0;
        columna = 0;
        for (var i = 0; i < 100; i++, columna++) {
            div = document.createElement("div");
            div.setAttribute("id", i);
            div.setAttribute("style", "width:50px;height:50px;float:left;border:1px solid Black;margin:2px;background-color:#F98E8E;text-align:center");
            $("#total").append(div);
            if (columna == 10) {
                columna = 0;
                fila++;
            }
            this.Casillas[i] = new Casilla(i, null, false, fila, columna);
        }

    };

    this.llenarTablero = function () {
        tipoFicha = "blanca";
        for (i = 0; i < 60; i++) {
            this.Personas[i] = new Persona(i, tipoFicha, false);
            if (i == 30) {
                tipoFicha = "negra";
            }
            rnd = Math.round(Math.random() * 99);

            if (this.Casillas[rnd].getOcupada() == false) {
                this.Casillas[rnd].setPersona(this.Personas[i]);
                this.Casillas[rnd].setOcupada(true);
                img = document.createElement("img");
                img.setAttribute("id", "img" + this.Personas[i].getId());
                if (this.Personas[i].getColor() == "negra") {
                    img.setAttribute("src", "FichaNegra.png");
                }
                else if (this.Personas[i].getColor() == "blanca") {
                    img.setAttribute("src", "FichaBlanca.png");
                }
                img.setAttribute("width", "48px");
                img.setAttribute("height", "48px");
                this.Personas[i].setImg(img.getAttribute("src"));
                $("#" + rnd).append(img);
            }
            else {
                i--;
            }
        }
    };
    this.casillasDisponibles = function (color) {
        for (var i = 0; i <= 99; i++) {
            if (this.Casillas[i].getPersona() != null) { 
                
            }
        }
    };
    this.comprobarFichas = function (idNorma) {
        for (var i = 0; i <= 99; i++) {
            if (this.Casillas[i].getPersona() != null) {

                vecinas = new Array();
                if (this.Casillas[i].getColumna() == 0 && this.Casillas[i].getFila() == 0) {
                    vecinas[0] = this.Casillas[i + 10];
                    vecinas[1] = this.Casillas[i + 11];
                    vecinas[2] = this.Casillas[i + 1];
                }
                else if (this.Casillas[i].getColumna() == 9 && this.Casillas[i].getFila() == 0) {
                    vecinas[0] = this.Casillas[i + 10];
                    vecinas[1] = this.Casillas[i + 9];
                    vecinas[2] = this.Casillas[i - 1];
                }
                else if (this.Casillas[i].getColumna() == 0 && this.Casillas[i].getFila() == 9) {
                    vecinas[0] = this.Casillas[i - 10];
                    vecinas[1] = this.Casillas[i - 9];
                    vecinas[2] = this.Casillas[i + 1];
                }
                else if (this.Casillas[i].getColumna() == 9 && this.Casillas[i].getFila() == 9) {
                    vecinas[0] = this.Casillas[i - 10];
                    vecinas[1] = this.Casillas[i - 11];
                    vecinas[2] = this.Casillas[i - 1];
                }
                else if (this.Casillas[i].getColumna() == 0) {
                    vecinas[0] = this.Casillas[i - 10];
                    vecinas[1] = this.Casillas[i - 9];
                    vecinas[2] = this.Casillas[i + 1];
                    vecinas[3] = this.Casillas[i + 10];
                    vecinas[4] = this.Casillas[i + 11];
                }
                else if (this.Casillas[i].getColumna() == 9) {
                    vecinas[0] = this.Casillas[i - 10];
                    vecinas[1] = this.Casillas[i - 11];
                    vecinas[2] = this.Casillas[i - 1];
                    vecinas[3] = this.Casillas[i + 10];
                    vecinas[4] = this.Casillas[i + 9];
                }
                else if (this.Casillas[i].getFila() == 0) {
                    vecinas[0] = this.Casillas[i + 10];
                    vecinas[1] = this.Casillas[i + 1];
                    vecinas[2] = this.Casillas[i + 11];
                    vecinas[3] = this.Casillas[i + 9]
                    vecinas[4] = this.Casillas[i - 1];
                }
                else if (this.Casillas[i].getFila() == 9) {
                    vecinas[0] = this.Casillas[i - 10];
                    vecinas[1] = this.Casillas[i + 1];
                    vecinas[2] = this.Casillas[i - 11];
                    vecinas[3] = this.Casillas[i - 9]
                    vecinas[4] = this.Casillas[i - 1];
                }
                else {
                    vecinas[0] = this.Casillas[i - 11];
                    vecinas[1] = this.Casillas[i - 10];
                    vecinas[2] = this.Casillas[i - 9];
                    vecinas[3] = this.Casillas[i - 1];
                    vecinas[4] = this.Casillas[i + 1];
                    vecinas[5] = this.Casillas[i + 9];
                    vecinas[6] = this.Casillas[i + 10];
                    vecinas[7] = this.Casillas[i + 11];

                }
                if (idNorma == 1) {
                    if (this.Norma1.ComprobarVecinos1(this.Casillas[i], vecinas) == true) {
                        this.Casillas[i].getPersona().setOk(true);
                        if (this.Casillas[i].getPersona().getColor() == "blanca") {
                            this.Casillas[i].getPersona().setImg("FichaBlancaOk.png");
                            $("#" + this.Casillas[i].getId()).empty();
                            $("#" + this.Casillas[i].getId()).append(this.Casillas[i].getPersona().getImg());
                        }
                        else {
                            this.Casillas[i].getPersona().setImg("FichaNegraOk.png");
                            $("#" + this.Casillas[i].getId()).empty();
                            $("#" + this.Casillas[i].getId()).append(this.Casillas[i].getPersona().getImg());
                        }

                    }
                    else {
                        this.Casillas[i].getPersona().setOk(false);
                    }
                }
                else if (idNorma == 2) {
                    if (this.Norma1.ComprobarVecinos2(this.Casillas[i], vecinas) == true) {
                        this.Casillas[i].getPersona().setOk(true);
                        if (this.Casillas[i].getPersona().getColor() == "blanca") {
                            this.Casillas[i].getPersona().setImg("FichaBlancaOk.png");
                            $("#" + this.Casillas[i].getId()).empty();
                            $("#" + this.Casillas[i].getId()).append(this.Casillas[i].getPersona().getImg());
                        }
                        else {
                            this.Casillas[i].getPersona().setImg("FichaNegraOk.png");
                            $("#" + this.Casillas[i].getId()).empty();
                            $("#" + this.Casillas[i].getId()).append(this.Casillas[i].getPersona().getImg());
                        }

                    }
                    else {
                        this.Casillas[i].getPersona().setOk(false);
                    }
                }
            }
        }
    }
}

function Juego() {
    this.tablero = new Tablero();
    this.normaActual = new Norma(1, "Norma1");
    this.idNorma = 1;
    this.preparar = function () {
        this.tablero.crear();
        this.tablero.llenarTablero();
        this.tablero.comprobarFichas(this.idNorma);
    };

    this.setNormaActual = function (norma) {
        this.normaActual = norma;
    };

    this.getNormaActual = function () {
        return this.normaActual;
    };

    this.defNorma = function (num) {
        this.idNorma = num;
    };

    this.getIdNorma = function () {
        return this.idNorma;
    };
}

function Norma(id, nombre) {
    this.id = id;
    this.nombre = nombre;

    this.ComprobarVecinos1 = function (casilla1, vecinas) {
        var ve = 0;
        if (casilla1.getPersona() != null) {
            for (y = 0; y < vecinas.length ; y++) {
                if (vecinas[y].getPersona() != null) {
                    if (casilla1.getPersona().getColor() == vecinas[y].getPersona().getColor()) {
                        ve++;
                    }
                }
            }
            if (ve > 2) {
                return true;
            }
            else {
                return false;
            }
        }

    };

    this.ComprobarVecinos2 = function (casilla1, vecinas) {
        var ve = false;
        if (casilla1.getPersona() != null) {
            for (y = 0; y < vecinas.length; y++) {
                if (vecinas[y].getPersona() != null) {
                    if (casilla1.getPersona().getColor() != vecinas[y].getPersona().getColor()) {
                        ve = true;
                    }
                }
            }
            if (ve == true) {
                return true;
            }
            else {
                return false;
            }
        }
    };
}