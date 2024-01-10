const joc = document.getElementById('joc');
const btnReset = document.getElementById('btnreset');
let mutari = 0;
let jucator = "x";
let tabla = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

btnReset.addEventListener('click', restGame); 


joc.addEventListener('click', (e) => {
    const tg = e.target;
    let l = parseInt(tg.getAttribute('l'));
    let c = parseInt(tg.getAttribute('c'));

    if (tabla[l][c] !== null) return;

    tabla[l][c] = jucator;
    tg.textContent = jucator;
    mutari++;

    if (gameOver(l, c, jucator)) {
        alert(`Felicitări, ${jucator}! Ai câștigat`);
        btnReset.disabled = false;
    } else if (mutari === 9) {
        alert('Egalitate!');
        btnReset.disabled = false;
    } else {
        schimbaJucatorul();
    }
});

function gameOver(l, c, jucator) {
    let cnt = 0;

    for (let i = 0; i < 3; i++) {
        if (tabla[l][i] === jucator) cnt++;
    }

    if (cnt === 3) return true;

    cnt = 0;

    for (let i = 0; i < 3; i++) {
        if (tabla[i][c] === jucator) cnt++;
    }

    if (cnt === 3) return true;

    cnt = 0;

    if (l === c) {
        for (let i = 0; i < 3; i++) {
            if (tabla[i][i] === jucator) cnt++;
        }
    }

    if (cnt === 3) return true;

    return false;
}

function schimbaJucatorul() {
    jucator = (jucator === "x") ? "0" : "x";
    document.getElementById('jucator').textContent = jucator;
}

function restGame() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            tabla[i][j] = null;
        }
    }

    Array.from(joc.children).forEach(e => {
        e.textContent = null;
    });

    document.getElementById('jucator').textContent = jucator;
    mutari = 0;
}

function genereazaTabla() {
    let l, c;

    for (let i = 0; i < 9; i++) {
        let e = document.createElement('div');
        l = Math.floor(i / 3);
        c = i % 3;
        e.setAttribute('l', l);
        e.setAttribute('c', c);
        joc.appendChild(e);
    }
}

genereazaTabla();
