//This is basically object manipulation

let gridNumber = 3; //put this in a module later, this is player input

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

// console.log(gameBoard);


// module for DOM
const displayController = (function(){



})();




// put this inside a module
let player1turn = true;







// Factory function 
const players = function (name,marker){

    // this works!
    // const choose = function(row,col){
    //     const gridLocation = 
    //         gameBoard.board.find(grid => {

    //         return (grid.row === row && grid.col === col);


    //     });

    //     gridLocation.marker = marker;

        
    //     console.log(gridLocation.marker);

    //     consoleDisplay(gameBoard);

    // };

    // or use this 


    const choice = function(row,col){

        console.log(name+" plays")

        let chosenGrid = '';
    
        gameBoard.board.forEach(grid => {

            // Only add the marker to the grid that was chosen
            
            if (grid.row === row && grid.col === col){
                
                chosenGrid = grid;
            
            }
    
        });
    
        if(!(chosenGrid.marker === 'x'|| chosenGrid.marker === 'o')) {
    
            
            chosenGrid.marker = marker;

            player1turn = player1turn === false ? true : false;
    
            consoleDisplay(gameBoard);
    
        }else{
            console.log('that grid is taken!');
        }
    
        gridCheck(gameBoard);

        
    
    }

    return {name,choice,marker};

};







const player1= players('risshi','x')

// console.log(player1);

const player2 = players('ganesh','o');

// console.log(player2);


player1.choice(2,0);









let p = function(row, col){

    let test = player1turn? player1.choice(row,col):player2.choice(row,col);

    return test;

}



// module

function gridCheck(gameBoard){
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

        markerCheck(gridArray,player2);


    // Column check
        

        gridArray = [];


        

        boardArray.forEach(grid => {
        
            if(grid.col === index ) {

                gridArray.push(grid);

            }
    
    
        });


        markerCheck(gridArray,player1);

        markerCheck(gridArray,player2);

        
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

        markerCheck(gridArray,player2);

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

        markerCheck(gridArray,player2);
    

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