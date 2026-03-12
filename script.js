//define variables and set up game
let h1 = document.getElementById("h1")
let guard = document.getElementById("Guard")
let guardBreak = document.getElementById("Guard Break")
let thrust = document.getElementById("Thrust")
let counter = document.getElementById("Counter")
let p1 = document.getElementById("p1")
let p2 = document.getElementById("p2")
let p3 = document.getElementById("p3")
let pSprite = document.getElementById("playerSprite")
let oSprite = document.getElementById("opponentSprite")
let actions = ["guard", "guardBreak", "thrust", "counter"]
let images = ["guard.png", "guardBreak.png", "thrust.png", "counter.png"]
let fight = 1
let playerLife = 1
let counterCounter = 0;
let oHealth = 1
let deathBackgound = "url(deathScreenBackground.png)"
let reset = document.createElement("button");
let goNext = document.createElement("button");
let attempts = 0;
let guardNum = 0;
let oTotal = 1;
reset.innerText = "Reset"
reset.style.display = "none"
goNext.innerText = "Continue"
goNext.style.display = "none"

window.addEventListener("load", battle1)


function battle1(){

    //adjust counters for restricted events
    counterCounter = 0;
    attempts++;
    guardNum++;

    //set background and interactables to default values
    document.getElementById("body").style.backgroundImage ="url(background.png)";
    document.getElementById("health-bar").style.display = "block"
    p2.style.display = "none"
    oSprite.style.display = "block";
    pSprite.style.display = "block";
    guard.style.display = "block";
    thrust.style.display = "block";
    guardBreak.style.display = "block";
    counter.style.display = "block";
    h1.style.display = "block";
    p1.innerText = "";
    oSprite.src = "sprite.png";
    pSprite.src = "sprite.png";
    reset.style.display = "none";
    setHealth(100)


    //prevent duplicate event listeners
    if (attempts == 1){
        guard.addEventListener("click", function(){
            chooseAction("guard");
        })
        guardBreak.addEventListener("click", function(){
            chooseAction("guardBreak");
        })
        thrust.addEventListener("click", function(){
            chooseAction("thrust");
        })
        counter.addEventListener("click", function(){
            chooseAction("counter");
        })
}
}

//choose enemy action and adjust sprite
function eAct(){
    let choice = Math.floor(Math.random()*4)
    let oAct = actions[choice];
    oSprite.src = images[choice]
    return oAct
}

//change player sprite and begin combat functionality
function chooseAction(act){
    let oAct = eAct()
    if (act == "guard") {
        pSprite.src = "guard.png";
    } else if (act == "guardBreak") {
        pSprite.src = "pGuardBreak.png";
    } else if (act == "counter") {
        pSprite.src = "pCounter.png";
    } else if (act == "thrust") {
        pSprite.src = "pThrust.png";
    } else {

    }
    turn(act, oAct)
}

//combat handling
function turn(act, oAct){

    //prevent multiple counters by the player per combat
    if (counterCounter > 0 && act == "counter"){
        deathScreen()
}

    //logic handling for combat choices
    else {
        switch (act){
            case "counter":
                counterCounter++;
                switch (oAct){
                    case "guardBreak":
                        oHealth -= 1;
                        setHealth(100*(oHealth/oTotal))
                        break
                    case "thrust":
                        oHealth -= 1;
                        setHealth(100*(oHealth/oTotal))
                        break
                }
                break;
            case "guardBreak":
                switch (oAct){
                    case "thrust":
                        deathScreen();
                        break;
                    case "counter":
                        deathScreen();
                        break;
                    case "guard":
                        oHealth -= 1;
                        setHealth(100*(oHealth/oTotal))
                        
                }
                break;
            case "guard":
                switch (oAct){
                    case "thrust":
                        console.log(act, oAct);
                        break;
                    case "guardBreak":
                        console.log(act, oAct);
                        deathScreen();
                        break;
                }
                break;
            case "thrust":
                switch (oAct){
                    case "guardBreak":
                        console.log(act, oAct);
                        oHealth -= 1;
                        setHealth(100*(oHealth/oTotal))
                        break;
                    case "counter":
                        console.log(act, oAct);
                        deathScreen();
                        break;
                }
                break;
        }
    }
    if (oHealth <= 0) {
        nextFight()
    }
}

//
function deathScreen(){
    oSprite.style.display = "none";
    pSprite.style.display = "none";
    guard.style.display = "none";
    thrust.style.display = "none";
    guardBreak.style.display = "none";
    counter.style.display = "none";
    h1.style.display = "none";
    p1.innerText = "You Lose";
    document.getElementById("health-bar").style.display = "none"
    document.getElementById("body").style.backgroundImage = deathBackgound;
    console.log(document.getElementById("body"))
    document.getElementById("body").appendChild(reset)
    reset.style.display = "flex"
    reset.style.marginRight = "auto"
    reset.style.marginLeft = "auto"
    reset.style.justifyContent = "center"
    reset.addEventListener("click", battle1)
    fight = 1;
    oHealth = 1;

}

function nextFight(){
    setHealth(100)
    fight++;
    document.getElementById("health-bar").style.display = "none"
    p2.innerText = "You Won the Fight!"
    p2.style.display = "block"
    oSprite.style.display = "none";
    pSprite.style.display = "none";
    guard.style.display = "none";
    thrust.style.display = "none";
    guardBreak.style.display = "none";
    counter.style.display = "none";
    h1.style.display = "none";
    document.getElementById("body").appendChild(goNext)
    goNext.style.display = "flex"
    goNext.style.marginRight = "auto"
    goNext.style.marginLeft = "auto"
    goNext.style.justifyContent = "center"
    document.getElementById("body").style.backgroundImage = "url(continue.jpg)"
    goNext.addEventListener("click", battle)
}

function battle(){
    goNext.style.display = "none"
    p2.innerText = ""
    if (fight == 2){
        oHealth = 2
        oTotal = 2
        battle1()
    } else if (fight == 3){
        oHealth = 4
        oTotal = 4
        battle1()
    } else if (fight == 4){
        oHealth = 10
        oTotal = 10
        battle1()
    }
}

function setHealth(percent) {
  document.getElementById("healthFill").style.width = percent + "%";
}