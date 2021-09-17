// get the amount of generated fields out of the url
const getAmount = () => {
    let newArray = window.location.search.split("=");
    return newArray[1];
}

//returns "true" if the user managed to find all the pairs
const winCondition = () => {
    return found === fieldAmount / 2;
}

//generates the View of whenn the game has been finished
const winView = () =>{
    fields.forEach(field => {
        field.style.display = "none";
    });
    const winText = document.createElement("h1");
    winText.innerHTML = "Congratulations!";
    document.getElementById("winDiv").appendChild(winText);
    winDiv.appendChild(winText);
}

//eventhandler for the "onclick" event. On the 1st and 2nd click the cklicked item will be assined to a variable (itemOne / itemTwo)
//on the 3rd click, the variable will be compared, the attempts will be updated, and it will be checked if the wincondition is met.
const compareItems = (event) => {
    
    if (clickCounter === 0){
        itemOne = event.target;
        itemOne.style.backgroundColor = itemOne.color;
        clickCounter++;
    } else if(clickCounter === 1 && event.target !== itemOne) {
        itemTwo = event.target;
        itemTwo.style.backgroundColor = itemTwo.color;
        clickCounter++;
    } else if(clickCounter === 2){
        if (itemTwo.color === itemOne.color){
            itemOne.style.visibility = "hidden";
            itemTwo.style.visibility = "hidden";
            found++;
            if (winCondition()){
                attemptDisplay.innerHTML = ++attempts;
                winView();
            }
        } else {
            itemOne.style.backgroundColor = "white";
            itemTwo.style.backgroundColor = "white";
        }
        itemOne = undefined;
        itemTwo = undefined;
        clickCounter = 0;
        attemptDisplay.innerHTML = ++attempts;
    }
}

// pushes 2 fields per color into an array
const createFields = (colors) => {
    colors.forEach(color =>{
        for(let i = 0; i<2; i++){
            const field = document.createElement("div");
            field.setAttribute("class", "field");
            field.color = color;
            field.addEventListener("click", compareItems);
            fields.push(field);
        }

    } );
}

//populates the grid with the generated fields on random positions,
const createPlayfield = fields => {
    const fieldsCopy = fields.slice();
    while(fieldsCopy.length !== 0){
        let randomIndex = Math.floor(Math.random()*fieldsCopy.length);
        grid.appendChild(fieldsCopy[randomIndex]);
        fieldsCopy.splice(randomIndex, 1);
    }
}

// GAME initialisation

// constant variables: array of predefined colors (the needed ones are copied into gameColors)
const colors = ["#3AF007","#00F2F5", "#0300F5", "#C600F5", "#F50105", "#F55D00", "#F5E000", "#A1F5EA", "#9FF58D", "#B1BDF5", "#E8A1F5", "#F59E96", "#F5CCAA", "#F5EF9A", "#00FABA", "#FAC400", "#855850", "#AFAFB3", "#373738", "#B46E75"];
const fieldAmount = getAmount();
const gameColors = colors.slice(0, fieldAmount / 2);
const fields = [];

// Initialize the needed DOM elements
const grid = document.querySelector(".grid");
const attemptDisplay = document.getElementById("attempts");

// control variables
let clickCounter = 0;
let found = 0;
let attempts = 0;
let itemOne;
let itemTwo;

// adjusts grid to the card-amount (purely cosmetic)
if (fieldAmount % 5 === 0){
    grid.style.gridTemplateColumns = `repeat(5, 1fr)`;
    grid.style.justifyItems = "center";
}else if (fieldAmount % 4 === 0){
    grid.style.gridTemplateColumns = `repeat(4, 1fr)`;
    grid.style.justifyItems = "center";
}

// generetes the fields(cards) => pushed them into the empty field array
createFields(gameColors);
//pupulates the playfield with the fields in the field array
createPlayfield(fields);
