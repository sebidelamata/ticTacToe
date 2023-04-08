
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


// player object
const Player = () => {

    // we can change this to false to use AI
    let human = true;
    // keep track of our score
    let roundsWon = 0;
    // who won last round will start this round
    let wonLastRound = false;
    // determine who won
    let gameState = 'playing';
    // whose turn is it
    let playerTurn = false;
    // what player are they
    let playerRole = null;
    //getter functions
    const getHuman = () => {
        return human;
    };
    const getRoundsWon = () => {
        return roundsWon;
    };
    const getwonLastRound = () => {
        return wonLastRound;
    };
    const getGameState = () => {
        return gameState;
    };
    const getPlayerTurn = () => {
        return playerTurn;
    };
    const getPlayerRole = () => {
        return playerRole;
    };
    // setter functions
    const selectPlayerAI = () => {
        human = false;
    };
    const selectPlayerHuman = () => {
        human = true;
    };
    const tallyRoundWon = () => {
        roundsWon += 1;
        wonLastRound = true;
        // first to three wins
        if(roundsWon >= 3){
            gameState = 'win';
        }
    };
    // reset who starts next round
    const resetWonLastRound = () => {
        wonLastRound = false;
    };
    const beginPlayerTurn = () => {
        playerTurn = true;
    }
    const endPlayerTurn = () => {
        playerTurn = false;
    };
    const setPlayerRole = (role) => {

        // error checking
        if(role !== 'O' && role !== 'X'){
            throw 'Player role must either be X or O';
        }

        playerRole = role;
    };

    return{
        getHuman,
        getRoundsWon,
        getwonLastRound,
        getGameState,
        getPlayerTurn,
        getPlayerRole,
        selectPlayerAI,
        selectPlayerHuman,
        tallyRoundWon,
        resetWonLastRound,
        beginPlayerTurn,
        endPlayerTurn,
        setPlayerRole,
    };
}

