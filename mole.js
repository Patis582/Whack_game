let currMoleTile;
let currPlantTile;
let score = 0;
let gameover = false;
let start = document.getElementById("start");
let speedMole = 1000;
let speedPlant = 1000;
let moleInterval;
let plantInterval;
let moleClicked = false;

window.onload = function(){
    setGame();
}

function setGame(){
    for (let i = 0; i < 9; i++){
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    startIntervals();
}

function startIntervals(){
    moleInterval = setInterval(setMole, speedMole); //Every 2 seconds setMole is called
    plantInterval = setInterval(setPlant, speedPlant);
}

function resetMoleInterval(){
    clearInterval(moleInterval);
    moleInterval = setInterval(setMole, speedMole);
}

function resetPlantInterval(){
    clearInterval(plantInterval);
    plantInterval = setInterval(setPlant, speedPlant);
}

function getRandomTile(){
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole(){
    if (gameover) {
        return;
    }

    if (currMoleTile){
        currMoleTile.innerHTML = " ";
    }

    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();

    if (currPlantTile && currPlantTile.id === num){
        return;
    }

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);

    moleClicked = false;
}

function setPlant(){
    if (gameover) {
        return;
    }

    if (currPlantTile){
        currPlantTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();

    if (currMoleTile && currMoleTile.id === num){
        return;
    }

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile(){
    if (gameover){
        return;
    }

    if (this === currMoleTile){
        if (!moleClicked){
            score += 10;
            document.getElementById("score").innerText = score.toString();
            moleClicked = true;
        }

        if (speedMole > 500) {
            speedMole -= 50;
        }

        if (speedPlant > 500) {
            speedPlant -= 50;
        }

        resetMoleInterval();
        resetPlantInterval();
    } else if (this === currPlantTile){
        document.getElementById("start").style.visibility = "visible";
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameover = true;

        clearInterval(moleInterval);
        clearInterval(plantInterval);
    }
}

function startAgain(){
    gameover = false;
    document.getElementById("start").style.visibility = "hidden";

    score = 0;
    document.getElementById("score").innerText = score.toString();

    speedMole = 1000;
    speedPlant = 1000;

    startIntervals();
}
