let inputdir = {x: 0,y: 0};
let speed = 9;
let lastpainttime = 0;
let snakearr =[{x: 13,y: 15}];
food =  {x: 6,y: 7};
let score = 0;


function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastpainttime)/1000 < 1/speed)
        return;
    lastpainttime = ctime;
    gameengine();
}
function iscollide(snake){
    //if you bump into yourself
    for(let i = 1; i < snakearr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    //if it collide with wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0) {
        return true;
    }
}

function gameengine(){
    //updating the snake and food
    if(iscollide(snakearr)){
        inputdir = {x: 0,y: 0};
        alert("Game Over. Press any key to play again");
        snakearr = [{x: 13,y: 15}];
        score = 0;
    }

    //if you have eaten the food
    if(snakearr[0].y === food.y && snakearr[0].x === food.x){
        score += 1;
        scorebox.innerHTML = "Score: " + score;
        snakearr.unshift({x: snakearr[0].x + inputdir.x,y: snakearr[0].y + inputdir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()),y: Math.round(a + (b-a)*Math.random())} 
    }

    //moving the snake

    for(let i = snakearr.length - 2; i>=0; i--){
        snakearr[i+1] = {...snakearr[i]};
    }

    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;

    //display the snake
    board.innerHTML = "";
    snakearr.forEach((e,index)=>{
        snakeelement = document.createElement('div');
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeelement.classList.add('head');
        }else{
            snakeelement.classList.add('snake');
        }
        board.appendChild(snakeelement);
    })
    //display the food
    foodelement = document.createElement('div');
        foodelement.style.gridRowStart = food.y;
        foodelement.style.gridColumnStart = food.x;
        foodelement.classList.add('food');
        board.appendChild(foodelement);
}

//main logic
window.requestAnimationFrame(main)
window.addEventListener('keydown', e =>{
    inputdir = {x: 0, y: 1} //start the game
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
                console.log("ArrowDown")
                inputdir.x = 0;
                inputdir.y = 1;
                break;  
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputdir.x = 1;
            inputdir.y = 0;
            break;  
        default:
            break;
    }
})