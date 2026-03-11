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
let battles = [1, 2, 3, 4]
let playerLife = 1
let counterCounter = 0;
let curFight = "Fight 1"
let oHealth = 1
let deathBackgound = "url(deathScreenBackground.png)"

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
    oSprite.src = images[choice]
    return oAct
}


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
                    console.log(act, oAct);
                    break
                case "thrust":
                    console.log(act, oAct);
                    oHealth -= 1;
                    break
            }
            break;
        case "guardBreak":
            switch (oAct){
                case "thrust":
                    console.log(act, oAct);
                    deathScreen();
                    break;
                case "counter":
                    console.log(act, oAct);
                    deathScreen();
                    break;
                case "guard":
                    console.log(act, oAct);
                    oHealth -= 1;
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
                    break;
                case "counter":
                    console.log(act, oAct);
                    deathScreen();
                    break;
            }
            break;

    }
}

function deathScreen(){
    oSprite.style.display = "none";
    pSprite.style.display = "none";
    guard.style.display = "none";
    thrust.style.display = "none";
    guardBreak.style.display = "none";
    counter.style.display = "none";
    h1.style.display = "none";
    p1.innerText = "You Lose";
    document.getElementById("body").style.backgroundImage = deathBackgound;
    console.log(document.getElementById("body"))
}