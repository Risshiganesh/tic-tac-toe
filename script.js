//This is basically object manipulation

// Put inside a module and send it to
let gridNumber = 3; //put this in a module later, this is player input



// put this inside a module





//factory function
const gameBoard = (function(gridNumberPlaceholder){


    let board = [];

    for (let r = 0; r < gridNumberPlaceholder; r++) {

        for (let c = 0; c < gridNumberPlaceholder; c++)
        

        board.push(createGrid(r,c,'.'));

            
    }    
    
    
    // Factory function to create grids
    function createGrid (row,col,marker){
    
        return {row,col,marker}
    }

        

return {board};

})(gridNumber);


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








// COMPLETE THE FLOW AND MODULARISE EVERYTHING


const gameFlow = (function () {
    
    // first create players
    let player1turn = true;

    const players = function (name,marker){

        // may have to modify this to add marker without row and col
        // const choice = function(row,col){
    
        //     console.log(name+" plays")
    
        //     let chosenGrid = '';
        
        //     gameBoard.board.forEach(grid => {
    
        //         // Only add the marker to the grid that was chosen
                
        //         if (grid.row === row && grid.col === col){
                    
        //             chosenGrid = grid;
                
        //         }
        
        //     });
        
        //     if(!(chosenGrid.marker === 'x'|| chosenGrid.marker === 'o')) {
        
                
        //         chosenGrid.marker = marker;
    
        //         player1turn = player1turn === false ? true : false;
        
        //         consoleDisplay(gameBoard);
        
        //     }else{
        //         console.log('that grid is taken!');
        //     }
        
        //     gridCheck(gameBoard,this);
    
        //     // 'this' refers to this object
        //     // console.log(this);
    
            
        
        // }


        const choice = function(nodeNumber){
    
            console.log(name+" plays")
    
            
        

            let gameBoardArray = gameBoard.board;

            let chosenGrid = gameBoardArray[nodeNumber];


            // gameBoard.board.forEach(grid => {
    
            //     // Only add the marker to the grid that was chosen
                
            //     if (grid.row === row && grid.col === col){
                    
            //         chosenGrid = grid;
                
            //     }
        
            // });

            
        
            if(!(chosenGrid.marker === 'x'|| chosenGrid.marker === 'o')) {
        
                
                chosenGrid.marker = marker;
    
                player1turn = player1turn === false ? true : false;
        
                consoleDisplay(gameBoard);
        
            }else{
                console.log('that grid is taken!');
            }
        
            gridCheck(gameBoard,this);
    
            // 'this' refers to this object
            // console.log(this);
    
            
        
        }





    
        return {name,choice,marker};
    
    };

    // change this with a form input later
    // let player1Name = prompt('Input player 1 name','') || 'Player 1';

    // let player2Name = prompt('Input player 2 name','') || 'Player 2';





    const player1= players('player1Name','x');




    const player2 = players('player2Name','o');




    

    // console.log(choice1);

    // player1.choice(2,0);

    // player1.choice(1,1);

    // player1.choice(0,2);

    // player2.choice(0,0);



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
    
            // markerCheck(gridArray,player2);
    
    
        // Column check
            
    
            gridArray = [];
    
    
            console.log(player1);
            
    
            boardArray.forEach(grid => {
            
                if(grid.col === index ) {
    
                    gridArray.push(grid);
    
                }
        
        
            });
    
    
            markerCheck(gridArray,player1);
    
            // markerCheck(gridArray,player2);
    
            
            // gridArray = [];
    
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
    
            // console.log(gridArray);
    
            markerCheck(gridArray,player1);
    
            // markerCheck(gridArray,player2);
    
            gridArray =[];
    
        }
    
        descendingLineCheck();
    
    
        // console.log(descendingLineArray);
    
    
    
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
    
    
            // console.log(gridArray);
    
            // console.log(ascendingGridArray);
    
            // console.log(gridNumber);
    
            markerCheck(gridArray,player1);
    
            // markerCheck(gridArray,player2);
        
    
        }
    
        ascendingLineCheck();
    
    
        drawCheck(boardArray);

    
        
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
    
            console.log(player.name+' wins!');
    
            return;
    
            //create a function to disable grid input and pop up a restart button
        
        }
    
        markerCheck = [];
    
    
    }
    
    
    
    
    // module
    
    function drawCheck (boardArrayPlaceholder) {
    
        let gridArray = [];
    
        boardArrayPlaceholder.forEach(grid => {
            
            if(grid.marker === '.' || (!grid.marker)){
    
                gridArray.push(grid);
    
                
                // return;
            }
            
    
        });
    
        if(gridArray.length === 0){
    
            console.log('Game is a draw!');
    
        }
    
    }

    let p = function(row, col){

        let test = player1turn? player1.choice(row,col):player2.choice(row,col);
    
        return test;
    
    }

    
    
    // methods that are available
    return {p};

})();



// console.log(gameFlow.choice1);

// 



// this returns choices, not player object



// module for DOM
const displayController = (function(gameBoardPlaceholder){

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

        })
    });


})(gameBoard);