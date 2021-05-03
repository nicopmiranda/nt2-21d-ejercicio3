new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
        curacion: 10,
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos = [];
        },
        atacar: function () {
            let ataque = this.calcularHeridas(this.rangoAtaque);
            this.saludMonstruo -= ataque;
            this.turnos.unshift({
                esJugador: true,
                texto: 'El jugador golpea al monstruo por ' + ataque
            });

            if(this.verificarGanador()){
                return;
            }

            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            let ataque = this.calcularHeridas(this.rangoAtaqueEspecial);
            this.saludMonstruo -= ataque;
            this.turnos.unshift({
                esJugador: true,
                texto: 'El jugador golpea duramente al monstruo por ' + ataque
            });

            if(this.verificarGanador()){
                return;
            }

            this.ataqueDelMonstruo();
        },

        curar: function () {
            this.saludJugador <= 90 ? this.saludJugador += this.curacion : this.saludJugador = 100;
            this.turnos.unshift({
                esJugador: true,
                texto: 'El jugador se cura por ' + this.curacion
            });
            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
        },
        
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
        },

        ataqueDelMonstruo: function () {
            let ataque = this.calcularHeridas(this.rangoAtaqueDelMonstruo);
            this.saludJugador -= ataque;
            this.turnos.unshift({
                esJugador: false,
                texto: 'El monstruo lastima al jugador por ' + ataque
            });

            this.verificarGanador();
        },

        calcularHeridas: function (rango) {
            return Math.floor(Math.random() * (rango[1] - rango[0] + 1) + rango[0]);
        },
        verificarGanador: function () {
            if(this.saludMonstruo <= 0){
                confirm('Ganaste! Jugar de nuevo?') ? this.empezarPartida() : this.hayUnaPartidaEnJuego = false;
                return true;
            } else if(this.saludJugador <= 0){
                confirm('Perdiste! Jugar de nuevo?') ? this.empezarPartida() : this.hayUnaPartidaEnJuego = false;
                return true;
            }

            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});