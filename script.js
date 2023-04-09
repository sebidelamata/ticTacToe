
const gameBoard = (() => {

    let rowOne = [null, null, null];
    let rowTwo = [null, null, null];
    let rowThree = [null, null, null];

    const getBoardData = () => {
        let boardData = [
            rowOne,
            rowTwo,
            rowThree,
        ]
        return boardData;
    };

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

    };
    
    const clearBoard = () => {

        rowOne = [null, null, null];
        rowTwo = [null, null, null];
        rowThree = [null, null, null];

    };

    const checkWin = () => {

        // check if there is a tie first (no empty spaces)
        let nullCount = 8;

        for(let i = 0; i < 3; i++){
            for(let j = 0; j< 3; j++){
                if(gameBoard.getBoardData()[i][j] !== null){
                    nullCount -= 1;
                }
            }
        }

        if(nullCount < 1){
            console.log('Tie!');
            clearBoard();
        }

    }

    
    return{
        getBoardData,
        playBoardSpace,
        clearBoard,
        checkWin,
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

    const playTurn = (rowIndex, columnIndex) => {
        
        // make sure they have a role first
        if(getPlayerRole() === null){
            throw 'Pick player role first';
        }
        // make sure its their turn
        if(getPlayerTurn() !== true){
            throw 'Wait your turn!';
        }
        // play the space
        gameBoard.playBoardSpace(
            getPlayerRole(),
            rowIndex,
            columnIndex,
        );
            
        endPlayerTurn();
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
        playTurn,
    };
}

// the actual game of tic tac toe
const Game = () => {

    // reset our board
    gameBoard.clearBoard();
    // keep track of turns and rounds
    let roundCount = 0;
    let turnCount = 0;

    // create our players
    let playerOne = Player();

    let playerTwo = Player();

    // each round where game action happens
    const Turn = () => {

        // decide who gets to play
        // player one starts out otherwise whoever won the last round (if its the first turn)
        if(roundCount === 0 && turnCount === 0){
            playerOne.beginPlayerTurn();
        } else if(playerOne.getwonLastRound() === true && turnCount === 0){
            playerOne.beginPlayerTurn();
        } else if(playerTwo.getwonLastRound() === true && turnCount === 0){
            playerTwo.beginPlayerTurn();
        }
        // set logic to be only one player's turn at a time
        if(playerOne.getPlayerTurn() === true){
            playerTwo.endPlayerTurn();
        }
        if(playerTwo.getPlayerTurn() === true){
            playerOne.endPlayerTurn();
        }    

        // play the game
        switch(playerOne.getPlayerTurn()){
            case true:
                // user input
                let playerOneInputRow = Number(prompt('Input player one row'));
                console.log(typeof(playerOneInputRow));
                let playerOneInputColumn = Number(prompt('Input player one Column'));
                // play input
                playerOne.playTurn(
                    playerOneInputRow,
                    playerOneInputColumn,
                );
                // display board logic
                console.log(gameBoard.getBoardData());
                // check if there is a win
                gameBoard.checkWin();
                // now its the other player's turn
                playerTwo.beginPlayerTurn();
                let playerTwoInputRow = Number(prompt('Input player two row'));
                let playerTwoInputColumn = Number(prompt('Input player two Column'));
                // play input
                playerTwo.playTurn(
                    playerTwoInputRow,
                    playerTwoInputColumn,
                );
                // display board logic
                console.log(gameBoard.getBoardData());
                // check if there is a win
                gameBoard.checkWin();
                playerOne.beginPlayerTurn();
                // record round
                turnCount += 1;
                break;
            case false:
                // user input
                playerTwoInputRow = Number(prompt('Input player two row'));
                playerTwoInputColumn = Number(prompt('Input player two Column'));
                // play input
                playerTwo.playTurn(
                    playerTwoInputRow,
                    playerTwoInputColumn,
                );
                // display board logic
                console.log(gameBoard.getBoardData());
                // check if there is a win
                gameBoard.checkWin();
                // now its the other player's turn
                playerOne.beginPlayerTurn();
                playerOneInputRow = Number(prompt('Input player one row'));
                playerOneInputColumn = Number(prompt('Input player one Column'));
                // play input
                playerOne.playTurn(
                    playerOneInputRow,
                    playerOneInputColumn,
                );
                // display board logic
                console.log(gameBoard.getBoardData());
                // check if there is a win
                gameBoard.checkWin();
                playerTwo.beginPlayerTurn();
                // record round
                turnCount += 1;
        }

        

    }

    return{
        Turn,
        playerOne,
        playerTwo,
    }

}

Game();
