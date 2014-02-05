var tableroGlobal;
function Persona(id, colo, ok, comprobarVecinos, devolverVecinos, casilla2) {
    var id = id;
    var color = colo;
    var ok = ok;
    var img = document.createElement("img");
    var callback1 = comprobarVecinos;
    var callback2 = devolverVecinos;
    var casilla = casilla2;
    this.comportamiento = function () {
        return callback1(callback2(casilla), this);
    };

    this.setCasilla = function (c) {
        casilla = c;
    }
    this.getId = function () {
        return id;
    };

    this.getImg = function () {
        return img;
    };

    this.getColor = function () {
        return color;
    };

    this.getOk = function () {
        return ok;
    };

    this.setColor = function (col) {
        color = col;
    };
    this.setImg = function (img2) {
        img.setAttribute("src", img2);
        img.setAttribute("width", "48px");
        img.setAttribute("height", "48px");
        img.setAttribute("id", "img" + this.id);
    };

    this.setOk = function (ok2) {
        ok = ok2;
        if (ok2 == true) {
            if (this.getColor() == "blanca") {
                this.setImg("FichaBlancaOk.png");
            }
            else {
                this.setImg("FichaNegraOk.png");
            }
        }
        else {
            if (this.getColor() == "blanca") {
                this.setImg("FichaBlanca.png");
            }
            else {
                this.setImg("FichaNegra.png");
            }
        }

    };
}

function Casilla(id, persona, ocupada, fila, columna) {
    var id = id;
    var persona = persona;
    var ocupada = ocupada;
    var fila = fila;
    var columna = columna;

    this.getId = function () {
        return id;
    };

    this.getPersona = function () {
        return persona; 
    };

    this.getOcupada = function () {
        return ocupada;
    };

    this.getFila = function () {
        return fila;
    };

    this.getColumna = function () {
        return columna;
    };

    this.setPersona = function (persona2) {
        persona = persona2;
    };

    this.setOcupada = function (ocupada2) {
        ocupada = ocupada2;
    };

    this.borrarPersona = function () {
        if (persona != null) {
            persona = null;
            ocupada = false;
        }
    };

    this.hayPersona = function () {
        if (persona != null) {
            return true;
        }
        else {
            return false;
        }
    };
}

