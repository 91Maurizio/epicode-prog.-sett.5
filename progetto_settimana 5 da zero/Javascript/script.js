//FAR GIRARE LE CARTE

//creo una costante di nome carte in cui ci metto tutti gli elementi del memory all'interno
const carte = document.querySelectorAll('.memory')

/*Devo sapere quando viene il primo click o il secondo per aplicarne la logica */
let primoClick = false;
let bloccaCarte =false;
let primaCarta;
let secondaCarta;

//funzione giraCarta
function giraCarta() {
    if(bloccaCarte)
    return;
    //doppio click sulla carta non funziona
    if (this === primaCarta)
    return;
    //console.log('cliccato!');
    //console.log(this);
    this.classList.add('flip');

    if (!primoClick) {
        primoClick = true;
        primaCarta = this;
        //console.log(primoClick, primaCarta)x
        return;
    }

    secondaCarta = this;
    //console.log(primoClick, secondaCarta)

    //SONO UGUALI?
    //console.log(primaCarta.dataset.frames);
    //console.log(secondaCarta.dataset.frames);
    if (primaCarta.dataset.framework === secondaCarta.dataset.framework) {
        //è uguale!!
        primaCarta.removeEventListener('click', giraCarta);
        secondaCarta.removeEventListener('click', giraCarta);
    } else {
        //nonè uguale
        setTimeout(() => {
            primaCarta.classList.remove('flip');
            secondaCarta.classList.remove('flip');
        }, 1500);
    }
    //console.log('niente flipback') --- funziona ---
    controlloCoppia();

}
function controlloCoppia() {
    if (primaCarta.dataset.framework === secondaCarta.dataset.framework) {
        disabilita();

    } else {
        noFlip();
    }

}
function disabilita() {
    primaCarta.removeEventListener('click', giraCarta);
    secondaCarta.removeEventListener('click', giraCarta);

    reset();
}
function noFlip() {
    bloccaCarte = true;

    setTimeout(() => {
        primaCarta.classList.remove('flip');
        secondaCarta.classList.remove('flip');

        reset();
    }, 1500);
}

function reset(){
    [primoClick, bloccaCarte] = [false, false];
    [primaCarta, secondaCarta] = [null, null];
}
//EVERY DAY I'M SHUFFLEING
//(IIFE)[IMMEDIATELY INVOKED FUNCION EXPRESSION] così che si randomizza all'inizio della partita
(function shuffle(){
    carte.forEach(carte => {
        let random = Math.floor(Math.random() * 24);
        carte.style.order = random;
    });
})();


//looppo la lista e ci attacco un eventListner 'click' ed eseguo la funzione giraCarta
carte.forEach(carta => carta.addEventListener('click', giraCarta))