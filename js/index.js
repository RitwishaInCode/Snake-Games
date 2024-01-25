//Game constants and variables

let inputDir={x:0,y:0}; // initial positions
const foodsound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 4 ;
let lastPaintTime=0;
let snakeArr = [
    {x:13, y:15}
];
food = {x:6, y:10};
let score=0;


//Game functions
function main(currentTime){
 window.requestAnimationFrame(main);
 if((currentTime-lastPaintTime)/1000 < 1/speed){
    return;
 }
 //else
 lastPaintTime = currentTime;
 gameEngine();

//  console.log(currentTime);
}

//function 1
function isCollide(snakeHead){
//    return false; //did not colllide 
   // if i bump into the snake
   for (let i = 1; i < snakeArr.length; i++) {
    if(snakeHead[i].x === snakeHead[0].x  && snakeHead[i].y === snakeHead[0].y){
return true;
    }
}
//if bumped into wall
    if(snakeHead[0].x >=21 || snakeHead[0].x <=0  || snakeHead[0].y >=21 || snakeHead[0].y <=0){
        return true;
    }
   return false;
}

//function 2
function gameEngine(){
    // 1. update snake array - positions and food
if(isCollide(snakeArr)){
    gameOverSound.play();
    // musicSound.pause();
    inputDir = {x:0,y:0};
    alert("Game over. Press any key to play again!");

    snakeArr=[{x:13, y:15}];
// musicSound.play();
score=0;

}

   
// if food is eaten, increment the score and regenerate the food position
if(snakeArr[0].y ===food.y && snakeArr[0].x === food.x ){
    //coordinates of food and snake matches, it eats the food and score increases
    foodsound.play();
    score +=1;
    if (score>highScoreVal){
        highScoreVal= score;
        localStorage.setItem("highScore", JSON.stringify(highScoreVal));
        highBox.innerHTML ="Highest Score: "+ highScoreVal;
    }
    scoreBox.innerHTML ="Score: "+ score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
    let a=2;
    let b=18;
    food = {x: Math.round(a+(b-a) * Math.random()), y: Math.round(a+(b-a) * Math.random())}
}

//Moving the snake
for (let i = snakeArr.length -2; i >=0; i--) {
    snakeArr[i+1]={...snakeArr[i]};
    
}

snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;

 //2. render/display the snake 
 board.innerHTML = "";   //empty board
 snakeArr.forEach((element,index) =>{     
     snakeElement =document.createElement('div'); //creation of a new element
     snakeElement.style.gridRowStart = element.y;
     snakeElement.style.gridColumnStart = element.x;
    
     if(index ===0){
         snakeElement.classList.add('head');
     }
     else{
         snakeElement.classList.add('snake');
     }
     
     board.appendChild(snakeElement);
 });
//3. dispaly food
foodElement =document.createElement('div'); //creation of a new element
foodElement.style.gridRowStart = food.y;
foodElement.style.gridColumnStart = food.x;
foodElement.classList.add('food');
board.appendChild(foodElement);
}



//main logic
// to make the highest score
// musicSound.play();
let highScore =localStorage.getItem("highScore");
if(highScore ===null){
    let highScoreVal=0;
    localStorage.setItem("highScore",JSON.stringify(highScoreVal));  
}
else{
    highScoreVal = JSON.parse(highScore);
    highBox.innerHTML = 'Highest Score:' + highScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown' , element =>{
    inputDir = {x:0,y:1} // start the game
    moveSound.play();

switch(element.key){
    case "ArrowUp":
        console.log("up");
        inputDir.x =0 ;
        inputDir.y = -1;
        break;

    case "ArrowDown":
        console.log("down");
        inputDir.x =0 ;
        inputDir.y = 1;
        break;

    case "ArrowLeft":
        console.log("Left");
        inputDir.x = -1;
        inputDir.y = 0;
        break;

    case "ArrowRight":
        console.log("right");
        inputDir.x = 1;
        inputDir.y = 0;
        break;
    default:
        break;
}

});