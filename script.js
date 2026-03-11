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
//let images = ["guard.png", "guardBreak.png", "thrust.png", "counter.png"]
let battles = [1, 2, 3, 4]
let playerLife = 1
let counterCounter = 0;
let curFight = "Fight 1"
let oHealth = 1
let deathBackgound = "deathScreenBackground.png"

window.addEventListener("load", battle)


function battle(){
    let counterCounter = 0
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

function eAct(){
    let choice = Math.floor(Math.random()*4)
    let oAct = actions[choice];
    //oSprite.src = images[choice]
    return oAct
}


function chooseAction(act){
    let oAct = eAct()
    if (act == "guard") {
        pSprite.src = "";
    } else if (act == "guardBreak") {
        pSprite.src = "";
    } else if (act == "counter") {
        pSprite.src = "";
    } else if (act == "thrust") {
        pSprite.src = "";
    } else {

    }
    turn(act, oAct)
}

function turn(act, oAct){
    if (counterCounter > 0 && act == "counter"){
        deathScreen()
        console.log(counterCounter);
}
    switch (act){
        case "counter":
            counterCounter++;
            switch (oAct){
                case "guardBreak":
                    oHealth -= 1;
                    break
                case "thrust":
                    oHealth -= 1;
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
            }
            break;
        case "guard":
            switch (oAct){
                case "thrust":
                    break;
                case "guardBreak":
                    deathScreen();
                    break;
            }
            break;
        case "thrust":
            switch (oAct){
                case "guardBreak":
                    oHealth -= 1;
                    break;
                case "counter":
                    deathScreen();
                    break;
            }
            break;

    }
}

function deathScreen(){
    p1.innerText = "You Lose";
    p1.style.fontSize = 50;
    document.getElementById("body").style.backgroundImage = deathBackgound;
}