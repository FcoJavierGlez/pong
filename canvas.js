/**
 * 
 * @author: manolohidalgo_
 * @since: 24-10-2020
 */


function cargaContextoCanvas(idCanvas) {
    let elemento = document.getElementById(idCanvas);
    if (elemento && elemento.getContext) {
        let context = elemento.getContext('2d');
        if (context) {
            return context;
        }
    }
    return FALSE;
}

let context;

window.onload = function () {
    let marcadorJ1 = document.getElementById("j1");
    let marcadorJ2 = document.getElementById("j2");
    let puntuacionJ1 = 0;
    let puntuacionJ2 = 0;
    let ganador = false;
    context = cargaContextoCanvas('miCanvas');
    if (context){
        // Variables
        posicionYJ1 =0;
        posicionYJ2 = 0;

        pelotaX = 20;
        pelotaY = 20;

        direccion = ["diagonalDerechaAbajo", "diagonalDerechaArriba", "diagonalIzquierdaAbajo", "diagonalIzquierdaArriba"];
        direccionElegida = direccion[0];
        // Escenario
        context.strokeRect(0, 0, 750, 500);

        // Jugador1
        context.fillStyle='red';
        context.fillRect(0,0,20,100);

        // Jugador2
        context.fillStyle='blue';
        context.fillRect(730,0,20,100);
        
        // Esto mueve la pelota
        setInterval(() => {
            // De derecha hacia abajo
            if (ganador) {
                finalizaPartida();
            }else if ((pelotaY <= 480 && direccionElegida == direccion[0]) || (pelotaX <= 730 && direccionElegida == direccion[0])){
                diagonalDerechaAbajo();
                dibujaPantalla();
                direccionElegida = direccion[0];
                if (pelotaX == 710 && rebote2()) cambiaDireccion();
                if (pelotaY == 480) cambiaDireccion();
                if (pelotaX == 730) puntuaJugador1();
            // De derecha hacia arriba
            } else if ((pelotaX <= 730 && direccionElegida == direccion[1]) || pelotaY <= 0 && direccionElegida == direccion[1]){
                diagonalDerechaArriba();
                dibujaPantalla();
                direccionElegida = direccion[1];
                if (pelotaX == 710 && rebote2()) cambiaDireccion();
                if (pelotaX == 730) puntuaJugador1(); // En este caso es punto para el J1
                if (pelotaY == 0) cambiaDireccion();
            // De Izquierda hacia arriba
            } else if ((pelotaY >= 0 && direccionElegida == direccion[3]) || pelotaX >= 0 && direccionElegida == direccion[3]){
                diagonalIzquierdaArriba();
                dibujaPantalla();
                direccionElegida = direccion[3];            
                if (pelotaY == 0) cambiaDireccion();
                if (pelotaX == 20 && rebote1()) cambiaDireccion();
                if (pelotaX == 0) puntuaJugador2();
            // De izquierda hacia abajo
            } else if ((pelotaX >= 0 && direccionElegida == direccion[2]) || pelotaY <= 480 && direccionElegida == direccion[2]){
                diagonalIzquierdaAbajo();
                dibujaPantalla();
                direccionElegida = direccion[2];
                if (pelotaX == 20 && rebote1()) cambiaDireccion();
                if (pelotaY == 480) cambiaDireccion();
                if (pelotaX == 0) puntuaJugador2();
            }
        }, 1);

        document.addEventListener("keydown",teclado);
        
    }


    function puntuaJugador1() {
        puntuacionJ1++;
        pelotaX = 375;
        pelotaY = 250;
        marcadorJ1.innerHTML = `Jugador 1: ${puntuacionJ1}`;
        direccionAleatoria();
        if (puntuacionJ1 == 10) ganador = true;
    }

    function puntuaJugador2() {
        puntuacionJ2++;
        pelotaX = 375;
        pelotaY = 250;
        marcadorJ2.innerHTML = `Jugador 2: ${puntuacionJ2}`;
        direccionAleatoria();
        if (ppuntuacionJ2 == 10) ganador = true;
    }

    function direccionAleatoria() {
        direccionElegida = direccion[Math.round(Math.random()*4)];
    }

    function rebote1() {
        // if (pelotaY >= posicionYJ2 && (pelotaY+20) <= (posicionYJ2+100)) return true;
        if (pelotaY >= posicionYJ1 && (pelotaY+20) <= (posicionYJ1+100)) return true;
        return false;
    }
    function rebote2() {
            if (pelotaY >= posicionYJ2 && (pelotaY+20) <= (posicionYJ2+100)) return true;
            // if (pelotaY >= posicionYJ1 && (pelotaY+20) <= (posicionYJ1+100)) return true;
            return false;
    }

    function cambiaDireccion() {
        if (direccionElegida == direccion[0] && pelotaY == 480){
            direccionElegida = direccion[1];
        } else if (direccionElegida == direccion[0] && pelotaX+20 == 730) {
            direccionElegida = direccion[2];
        } else if (direccionElegida == direccion[1] && pelotaX+20 == 730){
            direccionElegida = direccion[3]; 
        } else if (direccionElegida == direccion[1] && pelotaY == 0){
            direccionElegida = direccion[0];
        } else if (direccionElegida == direccion[2] && pelotaX-20 == 0){
            direccionElegida = direccion[0];
        } else if (direccionElegida == direccion[2] && pelotaY == 480){
            direccionElegida = direccion[3];
        } else if (direccionElegida == direccion[3] && pelotaX-20 == 0){
            direccionElegida = direccion[1];
        } else if (direccionElegida == direccion[3] && pelotaY == 0){
            direccionElegida = direccion[2];
        }
    }

    function dibujaPantalla(params) {
        // Escenario
        context.clearRect(0,0,750,500);
        context.strokeRect(0, 0, 750, 500);
        // Jugador 1
        context.fillStyle='red';
        context.fillRect(0,posicionYJ1,20,100);
        // Jugador 2
        context.fillStyle='blue';
        context.fillRect(730,posicionYJ2,20,100);
        // Pelota
        context.fillStyle='green';
        context.fillRect(pelotaX,pelotaY,20,20);
    }

    function finalizaPartida(params) {
        let jugadorGanador;
        if (puntuacionJ1 == 10){
            jugadorGanador = "Jugador 1";
        } else {
            jugadorGanador = "Jugador 2";
        }
        dibujaPantalla();
        context.clearRect(200, 125, 350, 250);
        context.fillStyle='rgba(255,0,30,1)';
        context.beginPath();
        context.fillRect(200, 125, 350, 200);
        context.fillStyle = 'black';
        context.font = "bold 81px Verdana";
        context.fillText("Ha ganado"+jugadorGanador, 250, 250, 250);
        context.closePath();
        context.fill();
    }

    function diagonalDerechaAbajo(params) {
        pelotaX += 1;
        pelotaY += 1;
    }

    function diagonalDerechaArriba(params) {
        pelotaX += 1;
        pelotaY -= 1;
    }

    function diagonalIzquierdaArriba(params) {
        pelotaX -= 1;
        pelotaY -= 1;
    }

    function diagonalIzquierdaAbajo(params) {
        pelotaX -= 1;
        pelotaY += 1;
    }

    function teclado(oEvent) {
        console.log(oEvent);
        if (oEvent.key == "ArrowDown"){
            moverJ2(20);
        } else if (oEvent.key == "ArrowUp"){
            moverJ2(-20);
        } else if (oEvent.key == "z" || oEvent.key == "Z"){
            moverJ1(20);
        } else if (oEvent.key == "a" || oEvent.key == "A"){
            moverJ1(-20);
        }
    }
    

    function moverJ1(movimiento){
        if ((posicionYJ1+movimiento) > 400 || (posicionYJ1+movimiento) < 0){
        } else {
            posicionYJ1 += movimiento;
            // Escenario
            context.clearRect(0,0,750,500);
            context.strokeRect(0, 0, 750, 500);
            // Jugador 1
            context.fillStyle='red';
            context.fillRect(0,posicionYJ1,20,100);
            // Jugador 2
            context.fillStyle='blue';
             context.fillRect(730,posicionYJ2,20,100);
        }
    }

    function moverJ2(movimiento){
        if ((posicionYJ2+movimiento) > 400 || (posicionYJ2+movimiento) < 0){

        } else {
            posicionYJ2 += movimiento;
            // Escenario
            context.clearRect(0,0,750,500);
            context.strokeRect(0, 0, 750, 500);
            // Jugador 1
            context.fillStyle='red';
            context.fillRect(0,posicionYJ1,20,100);
            // Jugador 2
            context.fillStyle='blue';
             context.fillRect(730,posicionYJ2,20,100);
        }
    }
}