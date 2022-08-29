const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');

quoteInputElement.addEventListener('input', () => {
    const arrQuote = quoteDisplayElement.querySelectorAll('span');
    const arrValue = quoteInputElement.value.split('');

    let correct = true;
    arrQuote.forEach((characterSpan, index) => {
        const character = arrValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('inCorrect');
            correct = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('inCorrect');
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('inCorrect');
            correct = false;
        }
    })

    if (correct) {
        renderNewQuote();
    }
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerText = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    })
    quoteInputElement.value = null;
    startTimer();
}

let startTime
function startTimer() {
    timerElement.innerText = 0;
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote();

// ------------------------------KEYBOARD \/ \/ \/--------------------------

const keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null
    },

    properties: {
        value: "",
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        //Setup main elements
        this.elements.main.classList.add("keyboard-container");
        this.elements.keysContainer.classList.add("keyboard-keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
    },

   _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'backspace',
                'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
                    'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
        'space'
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
        return `<i class="material-icons">${icon_name}</i>`
    };

    keyLayout.forEach(key => {
        const keyElement = document.createElement("button");
        const insertLineBreak = ["backspace", "l", "?"].indexOf(key) !== -1;

        // Add attributes/classes
        keyElement.setAttribute("type", "button");
        keyElement.classList.add("keyboard-key");
        keyElement.classList.add(`key-${key}`);


        switch (key) {
            case "backspace":
                keyElement.classList.add("keyboard-key-wide");
                // keyElement.innerHTML = createIconHTML("backspace");
                keyElement.innerText = "Backspace";
                keyElement.classList.add(`key${key}`);

                keyElement.addEventListener("keydown", () => {
                    this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                    this._triggerEvent("oninput");
                })

                break;

            case "space":
                keyElement.classList.add("keyboard-key-wider");
                // keyElement.innerHTML = createIconHTML("space_bar");
                keyElement.innerText = "Space";
                keyElement.classList.add(`key${key}`);
    
                keyElement.addEventListener("keydown", () => {
                    this.properties.value += " ";
                    this._triggerEvent("oninput");
                })
    
                break;

            default:
                keyElement.textContent = key.toLowerCase();
    
                keyElement.addEventListener("keydown", () => {
                    this._triggerEvent("oninput");
                })
    
                break;
        }

        window.addEventListener('keydown', function (e) {
            let keyPressed = e.key

            console.log(keyPressed);

            if(keyPressed === keyElement.innerText || keyPressed === keyElement.innerText["period"] || keyPressed === keyElement.innerText["Backspace"]){
                keyElement.classList.add("keyboardKeyActive");
                console.log();
            }else if(keyPressed !== keyElement.innerText || keyPressed !== keyElement.innerText["period"] || keyPressed !== keyElement.innerText["Backspace"]){
                keyElement.classList.remove("keyboardKeyActive");
            }else {
                keyElement.classList.remove("keyboardKeyActive");
            }
          }, false);

        fragment.appendChild(keyElement);

        if (insertLineBreak) {
            fragment.appendChild(document.createElement("br"));
        }
    });

    return fragment;
   },
   
   _triggerEvent(handlerName) {
    console.log("Event Triggered! Event Name: " + handlerName);
   },
};

window.addEventListener("DOMContentLoaded", function () {
    keyboard.init();
})