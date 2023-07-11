
//Factory function
const gameBoardFactory = function(gridNumberPlaceholder){


    let board = [];

    for (let r = 0; r < gridNumberPlaceholder; r++) {

        for (let c = 0; c < gridNumberPlaceholder; c++)
        

        board.push(createGrid(r,c,' '));

            
    }    
    
    // Factory function to create grids
    function createGrid (row,col,marker){
    
        return {row,col,marker}
    }

    return {board};

};






const gameFlow = (function () {


    let gridNumber = 3; //put this in a module later

    let gameBoard = gameBoardFactory(gridNumber);

    let gameWon = false;

    function newGameBoard(){

        gameBoard = gameBoardFactory(gridNumber);

    }

    // sends latest gameBoard data
    function getGameBoard () {

        return gameBoard;

    }

    const resetGameOver = function(){
        
        gameWon = false;

    }

    // Factory function to create players
    const players = function (name,marker){

        let score = 0;

        const choice = function(nodeNumber){

            if(!gameWon) {

            let gameBoardArray = gameBoard.board;

            let chosenGrid = gameBoardArray[nodeNumber];    
        
            if(!(chosenGrid.marker === 'X'|| chosenGrid.marker === 'O')) {
                
                // changes turn color on DOM
                displayController.updateTurnColor.changeTurnOnDOM();
                
                chosenGrid.marker = marker;
    
                // console display gets updated every time a choice is made, used for debugging
                consoleDisplay(gameBoard);
        
            }else{


                displayController.updateStatus('That grid is taken!');
            }

            // 'this' refers to the object that is calling it
        
            gridCheck(gameBoard,this);

    
            }else{

                // console.log('Game is over!')
                displayController.updateStatus('Click continue');
                

            }

            displayController.updateScore(playerArray[0].score,playerArray[1].score);

        
            return;
        }

        return {name,choice,marker,score};
    
    };


    // This is where players are created

    let playerArray = [];


    function defaultPlayers(){

        const player1Default= players('Player 1','X');

        const player2Default = players('Player 2','O');

        playerArray.push(player1Default,player2Default)

    }


    defaultPlayers();

    let player1= playerArray[0];

    let player2 = playerArray[1];


    const createPlayers = function (player1Name,player2Name){

        playerArray = [];

        const newPlayer1 = players(player1Name,'X');

        const newPlayer2 = players(player2Name,'O')

        playerArray.push(newPlayer1,newPlayer2);

        player1 = playerArray[0];

        player2 = playerArray[1];

        return;


    }



    // Function to filter grids

    function gridCheck(gameBoard,playerPlaceholder){
        const boardArray = gameBoard.board;
    
       
        function perpendicularLineCheck (){
    
            for (let index = 0; index < gridNumber; index++) {
        
                //row check
                
                let rowArray = [];

                let colArray = [];

                const gridArrays = [rowArray,colArray]
        
        
                boardArray.forEach(grid => {
                
                    if(grid.row === index ) {
        
                        rowArray.push(grid);
        
                    }
            
                });

        
                // Column check
        
                boardArray.forEach(grid => {
                
                    if(grid.col === index ) {
        
                        colArray.push(grid);
        
                    }
            
                });
        
                markerCheck(gridArrays,playerPlaceholder);
        
            }

        }


        function diagLineCheck () {

            // Descending line check
    
            let descArray = [];

            let ascArray =[];

            const gridArrays = [descArray,ascArray];
        
            for (let j = 0; j < gridNumber; j++) {
    
    
    
                boardArray.forEach(grid => {
    
                    if(grid.row === j && grid.col === j){
                        
                        descArray.push(grid);
                    }
                });
                
            }
    
            // Ascending line check

            // Because gridNumber is 3
            let n = gridNumber - 1
    
            for (let m = 0; m < gridNumber; m++) {
    
    
                boardArray.forEach(grid => {
    
                    if(grid.row === m &&  grid.col === n){
                        
                        ascArray.push(grid);
    
                        n--;
                    }
                });

            }

            markerCheck(gridArrays,playerPlaceholder);
    
        }


        perpendicularLineCheck ();
    
        diagLineCheck();
    

        if(!gameWon){

            drawCheck(boardArray);

        }
    
        
    }
    

    // Function to check for win condition with filtered grids
    
    function markerCheck(filteredGridLines,player){
    

        // let ifWin = false;
        

        filteredGridLines.forEach(gridArray => {
            
            let markerCheck = [];

            
            if (!gameWon){ // Or else it will run twice and give two points if there are two 3 in a rows.

                gridArray.forEach(grid => {
    
                    if(grid.marker === player.marker){
                        
                        markerCheck.push(grid);
                    }
            
                })
            
                if (gridArray.length === markerCheck.length) {
            
                    displayController.updateStatus(player.name+' wins!');
        
                    player.score++;
        
                    displayController.removeTurnColor();
        
                    gameWon = true;

                    displayController.updateButton();
            
                    return;
            
                    //create a function to disable grid input and pop up a restart button
                
                }

            } else {

                return;

            } 

        });

    }
    
    
    
    
    // Function to check for draw condition

    function drawCheck (boardArrayPlaceholder) {
    
        let gridArray = [];
    
        boardArrayPlaceholder.forEach(grid => {
            
            if(grid.marker === ' '){
    
                gridArray.push(grid);


            }
            
    
        });
    
        if(gridArray.length === 0){
    
            displayController.updateStatus('Game is a draw!');

            displayController.removeTurnColor();
    
        }
    
    }

    let play = function(playerTurn,nodeNumber){

        let test = playerTurn? player1.choice(nodeNumber):player2.choice(nodeNumber);
    
        return test;
    
    }

    // methods that are available
    return {play,createPlayers,resetGameOver,newGameBoard,getGameBoard};

})();




