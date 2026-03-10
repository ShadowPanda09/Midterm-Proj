let guard = document.getElementById("Guard")
let guardBreak = document.getElementById("Guard Break")
let thrust = document.getElementById("Thrust")
let counter = document.getElementById("Counter")
let p1 = document.getElementById("p1")
let p2 = document.getElementById("p2")
let p3 = document.getElementById("p3")
let pSprite = document.getElementById("playerSprite")
let oSprite = document.getElementById("opponentSprite")
let actions = ["guard", "guard break", "thrust", "counter"]
let battles = [1, 2, 3, 4]
let playerLife = 1

guard.addEventListener("click", function(){
    chooseAction("guard");
    eAct();
})
guardBreak.addEventListener("click", function(){
    chooseAction("guardBreak");
    eAct();
})
thrust.addEventListener("click", function(){
    chooseAction("thrust");
    eAct();
})
counter.addEventListener("click", function(){
    chooseAction("counter");
    eAct();
})

function eAct(){
    let oAct = actions[Math.floor(Math.random()*4)];
    console.log(oAct);
}


function chooseAction(act){
    if (act == "guard") {
        console.log(act);
        pSprite.src = "";
    } else if (act == "guardBreak") {
        console.log(act);
        pSprite.src = ""
    } else if (act == "counter") {
        console.log(act);
        pSprite.src = ""
    } else if (act == "thrust") {
        console.log(act);
        pSprite.src = ""
    } else {

    }
}
