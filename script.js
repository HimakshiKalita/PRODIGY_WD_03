const boxes = Array.from(document.getElementsByClassName('box'));
const resetbtn = document.getElementsByClassName('resetbtn')[0];
const headerText = document.getElementById('header-text2');
const areas =[null, null, null, null, null, null, null, null, null];
const o_text ="O";
const x_text ="X";
let currentPlayer = x_text;
let winBoxesIds =[];

const gameBoard = document.getElementById('game-board');
const winGif = document.getElementById('win-gif');

function bindClickEvent(){
    boxes.forEach(box=>{
        box.addEventListener('click', handleBoxClick);
    })
}

bindClickEvent();

function handleBoxClick(e){
    if(winBoxesIds.length>0){
        return;
    }
    const id = e.target.id;
    if(!areas[id]){
        areas[id] = currentPlayer;
        e.target.innerHTML = currentPlayer;

        if(hasPlayerWon(currentPlayer)){
            headerText.innerHTML = `${currentPlayer} won`;
            headerText.style.background="black";
            headerText.style.color="#f0c808";
            headerText.style.fontSize="25px";
            changeWinBoxesBg();
            showWinGif();
            return;
        }

        if(areas.every(area => area !==null)){
            headerText.innerHTML= "Oops, it's a draw! ";
            headerText.style.background = "black";
            headerText.style.color="#8b1840";
            headerText.style.fontSize="28px"
            return;
        }
        currentPlayer=currentPlayer === o_text ? x_text : o_text;
}

}

function hasPlayerWon(cPlayer){
    if(areas[0] == cPlayer){
        if(areas[1] ==cPlayer && areas[2]==cPlayer){
            winBoxesIds =[0,1,2];
            return true;
        }
        if(areas[3] ==cPlayer && areas[6]==cPlayer){
            winBoxesIds =[0,3,6];
            return true;
        }
        if(areas[4] ==cPlayer && areas[8]==cPlayer){
            winBoxesIds =[0,4,8];
            return true;
        }
    }
    if(areas[4] == cPlayer){
        if(areas[1] ==cPlayer && areas[7]==cPlayer){
            winBoxesIds =[4,1,7];
            return true;
        }
        if(areas[2] ==cPlayer && areas[6]==cPlayer){
            winBoxesIds =[4,2,6];
            return true;
        }
        if(areas[3] ==cPlayer && areas[5]==cPlayer){
            winBoxesIds =[4,3,5];
            return true;
        }
    }
    if(areas[8] == cPlayer){
        if(areas[7] ==cPlayer && areas[6]==cPlayer){
            winBoxesIds =[8,7,6];
            return true;
        }
        if(areas[5] ==cPlayer && areas[2]==cPlayer){
            winBoxesIds =[8,5,2];
            return true;
        }
    }

    }

    function changeWinBoxesBg(){
        winBoxesIds.forEach(id=>{
            boxes[id].style.background = 'lightgreen';
        });
        boxes.forEach(box=>{
            box.style.cursor= 'not-allowed';
        });
    }

    function showWinGif(){
        gameBoard.classList.add('hidden');
        winGif.classList.remove('hidden');
    }

function reset(){
    winBoxesIds = [];
    areas.forEach((val,index)=>{
        areas[index] = null;
    })
    boxes.forEach(box=>{
        box.innerHTML ='';
        box.style.background ='';
        box.style.cursor ='pointer';
    })
    headerText.innerHTML="Let's play!!";
    headerText.style.background="";
    headerText.style.color="#468189";

    gameBoard.classList.remove('hidden');
    winGif.classList.add('hidden');
    currentPlayer=x_text;
}

resetbtn.addEventListener('click',reset);
