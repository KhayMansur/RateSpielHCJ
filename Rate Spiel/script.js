let zufallsZahl;
let count = 1;

const eingabe = document.getElementById("guessInput");
const feedback = document.getElementById("feedback");
const rangeMessage = document.getElementById("rangeMessage");
const restartButton = document.getElementById("restartButton"); 
const guessButton = document.getElementById("guessButton");
const levelForm = document.getElementById("levelForm");

guessButton.addEventListener("click", handleInput);         // hier wird handleInput ausgeführt sobald man auf den Button klickt    
eingabe.addEventListener("keypress", (e) => e.key === "Enter" && handleInput());        //führt handleInput aus wenn man auf "ENTER" klickt
restartButton.addEventListener("click", resetGame);             //hier wird resetGame ausgeführt wenn man auf den Neustart Button klickt

levelForm.addEventListener("change", () => {            // eine Annonyme Funktion die einmal erstellt wird und nicht wo anderst aufgerufen werden kann. "=>" Arrow Function, change wird ausgelöst sobald ein schwierigkeitsgrad ausgewählt wird.
    const selectedValue = getSelectedValue();           //die Funktion sucht nach dem Ausgewählten schwierigkeitsgrad und gibt den Wert zurück zB 1-100 
    initializeGame(selectedValue);                      //je nachdem was ausgewählt wurde wird eine neue Zahl generiert und das spiel neu gestartet
});

function getSelectedValue() {                           
    return parseInt(document.querySelector('input[name="selectedLvl"]:checked').value);        //value greift auf den Wer den Wert des Buttons zu. zB 50,100 oder 200
}                                                                                              //parseInt wandelt den String in eine ganz Zahl um        

function setRandomNumber(max) {                             
    zufallsZahl = Math.floor(Math.random() * max) + 1;                      // Die Zufällige Zahl (zwischen 0 und 1) wird generiert und mit "max" multipliziert, mit math.floor  
}

function initializeGame(max) {                                              
    setRandomNumber(max);
    count = 1;                                                                //Die Variable wird wieder auf 1 gesetzt 
    feedback.textContent = "";
    feedback.style.color = ""; 
    eingabe.disabled = false;                                                // hindert das eingeben einer Zahl wenn man noch keinen LVL ausgewählt hat
    guessButton.disabled = false;
    eingabe.max = max;
    eingabe.min = 1;
    rangeMessage.textContent = `Und jetzt versuch die Zahl zwischen 1 und ${max} zu erraten!`;
    restartButton.style.display = "none";
}

function handleInput() {
    const eingabeWert = parseInt(eingabe.value);
    const maxInput = getSelectedValue();

    if (!eingabeWert || eingabeWert < 1 || eingabeWert > maxInput) {                    //! ist das Negationsoperator, in dem falls setzt er werte auf true (wenn keine da sind) um die if schleife zu triggern
        feedback.textContent = `Gib eine Zahl zwischen 1 und ${maxInput} ein.`;
        feedback.style.color = ""; 
    } else if (eingabeWert === zufallsZahl) {
        feedback.textContent = `Stark! Du hast es in ${count} Versuchen erraten!`;
        feedback.style.color = "green"; 
        restartButton.style.display = "block";                                              //lässt Button im eigenen Container erscheinen
        document.getElementById('guessInput').disabled = true;
        document.getElementById('guessButton').disabled = true;
    } else {
        feedback.textContent = eingabeWert > zufallsZahl ? 'Zu hoch! Es ist niedriger.' : 'Zu niedrig! Es ist höher.';  // if eingabeWert > zufallsZahl ist true dann 'Zu hoch! Es ist niedriger.' else{'Zu niedrig! Es ist höher.'}
        feedback.style.color = "red"; 
        count ++;
    }

    eingabe.value = ''; 
}

function resetGame() {
    initializeGame(getSelectedValue());
    document.getElementById('guessInput').disabled = false;                                    //ist dafür da das die guessInput und guessButton nicht mehr funktionierren.
    document.getElementById('guessButton').disabled = false;
}
