
const gameBoard = (() => {

    let rowOne = [null, null, null];
    let rowTwo = [null, null, null];
    let rowThree = [null, null, null];

    const playBoardSpace = (playerRole, rowIndex, columnIndex) => {

        // error checking
        if(rowIndex < 0 || rowIndex > 2){
            throw 'Error, rowIndex must be between 0 and 2';
        }
        if(columnIndex < 0 || columnIndex > 2){
            throw 'Error, columnIndex must be between 0 and 2';
        }
        if(playerRole !== 'O' && playerRole !== 'X'){
            throw 'Error, playerRole must be either O or X';
        }

        // make sure someone hasn't already played the space as well
        if(rowIndex === 0){
            if(rowOne[columnIndex] !== null){
                throw 'Error, board space already occupied';
            }
            rowOne[columnIndex] = playerRole;
        } else if(rowIndex === 1){
            if(rowTwo[columnIndex] !== null){
                throw 'Error, board space already occupied';
            }
            rowTwo[columnIndex] = playerRole;
        } else if(rowIndex === 2){
            if(rowThree[columnIndex] !== null){
                throw 'Error, board space already occupied';
            }
            rowThree[columnIndex] = playerRole;
        }

    }
    
    const clearBoard = () => {

        gameBoard.rowOne = [null, null, null];
        gameBoard.rowTwo = [null, null, null];
        gameBoard.rowThree = [null, null, null];

    };

    
    return{
        rowOne,
        rowTwo,
        rowThree,
        playBoardSpace,
        clearBoard,
    };

    }
)();

console.log(gameBoard.rowOne);