const chooseNmb = document.querySelector("#chooseNmb");
const countdown = document.querySelector("#countdown");
const showNmb = document.querySelector("#showNmb");

const drawBtn = document.querySelector("#drawBtn");
const returnBtn = document.querySelector("#returnBtn");

const numberDisplay = document.querySelector("#numberDisplay");
const limitsBtns = document.querySelectorAll(".limits");

let currentDeck = [];

let floor;
let ceil;
let howManyNmb;

const hideNmb = document.querySelector("#hideNmb");
const sortNmb = document.querySelector("#sortNmb");
const showCountdown = document.querySelector("#showCountdown");

function validCharacters(number)
{
    number = number.replace(/[^0-9]/g, "");
    return number;
}

limitsBtns.forEach((item) => {
    item.addEventListener("input", function()
    {
        item.value = validCharacters(item.value);
})})

drawBtn.addEventListener("click",
    function()
    {
        floor = parseInt(document.querySelector("#floor").value);
        ceil = parseInt(document.querySelector("#ceil").value);
        howManyNmb = parseInt(document.querySelector("#howManyNmb").value);

        if(howManyNmb > ceil){
            howManyNmb = ceil;
        }
        createBalls(ceil,floor,howManyNmb);

})

returnBtn.addEventListener("click",
    function()
    {
        currentDeck.length = 0;
        while (numberDisplay.firstChild){
            numberDisplay.removeChild(numberDisplay.firstChild);
        }
        hideNmb.checked = false; sortNmb.checked = false; showCountdown.checked = false;
        hide(showNmb); show(chooseNmb);
})


function createBalls(ceil,floor,howManyNmb)
{
    while(howManyNmb){
        const randomNb = random(ceil,floor);
        if(!currentDeck.includes(randomNb))
        {
            currentDeck.push(randomNb);
            howManyNmb--;
        }
    }
    
    let numberVisible = "visible";
    if (hideNmb.checked) numberVisible = "secret";
    if (sortNmb.checked) currentDeck.sort((a, b) => a - b);
    
    if (showCountdown.checked) doCountdown();
    else show (showNmb); hide (chooseNmb);
    

    for(let element of currentDeck){
        let span = document.createElement("span");
        span.classList.add("drawn", numberVisible);
        span.innerText = element;
        
        span.addEventListener("click",function(){
            if(!span.classList.contains("clicked")){
                span.classList.remove("secret");
                span.classList.add("clicked");
            }
        });
        
        numberDisplay.appendChild(span);
    }
}

function doCountdown () {
    
    hide (chooseNmb);
    countdown.innerText = 5;
    show (countdown);
    
    for (
        let loop = parseInt(countdown.innerText) - 1, n = 1;
        loop >= 0;
        loop--, n++
    ){
        setTimeout(
            function () {
                countdown.innerText = loop;
                if (loop === 0) {
                    setTimeout(function () {
                        hide (countdown); show (showNmb);
                    },1000)
                }
            },
            1000 * n
        )
    }
}

function random(ceil,floor){
    return Math.floor(Math.random() * (ceil - floor + 1)) + floor;
}
function show(element){
    element.classList.remove("hide");
}
function hide(element){
    element.classList.add("hide");
}