let rubrica = [
    {
        nome: "Mario Rossi",
        email: "mario.rossi@gmail.com",
        tel: "3471234567"
    },
    {
        nome: "Beppe Verdi",
        email: "beppe.verdi@gmail.com",
        tel: "3351234567"
    }
]

window.onload = () => {
    generaHTMLCardContatti(rubrica);
}
function generaHTMLCardContatti(contatti) {
    const boxContatti = document.getElementById('boxContatti');
    let htmlCard = '';
    let contatore = 1;
    let indice = 0;
    boxContatti.innerHTML = '';
    for (const c of contatti) {
        htmlCard = `
    <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${contatore}. ${c.nome}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${c.email}</h6>
                    <p class="card-text">${c.tel}</p>
                    <button type="button" class="btn btn-danger" onclick='elimina(${indice})'>elimina</button>
                </div>
            </div>
    `;
        boxContatti.innerHTML += htmlCard;
        contatore++;
        indice++;
    }
}

//istruzioni collegate al bottone di aggiunta contatto nel form
function aggiungiContatto() {
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const tel = document.getElementById('numero');
    const boxMessaggio = document.getElementById('messaggio');
    const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const regexTel = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    // verifica input
    if (nome.value.trim() == '') {
        boxMessaggio.innerHTML = 'Il nome è obbligatorio';
        boxMessaggio.className = 'text-danger';
        return;
    } else {
        boxMessaggio.innerHTML = '';
    }
    if (!regexEmail.test(email.value.trim()) || email.value.trim() == '') {
        boxMessaggio.innerHTML = 'Email non valida';
        boxMessaggio.className = 'text-danger';
        return;
    } else {
        boxMessaggio.innerHTML = '';
    }
    if (!regexTel.test(tel.value.trim()) || tel.value.trim() == '') {
        boxMessaggio.innerHTML = 'Telefono non valido';
        boxMessaggio.className = 'text-danger';
        return;
    } else {
        boxMessaggio.innerHTML = '';
    }
    //se arriva qui i controlli sono superati 
    let nuovoContatto = {
        nome: nome.value,
        email: email.value,
        tel: tel.value
    };

    rubrica.push(nuovoContatto);
    generaHTMLCardContatti(rubrica);
    boxMessaggio.innerHTML = 'Contatto aggiunto con successo';
    boxMessaggio.className = 'text-success';
    // reset 
    nome.value = '';
    email.value = '';
    tel.value = '';
    textEmpty.innerHTML = '';


}

//istruzioni collegate al bottone di eliminazione di ogni card
function elimina(indice) {
    rubrica.splice(indice, 1);
    generaHTMLCardContatti(rubrica);
    messaggio.innerHTML = 'Contatto eliminato con successo';
    messaggio.className = 'text-success';
    //istruzioni nel caso non siano presenti contatti in rubrica
    if (rubrica.length == 0) {
        textEmpty.innerHTML = 'Non sono presenti contatti in rubrica';
        messaggio.innerHTML = '';

    }
}
//istruzioni ricerca contatto
function trovaContatto() {
    const inputCercaC = document.getElementById('inputCerca').value.toLowerCase();
    boxRisultato.innerHTML = '';
    //verifiche per accertarsi che nel campo ci sia scritto qualcosa
    if (inputCercaC == '') {
        document.querySelector('#boxCercaContatto span').innerHTML = 'Campo vuoto';
        return;
    }


    const contattiFiltrati = rubrica.filter(function (contatto) {
        return contatto.nome.toLowerCase() === inputCercaC
    });

    //verifiche per accertarsi che il contatto sia presente
    if (contattiFiltrati.length == 0) {
        document.querySelector('#boxCercaContatto span').innerHTML = 'Nessun contatto trovato';
    }
    else {
        generaHTMLContattiFiltrati(contattiFiltrati[0]);
        document.querySelector('#boxCercaContatto span').innerHTML = '';
    }
}

//istruzioni per generare html nel momento in cui c'è riscontro

function generaHTMLContattiFiltrati(contatto) {
    let html = '';
    html = `
    <br>
    <p>La tua ricerca ha prodotto questo risultato:</p>
    <div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">${contatto.nome}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${contatto.email}</h6>
        <p class="card-text">${contatto.tel}</p>
    </div>
</div>
    `;
    boxRisultato.innerHTML = html;

}