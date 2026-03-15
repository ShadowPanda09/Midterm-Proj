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

try {
    let deathBackgound = "url(deathScreenBackground.png)"
} catch (error) {
    console.log(error)
}

let reset = document.createElement("button");
let goNext = document.createElement("button");
let attempts = 0;
let guardNum = 0;
let oTotal = 1;
let newGame;
let guardCounter;
let proceed = document.createElement("button");
let intermission = 0;
let secret = false;
let pAct = [];
reset.innerText = "Reset"
reset.style.display = "none"
goNext.style.display = "none"
proceed.style.display = "none"

window.addEventListener("load", battle1)


function battle1(){

    //adjust counters for restricted events
    counterCounter = 0;
    attempts++;
    guardNum++;
    guardCounter = 0;

    //set background and interactables to default values
    document.getElementById("body").style.backgroundImage ="url(background.png)";
    document.getElementById("health-bar").style.display = "block"
    p2.style.display = "none"
    p3.innerText = ""
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
    oSprite.style.height = "150px";
    oSprite.style.width = "150px";
    oSprite.style.marginRight = "32%";
    oSprite.style.marginLeft = "68%";
    document.getElementById("health-bar").style.marginTop = "15%"
    h1.style.color = "black"
    h1.innerText = "Chronicle"
    secret = false
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
    pAct.push(act)
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
                guardCounter++;
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

    //Establishing criteria for Secret Ending path
    if (act != "guard"){
        guardCounter = 0
    } else if (guardCounter == 2 && intermission == 0){
        proceed.innerText = "proceed?"
        proceed.style.display = "flex"
        proceed.style.marginRight = "auto"
        proceed.style.marginLeft = "auto"
        proceed.style.justifyContent = "center"
        document.getElementById("body").appendChild(proceed)
        proceed.addEventListener("click", intermission1)
    } else if (guardCounter == 3 && intermission == 1){
        proceed.style.display = "flex"
        proceed.removeEventListener("click", intermission1)
        proceed.addEventListener("click", intermission2)
    } else if (guardCounter == 4 && intermission == 2){
        proceed.style.display = "flex"
        proceed.removeEventListener("click", intermission2)
        proceed.addEventListener("click", intermission3)
    }


    //Checking for fight progression or 3rd ending
    if (oHealth <= 0 && secret == true) {
        defeat()
    } else if (oHealth <= 0){
        nextFight()
    }
}

//1st Ending Screen
function deathScreen(){
    oSprite.style.display = "none";
    pSprite.style.display = "none";
    guard.style.display = "none";
    thrust.style.display = "none";
    guardBreak.style.display = "none";
    counter.style.display = "none";
    h1.style.display = "none";
    p1.innerText = "You Lose";
    p3.innerText = "";
    document.getElementById("health-bar").style.display = "none"
    document.getElementById("body").style.backgroundImage = deathBackgound;
    document.getElementById("body").appendChild(reset)
    reset.innerText = "Reset"
    reset.style.display = "flex"
    reset.style.marginRight = "auto"
    reset.style.marginLeft = "auto"
    reset.style.justifyContent = "center"
    reset.addEventListener("click", battle1)
    fight = 1;
    oHealth = 1;
    guardCounter = 0;
    intermission = 0;

}

//Continue Screen After a Battle is Won
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
    goNext.innerText = "Continue"
    document.getElementById("body").style.backgroundImage = "url(continue.jpg)"
    goNext.addEventListener("click", battle)
}

//Moving between fights (Setting different enemy health values)
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
    } else if (fight == 5) {
        goNext.style.display = "block"
        goNext.innerText = "Proceed?"
        goNext.addEventListener("click", victScreen)
    }
}

//Adjusting Enemy Healthbar
function setHealth(percent) {
  document.getElementById("healthFill").style.width = percent + "%";
}

//2nd Ending Screen
function victScreen(){
    goNext.style.display = "none"
    document.getElementById("body").style.backgroundImage = "url(victory.png)"
    p2.innerText = "You Win the Game!!!"
    p2.style.marginTop = "0%"
    newGame = document.createElement("button")
    document.getElementById("body").appendChild(newGame)
    newGame.innerText = "Play Again"
    newGame.style.display = "flex"
    newGame.style.marginRight = "auto"
    newGame.style.marginLeft = "auto"
    newGame.style.justifyContent = "center"
    newGame.addEventListener("click", restart)
    console.log("Your Actions were: ")
    for (let n = 0; n < pAct.length; n++){
        console.log(pAct[n])
    }
}