// Module for DOM
const displayController = (function(gameBoardPlaceholder){

    let player1turn = true;


    const startButton = document.querySelector('#start-button');

    const startMenuScreen = document.querySelector('.start-container')

    // const gridAreaDOM = document.querySelector('#grid-area');

    const player1DOM = document.querySelector('#player-one-input');

    const player2DOM = document.querySelector('#player-two-input');

    const playerOneNameDOM = document.querySelector('.player-one-name');

    const playerTwoNameDOM = document.querySelector('.player-two-name');

    const playerOneturnContainer = document.querySelector('.player-one-container');
    
    const playerTwoturnContainer = document.querySelector('.player-two-container');

    const restartButton = document.querySelector('.restart');





    // when you click the start button

    function startGame (){

        


        startButton.addEventListener('click', function(e){


            // const gridAreaValue = gridAreaDOM.value;
            
            const player1NameValue = player1DOM.value;
            
            const player2NameValue = player2DOM.value;

            if(!player1NameValue|| !player2NameValue){

                return;

            }

            e.preventDefault();
            

            // Create grid

            // Change created player object's name when start button is clicked

            gameFlow.createPlayers(player1NameValue,player2NameValue);

            startMenuScreen.classList.add('game-start');

            
          

            playerOneNameDOM.textContent = player1DOM.value;

            playerTwoNameDOM.textContent = player2DOM.value;


        });


    }


    // Create gameboard display for DOM

    const gameBoardArray = gameBoardPlaceholder.board;

    const boardDOM = document.querySelector('.board');

    gameBoardArray.forEach(grid => {
        
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid');



        boardDOM.appendChild(gridElement);



    });

    const gridDOM = document.querySelectorAll('.grid');


    // To add data attribute
    for (let k = 0; k < gridDOM.length; k++) {

        gridDOM[k].setAttribute('data-grid',k);

    }


    // for each grid click
    function displayBoardDOM (){

        gridDOM.forEach(grid => {
        
            grid.addEventListener('click', function(){
    
                const gameBoardArray = gameFlow.getGameBoard().board;
                
                const clickedGrid = grid.dataset.grid;
    
                gameFlow.play(player1turn,clickedGrid);
    
                grid.textContent = gameBoardArray[clickedGrid].marker;
    
            })
        });

        return;
    }



    
    
    
    // Function to manipulate DOM for each turn

    const updateTurnColor = (function () {
     
        const changeTurnOnDOM = function () {
    
            if(player1turn === false){
    
                playerTwoturnContainer.classList.remove('your-turn');

                playerTwoNameDOM.classList.remove('your-turn-border');
        
                playerOneturnContainer.classList.add('your-turn');

                playerOneNameDOM.classList.add('your-turn-border');

                updateStatus(player1DOM.value+'\'s turn!')
        
            }
        
            if(player1turn === true){
        
                playerOneturnContainer.classList.remove('your-turn');

                playerOneNameDOM.classList.remove('your-turn-border');
        
                playerTwoturnContainer.classList.add('your-turn');

                playerTwoNameDOM.classList.add('your-turn-border');

                updateStatus(player2DOM.value+'\'s turn!')
        
            }
    
            player1turn = player1turn === false ? true : false;
        }
    
    
        return {changeTurnOnDOM};
        
    })();


    // Function to restart game

    function restartGame (){

        const restartButtonDOM = document.querySelector('.restart-button');
    
        restartButtonDOM.addEventListener('click', function(){

            gameFlow.newGameBoard();
    
            player1turn = true;
    
            gameFlow.resetGameOver();
    
            const gridDOM = document.querySelectorAll('.grid');
    
            gridDOM.forEach(grid => {
                grid.textContent = '';
            })
    
            const statusDisplayDOM = document.querySelector('.status-display');
    
            statusDisplayDOM.textContent = 'START!';

            restartButton.textContent = 'RESTART';

            restartButton.classList.remove('continue');
    
            removeTurnColor();

            playerOneturnContainer.classList.add('your-turn');

            playerOneNameDOM.classList.add('your-turn-border')
            
            
        });
    
    
    }
    
    function removeTurnColor () {

        playerOneturnContainer.classList.remove('your-turn');
    
        playerTwoturnContainer.classList.remove('your-turn');

        playerOneNameDOM.classList.remove('your-turn-border');

        playerTwoNameDOM.classList.remove('your-turn-border');
    
    }

    

    function updateStatus(message) {
        const statusDisplayDOM = document.querySelector('.status-display');
    
        statusDisplayDOM.textContent = message
    
    }


    function updateScore (player1score,player2score){

        const player1scoreDOM = document.querySelector('.player-one-score');

        const player2scoreDOM = document.querySelector('.player-two-score');   
        
        

        player1scoreDOM.textContent = player1score; 

        player2scoreDOM.textContent = player2score; 




    }


    function updateButton () {

        restartButton.textContent = 'CONTINUE'
        restartButton.classList.add('continue');

    }
    

    restartGame();

    displayBoardDOM();

    startGame();


    return {updateTurnColor,removeTurnColor,updateStatus,updateScore,displayBoardDOM,updateButton};


})(gameFlow.getGameBoard());








// Module for console board, used for debugging

function consoleDisplay (boardObj){

    const boardArray = boardObj.board;

    let unprocessedArray = [];

    // loop count variables, value will be max col and row value
    let colCount = '';

    let rowCount = '';

    // count cols and rows

    boardArray.forEach(grid => {
        
        colCount = grid.col;

        rowCount = grid.row;

    })



    boardArray.forEach(grid => {

        unprocessedArray.push(grid.marker);

        if (grid.col === colCount){
            unprocessedArray.push("\n")
        }

    });

    let processedArray = unprocessedArray.join('');

    console.log(processedArray);


}


consoleDisplay(gameFlow.getGameBoard());






        