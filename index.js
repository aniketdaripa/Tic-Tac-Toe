let board;
let playerO = 'o';
let playerX = 'x';
let currPlayer = playerX;
let gameOver = false;
window.onload = function(){
    setGame();
}
function setGame(){
    board = [[' ', ' ',' '],[' ', ' ',' '],[' ', ' ',' ']];
    for(let row = 0;row<3;row++){
        for(let col=0;col<3;col++){
            //create a div "0-0" tag
            let tile = document.createElement("div");
            tile.id = row.toString() + "-" + col.toString();
            tile.classList.add("tile");
            if(row == 0 || row == 1){
                tile.classList.add("horizontal-line");
            }
            if(col == 0 || col==1){
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", setTile);
            document.getElementById("board").append(tile);
        }
    }
}
function setTile(){
    if(gameOver == true){
        return;
    }
    let cordinate = this.id.split("-")//"1-1"-->["1", "1"]
    let row = parseInt(cordinate[0]);
    let col = parseInt(cordinate[1]);
    if(board[row][col] != ' '){
        return;
    }
    board[row][col] = currPlayer;
    this.innerText = currPlayer;
    if(currPlayer == playerO){
        currPlayer = playerX;
    }
    else{
        currPlayer = playerO
    }
    chechWinner();
}
function chechWinner(){
    //check all horizontal possibilities
    for(let row = 0;row<3;row++){
        if(board[row][0]==board[row][1] && board[row][0]==board[row][2] && board[row][0] != ' '){
            for(let i=0;i<3;i++){
                let tile = document.getElementById(row.toString()+"-"+i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            message();
            return;
        }
    }
    //check all vertical possibilities
    for(let col = 0;col<3;col++){
        if(board[0][col]==board[1][col] && board[1][col]==board[2][col] && board[0][col] != ' '){
            for(let i=0;i<3;i++){
                let tile = document.getElementById(i.toString()+"-"+col.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            message();
            return;
        }
    }
    //diagonally check
    if(board[0][0]==board[1][1] && board[0][0]==board[2][2] && board[0][0] != ' '){
        for(let i=0;i<3;i++){
            let tile = document.getElementById(i.toString()+"-"+i.toString());
            tile.classList.add("winner");
        }
        gameOver = true;
        message();
        return;
    }
    if(board[0][2]==board[1][1] && board[2][0]==board[0][2] && board[0][2] != ' '){
        for(let i=0;i<3;i++){
            //0-2
            let tile = document.getElementById("0-2");
            tile.classList.add("winner");
            //1-1
            tile = document.getElementById("1-1");
            tile.classList.add("winner");
            //2-0
            tile = document.getElementById("2-0");
            tile.classList.add("winner");
        }
        gameOver = true;
        message();
        return;
    }
    function message(){
        if(currPlayer == playerO){
            currPlayer = playerX;
        }
        else{
            currPlayer = playerO
        }
        let html = `${currPlayer} Wins`;
        document.getElementById('demo').innerHTML=html;
        // let text = `<button id="btn">Restart</button>`;
        // document.getElementById('restart').innerHTML = text;
        let remove = document.querySelector("button");
        remove.removeAttribute('id');
        playNote();
    }
    let btn = document.getElementsByTagName("button")[0];
    btn.addEventListener('click', ()=>{
        window.location.reload();
    })
}
function playNote(){
    let audio = document.getElementById('aud');
    audio.play();
}