//Restarts Game
function restart(){
    newGame.style.display = "none"
    battle1()
}

//Secret Path Step 1
function intermission1(){
    intermission++;
    proceed.style.display = "none";
    oSprite.style.display = "none";
    pSprite.style.display = "none";
    guard.style.display = "none";
    thrust.style.display = "none";
    guardBreak.style.display = "none";
    counter.style.display = "none";
    h1.style.display = "none";
    p1.innerText = "What Could You Possibly Accomplish?";
    document.getElementById("health-bar").style.display = "none"
    document.getElementById("body").style.backgroundImage = deathBackgound;
    document.getElementById("body").appendChild(reset)
    reset.style.display = "flex"
    reset.style.marginRight = "auto"
    reset.style.marginLeft = "auto"
    reset.style.justifyContent = "center"
    reset.addEventListener("click", battle1)
}


//Secret Path Step 2
function intermission2(){
    intermission++;
    proceed.style.display = "none";
    oSprite.style.display = "none";
    pSprite.style.display = "none";
    guard.style.display = "none";
    thrust.style.display = "none";
    guardBreak.style.display = "none";
    counter.style.display = "none";
    h1.style.display = "none";
    p1.innerText = "You Cannot Possibly Progress Through This Path";
    document.getElementById("health-bar").style.display = "none"
    document.getElementById("body").style.backgroundImage = deathBackgound;
    document.getElementById("body").appendChild(reset)
    reset.style.display = "flex"
    reset.style.marginRight = "auto"
    reset.style.marginLeft = "auto"
    reset.style.justifyContent = "center"
    reset.addEventListener("click", battle1)
}

//Secret Path Step 3
function intermission3(){
    proceed.removeEventListener("click", intermission3)
    proceed.style.display = "none"
    oSprite.style.display = "none";
    pSprite.style.display = "none";
    guard.style.display = "none";
    thrust.style.display = "none";
    guardBreak.style.display = "none";
    counter.style.display = "none";
    h1.style.display = "none";
    p1.innerText = "Fine";
    document.getElementById("health-bar").style.display = "none"
    document.getElementById("body").style.backgroundImage = deathBackgound;
    document.getElementById("body").appendChild(reset)
    reset.style.display = "flex"
    reset.style.marginRight = "auto"
    reset.style.marginLeft = "auto"
    reset.style.justifyContent = "center"
    reset.innerText = "Reset?"
    reset.removeEventListener("click", battle1)
    reset.addEventListener("click", secretBattle)
}

//Secret Path Battle
function secretBattle(){
    secret = true
    h1.innerText = "KingKiller Chronicle"
    h1.style.color = "red"
    document.getElementById("body").style.backgroundImage ="url(King.png)";
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
    oSprite.src = "it.png";
    oSprite.style.width = "400px";
    oSprite.style.height = "400px";
    oSprite.style.marginLeft = "61.5%"
    oSprite.style.marginRight = "38.5%"
    document.getElementById("health-bar").style.marginTop = "5%"
    pSprite.src = "sprite.png";
    reset.style.display = "none";
    p3.innerText = "The King of No Killing"
    p3.style.marginLeft = "65%"
    p3.style.fontSize = "30px"
    p3.style.color = "red"
    oHealth = 20;
    oTotal = 20;
    setHealth(100)
}


//3rd Ending Screen
function defeat(){
    document.getElementById("body").style.backgroundImage = "url(end.png)"
    proceed.style.display = "none";
    oSprite.style.display = "none";
    pSprite.style.display = "none";
    guard.style.display = "none";
    thrust.style.display = "none";
    guardBreak.style.display = "none";
    counter.style.display = "none";
    h1.style.display = "none";
    p3.innerText = ""
    document.getElementById("health-bar").style.display = "none"}
    console.log("Your Actions were: ")
    for (let n = 0; n < pAct.length; n++){
        console.log(pAct[n])
    }