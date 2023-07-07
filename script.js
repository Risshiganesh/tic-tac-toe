//This is basically object manipulation

// Put inside a module and send it to
let gridNumber = 3; //put this in a module later, this is player input



// put this inside a module
//factory function
const gameBoardFactory = function(gridNumberPlaceholder){


    console.log('create new board')

    let board = [];

    console.log(board);

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



let gameBoard = gameBoardFactory(gridNumber);


// module
function consoleDisplay (boardObj){

    const boardArray = boardObj.board;

    let unprocessedArray = [];

    let consoleDisplayArray = [];

    // loop count variables, value will be max col and row value
    let colCount = '';

    let rowCount = '';

    // count cols and rows

    boardArray.forEach(grid => {
        
        colCount = grid.col;

        rowCount = grid.row;

    })



    boardArray.forEach(grid => {
        // console.log(grid.marker); 
        
        unprocessedArray.push(grid.marker);

        if (grid.col === colCount){
            unprocessedArray.push("\n")
        }

        // if element.row
    });

    let processedArray = unprocessedArray.join('');

    console.log(processedArray);
    // console.log(colCount);



}


consoleDisplay(gameBoard);



// Put these inside displayController and let it be accessed as a displayController method
function updateStatus(message) {
    const statusDisplayDOM = document.querySelector('.status-display');

    statusDisplayDOM.textContent = message

}


let player1turn = true; // gameFlow.p depends on this, find a way to send this value to it, without keeping this variable in global namespace. Ideally should be inside updateTurnColor







let gameWon = false;


// COMPLETE THE FLOW AND MODULARISE EVERYTHING


const gameFlow = (function () {
    
    // first create players
    

    

    
    let statusDisplay = 'START!';


    const players = function (name,marker){



        const choice = function(nodeNumber){

            
            

            if(!gameWon) {

    
            updateStatus(name+" has played");

            let gameBoardArray = gameBoard.board;

            let chosenGrid = gameBoardArray[nodeNumber];      
        
            if(!(chosenGrid.marker === 'x'|| chosenGrid.marker === 'o')) {
                
                // changes turn color on DOM
                displayController.updateTurnColor.changeTurnOnDOM();
                
                chosenGrid.marker = marker;
    
                consoleDisplay(gameBoard);
        
            }else{
                updateStatus('That grid is taken!');
            }
        
            gridCheck(gameBoard,this);
    
            // 'this' refers to this object
            // console.log(this);
    
            }else{
                console.log('Game is over!')
            }
        
            return {statusDisplay};
        }

        return {name,choice,marker};
    
    };


    // This is where players are created

    let playerArray = [];


    function defaultPlayers(){

        const player1Default= players('Player 1','x');

        const player2Default = players('Player 2','o');

        playerArray.push(player1Default,player2Default)

    }


    defaultPlayers();

    let player1= playerArray[0];

    let player2 = playerArray[1];


    const createPlayers = function (player1Name,player2Name){

        playerArray = [];

        const newPlayer1 = players(player1Name,'x');

        const newPlayer2 = players(player2Name,'o')

        playerArray.push(newPlayer1,newPlayer2);

        player1 = playerArray[0];

        player2 = playerArray[1];

        return;


    }

    function gridCheck(gameBoard,player1){
        const boardArray = gameBoard.board;
    
       
        
    
        for (let index = 0; index < gridNumber; index++) {
    
            //row check
            
            let gridArray = [];
    
    
            boardArray.forEach(grid => {
            
                if(grid.row === index ) {
    
                    gridArray.push(grid);
    
                }
        
        
            });
    
            markerCheck(gridArray,player1);
    
    
        // Column check
            
    
            gridArray = [];
    
    
            console.log(player1);
            
    
            boardArray.forEach(grid => {
            
                if(grid.col === index ) {
    
                    gridArray.push(grid);
    
                }
        
        
            });
    
    
            markerCheck(gridArray,player1);
    
        }
    
        function descendingLineCheck () {
    
            let gridArray = [];
        
            for (let j = 0; j < gridNumber; j++) {
    
    
    
                boardArray.forEach(grid => {
    
                    if(grid.row === j && grid.col === j){
                        
                        gridArray.push(grid);
                    }
                });
                
            }
    
            markerCheck(gridArray,player1);
    
            gridArray =[];
    
        }
    
        descendingLineCheck();

    
    
        function ascendingLineCheck () {
            let gridArray = [];
    
            // Because gridNumber is 3
    
            let k = gridNumber - 1
    
            for (let j = 0; j < gridNumber; j++) {
    
    
                boardArray.forEach(grid => {
    
                    if(grid.row === j &&  grid.col === k){
                        
                        gridArray.push(grid);
    
                        k--;
                    }
                });
    
    
                
            }

            markerCheck(gridArray,player1);
    
            
    
        }
    
        ascendingLineCheck();
    

        if(!gameWon){

            drawCheck(boardArray);

        }
    
        

    
        
    }
    
    
    
    // module
    
    function markerCheck(gridArrayPlaceholder,player){
    
        let markerCheck = [];
    
        gridArrayPlaceholder.forEach(grid => {
    
            if(grid.marker === player.marker){
                
                markerCheck.push(grid);
            }
    
        })
    
        if (gridArrayPlaceholder.length === markerCheck.length) {
    
            updateStatus(player.name+' wins!');

            removeTurnColor();

            gameWon = true;
    
            return;
    
            //create a function to disable grid input and pop up a restart button
        
        }
    
        markerCheck = [];
    
    
    }
    
    
    
    
    // module
    function drawCheck (boardArrayPlaceholder) {
    
        let gridArray = [];
    
        boardArrayPlaceholder.forEach(grid => {
            
            if(grid.marker === ' '){
    
                gridArray.push(grid);

                console.log(grid.marker);
    
                
                // return;
            }
            
    
        });
    
        if(gridArray.length === 0){
    
            updateStatus('Game is a draw!');

            removeTurnColor();
    
        }
    
    }

    let p = function(nodeNumber){

        let test = player1turn? player1.choice(nodeNumber):player2.choice(nodeNumber);
    
        return test;
    
    }

    
    
    // methods that are available
    return {p,createPlayers};

})();




// module for DOM
const displayController = (function(gameBoardPlaceholder){


    // when you click the start button

    function startGame (){

        const startButton = document.querySelector('#start-button');

        const startMenuScreen = document.querySelector('.start-container')


        startButton.addEventListener('click', function(e){

            const gridAreaDOM = document.querySelector('#grid-area');


            const player1DOM = document.querySelector('#player-one-input');


            const player2DOM = document.querySelector('#player-two-input');


            


            const playerOneNameDOM = document.querySelector('.player-one-name');


            const playerTwoNameDOM = document.querySelector('.player-two-name');


            

            const gridAreaValue = gridAreaDOM.value;
            
            const player1NameValue = player1DOM.value;
            
            const player2NameValue = player2DOM.value;

            console.log(gridAreaValue);

            console.log(player1NameValue);

            console.log(player2NameValue);

            if(!gridAreaValue||!player1NameValue|| !player2NameValue){

                console.log('test')

                return;

            }

            e.preventDefault();
            

            // Create grid
            
            // CREATE PLAYERS or change player name?

            gameFlow.createPlayers(player1NameValue,player2NameValue);

            startMenuScreen.classList.add('game-start');

            
          

            playerOneNameDOM.textContent = player1DOM.value;

            playerTwoNameDOM.textContent = player2DOM.value;


        });


    }


    // Gameboard display


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

    
    gridDOM.forEach(grid => {
        
        grid.addEventListener('click', function(){

            const gameBoardArray = gameBoard.board;
            
            const clickedGrid = grid.dataset.grid;

            gameFlow.p(clickedGrid);

            grid.textContent = gameBoardArray[clickedGrid].marker;

            console.log(clickedGrid);

            const statusDisplayDOM = document.querySelector('.status-display')


            console.log("TEST");
            console.log(gameFlow.statusDisplay);

       



        })
    });



    const updateTurnColor = (function () {

        const playerOneturnContainer = document.querySelector('.player-one-container');
    
        const playerTwoturnContainer = document.querySelector('.player-two-container');
    
    
        const changeTurnOnDOM = function () {
    
            if(player1turn === false){
    
                playerTwoturnContainer.classList.remove('your-turn');
        
                playerOneturnContainer.classList.add('your-turn');
        
            }
        
            if(player1turn === true){
        
                playerOneturnContainer.classList.remove('your-turn');
        
                playerTwoturnContainer.classList.add('your-turn');
        
            }
    
            player1turn = player1turn === false ? true : false;
        }
    
    
        return {changeTurnOnDOM}
    
    
        
    })();

    startGame();


    return {updateTurnColor}


})(gameBoard);






function restartGame (){

    const restartButtonDOM = document.querySelector('.restart-button');

    restartButtonDOM.addEventListener('click', function(){
        
        gameBoard = gameBoardFactory(gridNumber);

        player1turn = true;

        gameWon = false;



        // Need to clear DOM Grid and Status display textContent and also reset gameWon value to false. turn gameWon to a function expression?

        const gridDOM = document.querySelectorAll('.grid');

        gridDOM.forEach(grid => {
            grid.textContent = '';
        })

        const statusDisplayDOM = document.querySelector('.status-display');

        statusDisplayDOM.textContent = 'START!';

        
        
    })






}

restartGame();


function removeTurnColor () {

    const playerOneturnContainer = document.querySelector('.player-one-container');

    const playerTwoturnContainer = document.querySelector('.player-two-container');

    playerOneturnContainer.classList.remove('your-turn');

    playerTwoturnContainer.classList.remove('your-turn');

}

        