function Tablero() {
    this.Casillas = new Array();
    this.Personas = new Array();
    this.Norma1 = new Norma(1, "Norma1");
    this.casillaSeleccionada = null;
    this.getCasillas = function () {
        return this.Casillas;
    };
    //>>>>>>>>>>>>>>>>>>>>>>>
    this.crear = function (idnorma) {
        fila = 0;
        columna = 0;
        casillas = this.Casillas;
        posibles = new Array();
        for (var i = 0; i < 100; i++, columna++) {
            div = document.createElement("div");
            div.setAttribute("id", i);
            div.setAttribute("style", "width:50px;height:50px;float:left;border:1px solid Black;margin:2px;background-color:#A9BCF5;text-align:center");
            $("#total").append(div);
            $(div).click({ id: i, tab: this }, function (evento) {
                tab = evento.data.tab;
                if (casillas[evento.data.id].hayPersona() == true && casillas[evento.data.id].getPersona().getOk() == false) {
                    tab.casillaSeleccionada = casillas[evento.data.id];
                    if (posibles == null)
                        posibles = tab.comprobarEstadoVacias(tab.casillaSeleccionada, idnorma, norma, tab.Casillas);
                    else {
                        for (a = 0; a < posibles.length; a++) {
                            $("#" + posibles[a].getId()).attr("style", "width:50px;height:50px;float:left;border:1px solid Black;margin:2px;text-align:center;background-color:#A9BCF5");
                            if (posibles[a].getId() == casillas[evento.data.id].getId()) {
                                ok = true;
                                direccion = posibles[a];
                            }
                        }
                        posibles = tab.comprobarEstadoVacias(tab.casillaSeleccionada, idnorma, tab.Norma1, tab.Casillas);
                    }
                }
                else if (tab.estadoSeleccionada() == true && casillas[evento.data.id].hayPersona() == false) {
                    var ok = false;
                    var direccion;
                    for (a = 0; a < posibles.length; a++) {
                        $("#" + posibles[a].getId()).attr("style", "width:50px;height:50px;float:left;border:1px solid Black;margin:2px;text-align:center;background-color:#A9BCF5");
                        if (posibles[a].getId() == casillas[evento.data.id].getId()) {
                            ok = true;
                            direccion = posibles[a];
                        }
                    }
                    if (ok == true) {
                        $("#" + direccion.getId()).append(tab.casillaSeleccionada.getPersona().getImg());
                        direccion.setPersona(tab.casillaSeleccionada.getPersona());
                        tab.casillaSeleccionada.borrarPersona();
                        $("#" + tab.casillaSeleccionada.getId()).empty();
                        direccion.getPersona().setCasilla(direccion);
                        tab.comprobarEstadoTablero();
                    }
                }
            });
            if (columna == 10) {
                columna = 0;
                fila++;
            }
            this.Casillas[i] = new Casilla(i, null, false, fila, columna);
        }
    };
    //>>>>>>>>>>>>>>>>
    this.llenarTablero = function (idNorma) {
        tipoFicha = "blanca";
        for (i = 0; i < 60; i++) {
           
            if (i == 30) {
                tipoFicha = "negra";
            }
            rnd = Math.round(Math.random() * 99);
            if (this.Casillas[rnd].getOcupada() == false) {
                 if (idNorma == 1) {
                     this.Personas[i] = new Persona(i, tipoFicha, false, this.Norma1.ComprobarVecinos1, this.devolverVecinos, this.Casillas[rnd], this);
                }
                else {
                    this.Personas[i] = new Persona(i, tipoFicha, false, this.Norma1.ComprobarVecinos2, this.devolverVecinos, this.Casillas[rnd], this);
                }
                this.Casillas[rnd].setPersona(this.Personas[i]);
                this.Casillas[rnd].setOcupada(true);
                img = document.createElement("img");
                img.setAttribute("id", "img" + rnd);
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

    this.estadoSeleccionada = function () {
        if (this.casillaSeleccionada != null && this.casillaSeleccionada.getPersona() != null) {
            return true;
        }
        else if (this.casillaSeleccionada != null && this.casillaSeleccionada.getPersona() == null) {
            return false;
        }
        else {
            return false;
        }
    };

    this.devolverVecinos = function (casilla) {
        vecinas = new Array();
        casillas = new Array();
        casillas = tableroGlobal.getCasillas();
        if (casilla.getColumna() == 0 && casilla.getFila() == 0) {
            vecinas[0] = casillas[casilla.getId() + 10];
            vecinas[1] = casillas[casilla.getId() + 11];
            vecinas[2] = casillas[casilla.getId() + 1];
        }
        else if (casilla.getColumna() == 9 && casilla.getFila() == 0) {
            vecinas[0] = casillas[casilla.getId() + 10];
            vecinas[1] = casillas[casilla.getId() + 9];
            vecinas[2] = casillas[casilla.getId() - 1];
        }
        else if (casilla.getColumna() == 0 && casilla.getFila() == 9) {
            vecinas[0] = casillas[casilla.getId() - 10];
            vecinas[1] = casillas[casilla.getId() - 9];
            vecinas[2] = casillas[casilla.getId() + 1];
        }
        else if (casilla.getColumna() == 9 && casilla.getFila() == 9) {
            vecinas[0] = casillas[casilla.getId() - 10];
            vecinas[1] = casillas[casilla.getId() - 11];
            vecinas[2] = casillas[casilla.getId() - 1];
        }
        else if (casilla.getColumna() == 0) {
            vecinas[0] = casillas[casilla.getId() - 10];
            vecinas[1] = casillas[casilla.getId() - 9];
            vecinas[2] = casillas[casilla.getId() + 1];
            vecinas[3] = casillas[casilla.getId() + 10];
            vecinas[4] = casillas[casilla.getId() + 11];
        }
        else if (casilla.getColumna() == 9) {
            vecinas[0] = casillas[casilla.getId() - 10];
            vecinas[1] = casillas[casilla.getId() - 11];
            vecinas[2] = casillas[casilla.getId() - 1];
            vecinas[3] = casillas[casilla.getId() + 10];
            vecinas[4] = casillas[casilla.getId() + 9];
        }
        else if (casilla.getFila() == 0) {
            vecinas[0] = casillas[casilla.getId() + 10];
            vecinas[1] = casillas[casilla.getId() + 1];
            vecinas[2] = casillas[casilla.getId() + 11];
            vecinas[3] = casillas[casilla.getId() + 9]
            vecinas[4] = casillas[casilla.getId() - 1];
        }
        else if (casilla.getFila() == 9) {
            vecinas[0] = casillas[casilla.getId() - 10];
            vecinas[1] = casillas[casilla.getId() + 1];
            vecinas[2] = casillas[casilla.getId() - 11];
            vecinas[3] = casillas[casilla.getId() - 9]
            vecinas[4] = casillas[casilla.getId() - 1];
        }
        else {
            vecinas[0] = casillas[casilla.getId() - 11];
            vecinas[1] = casillas[casilla.getId() - 10];
            vecinas[2] = casillas[casilla.getId() - 9];
            vecinas[3] = casillas[casilla.getId() - 1];
            vecinas[4] = casillas[casilla.getId() + 1];
            vecinas[5] = casillas[casilla.getId() + 9];
            vecinas[6] = casillas[casilla.getId() + 10];
            vecinas[7] = casillas[casilla.getId() + 11];
        }
        return vecinas;
    };

    this.comprobarEstadoTablero = function () {
        for (var i = 0; i <= 99; i++) {

            if (this.Casillas[i].getPersona() != null) {
                if (this.Casillas[i].getPersona().comportamiento() == true) {
                    this.Casillas[i].getPersona().setOk(true);
                }
                else {
                    this.Casillas[i].getPersona().setOk(false);
                }
                $("#" + this.Casillas[i].getId()).empty();
                $("#" + this.Casillas[i].getId()).append(this.Casillas[i].getPersona().getImg());
            }

        }
    };
    this.comprobarEstadoVacias = function (casillaSelec, idNorma, norma, casillas) {
        var posibles = new Array();
        var y = 0;
        for (var i = 0; i <= 99; i++) {
            if (casillas[i].hayPersona() != true) {
                var comprobacion = this.devolverVecinos(casillaSelec);
                    var vecinas = new Array();
                    vecinas = this.devolverVecinos(casillas[i]);
                    if (idNorma == 1) {
                        if (norma.ComprobarVecinosVacia1(casillaSelec.getPersona(), casillaSelec, vecinas) == true) {
                            $("#" + casillas[i].getId()).attr("style", "width:50px;height:50px;float:left;border:1px solid Black;margin:2px;text-align:center;background-color:#5858FA");
                            posibles[y] = casillas[i];
                            y++;
                        }
                    }
                    else if (idNorma == 2) {
                        if (norma.ComprobarVecinosVacia2(casillaSelec.getPersona(), casillaSelec, vecinas) == true) {
                            $("#" + casillas[i].getId()).attr("style", "width:50px;height:50px;float:left;border:1px solid Black;margin:2px;text-align:center;background-color:#5858FA");
                            posibles[y] = casillas[i];
                            y++;
                        }
                    }
            }
        }
        return posibles;
    };
    
}

function Juego() {
    this.tablero = new Tablero();
    this.idNorma = 1;
    this.preparar = function () {
        this.tablero.crear(this.idNorma);
        this.tablero.llenarTablero(this.idNorma);
        tableroGlobal = this.tablero;
        this.tablero.comprobarEstadoTablero();
    };

    this.getTablero = function () {
        return this.tablero;
    };

    this.defNorma = function (num) {
        this.idNorma = num;
    };
    
    this.getIdNorma = function () {
        return this.idNorma;
    };
}

function Norma(nombre) {
    this.nombre = nombre;
    this.ComprobarVecinos1 = function (vecinas, p) {
        var ve = 0;
            for (y = 0; y < vecinas.length ; y++) {
                if (vecinas[y].getPersona() != null) {
                    if (p.getColor() == vecinas[y].getPersona().getColor()) {
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
    };

    this.ComprobarVecinos2 = function (vecinas, p) {
        var ve = false;
            for (y = 0; y < vecinas.length; y++) {
                if (this.vecinas[y].getPersona() != null) {
                    if (p.getColor() != vecinas[y].getPersona().getColor()) {
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

    };
    this.ComprobarVecinosVacia2 = function (persona, casilla1, vecinas) {
        var ve = false;
        for (y = 0; y < vecinas.length; y++) {
            if (vecinas[y].hayPersona() == true) {
                if (persona.getColor() != vecinas[y].getPersona().getColor() ) {
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

    };

    this.ComprobarVecinosVacia1 = function (persona, casilla1, vecinas) {
        var ve = 0;
        for (y = 0; y < vecinas.length; y++) {
            if (vecinas[y].hayPersona() == true) {
                if (persona.getColor() == vecinas[y].getPersona().getColor() && vecinas[y].getId() != casilla1.getId()) {
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
}