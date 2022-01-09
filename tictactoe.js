"use strict";
//erstmal ein paar globale konstante festgelegt
const xStein = 'x';
const oStein = 'circle';
const gewinnerKominationen = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const felderElements = document.querySelectorAll('[data-cell]');
const feld = document.getElementById('board');
const gewinnerElement = document.getElementById('gewinnerMessege');
const neueRundeButton = document.getElementById('neueRundeButton');
const gewinnerTextElement = document.querySelector('[data-winning-message-text]');
let oTurn;
starteSpiel();
void neueRundeButton.addEventListener('click', starteSpiel);
//ein paar grundlegende sachen wie das man nur ein mal ein feld bedienen kann
function starteSpiel() {
    oTurn = false;
    felderElements.forEach(cell => {
        cell.classList.remove(xStein);
        cell.classList.remove(oStein);
        cell.removeEventListener('click', klickFunktion);
        cell.addEventListener('click', klickFunktion, { once: true });
    });
    gewinnerElement.classList.remove('show');
}
//hier wird festgelegt dass const cell das Ziel ist und was alles passieren soll wenn man drauf klickt
function klickFunktion(e) {
    const cell = e.target;
    const currentClass = oTurn ? oStein : xStein;
    setzeStein(cell, currentClass);
    if (prüfeGewinn(currentClass)) {
        endeSpiel(false);
    }
    else if (obUnentschieden()) {
        endeSpiel(true);
    }
    else {
        tausche();
    }
}
//hier wird geregelt wer wann eine messege bekommt
function endeSpiel(draw) {
    if (draw) {
        gewinnerTextElement.innerText = 'Draw!';
    }
    else {
        gewinnerTextElement.innerText = `${oTurn ? "O" : "X"} Wins!`;
    }
    gewinnerElement.classList.add('show');
    schwierigkeitsStufe--;
    tocounter();
}
//wenn alles voll mit x und o ist ist es ein unentschieden
function obUnentschieden() {
    return [...felderElements].every(cell => {
        return cell.classList.contains(xStein) || cell.classList.contains(oStein);
    });
}
//je nachdem wer gerade am zug ist setzt seinen stein
function setzeStein(cell, currentClass) {
    cell.classList.add(currentClass);
}
//wenn es erst oturn war dann ist es nicht mehr oturn
function tausche() {
    oTurn = !oTurn;
}
//hier wird geprüft ob eine kombinationsmöglichkeit zugetroffen ist
function prüfeGewinn(currentClass) {
    return gewinnerKominationen.some(combination => {
        return combination.every(index => {
            return felderElements[index].classList.contains(currentClass);
        });
    });
}
//# sourceMappingURL=tictactoe.js.map