const bodyDiv = document.querySelector('#body');
let newGame;
let roundCount = 0;
let turnCount = 0;
let boardInputs = [];
let roundOver = false;

const getRoundOver = () => {
    return roundOver;
};

const setRoundOver = () => {
    roundOver = true;
}

const resetRoundOver = () => {
    roundOver = false;
}

const setNewGame = () => {
    newGame = true;
}

const updateBoardInputs = (inputArray) => {
    boardInputs = inputArray;
}

const gameBoard = (() => {

    let occupiedSpaceTestPass = false;

    const getOccupiedSpaceTestPass = () => {
        return occupiedSpaceTestPass;
    }

    const resetOccupiedSpaceTestPass = () => {
        occupiedSpaceTestPass = false;
    }

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
                alert('Error, board space already occupied');
                return;
            }
            rowOne[columnIndex] = playerRole;
        } else if(rowIndex === 1){
            if(rowTwo[columnIndex] !== null){
                alert('Error, board space already occupied');
                return;
            }
            rowTwo[columnIndex] = playerRole;
        } else if(rowIndex === 2){
            if(rowThree[columnIndex] !== null){
                alert('Error, board space already occupied');
                return;
            }
            rowThree[columnIndex] = playerRole;
        }

        // if it made it this far, it isn't going in an occupied space
        occupiedSpaceTestPass = true; 

    };
    
    const clearBoard = () => {

        rowOne = [null, null, null];
        rowTwo = [null, null, null];
        rowThree = [null, null, null];

    };

    
    return{
        getBoardData,
        playBoardSpace,
        clearBoard,
        getOccupiedSpaceTestPass,
        resetOccupiedSpaceTestPass,
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
        gameBoard.clearBoard();
        beginPlayerTurn();
        // first to three wins
        if(roundsWon >= 3){
            gameState = 'win';
        }
    };
    const resetRounds = () => {
        roundsWon = 0;
    }
    const resetGameState = () => {
        gameState = 'playing';
    }
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
        resetGameState,
        resetWonLastRound,
        beginPlayerTurn,
        endPlayerTurn,
        setPlayerRole,
        playTurn,
        resetRounds,
    };
}

// create our players
let playerOne = Player();

let playerTwo = Player();

    // reset our board
    gameBoard.clearBoard();
    // keep track of turns and rounds
    roundCount = 0;
    turnCount = 0;

    const deleteBoard = () => {
        board = document.querySelector('#game-container');
        board.remove();
    }

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
            roundCount += 1;
            //setRoundOver();
            gameBoard.clearBoard();
            deleteBoard();
            createWinRoundBoard(0);
        }

        // check if there is a win across rows
        for(let i = 0; i <3; i++){
            if(gameBoard.getBoardData()[i].every((val, i, arr) => val === arr[0])){
                if(playerOne.getPlayerRole() === gameBoard.getBoardData()[i][0]){
                    playerOne.tallyRoundWon();
                    roundCount += 1;
                    //setRoundOver();
                    deleteBoard();
                    createWinRoundBoard(1);
                } else if(playerTwo.getPlayerRole() === gameBoard.getBoardData()[i][0]){
                    playerTwo.tallyRoundWon();
                    roundCount += 1;
                    //setRoundOver();
                    deleteBoard();
                    createWinRoundBoard(2);
                }
            }
        }
        // check if there is a win across columns
        for(let i = 0; i < 3; i++){
            if(gameBoard.getBoardData()[0][i] === gameBoard.getBoardData()[1][i] && gameBoard.getBoardData()[0][i] === gameBoard.getBoardData()[2][i]){
                if(playerOne.getPlayerRole() === gameBoard.getBoardData()[0][i]){
                    playerOne.tallyRoundWon();
                    roundCount += 1;
                    //setRoundOver();
                    deleteBoard();
                    createWinRoundBoard(1);
                } else if(playerTwo.getPlayerRole() === gameBoard.getBoardData()[0][i]){
                    playerTwo.tallyRoundWon();
                    roundCount += 1;
                    //setRoundOver();
                    deleteBoard();
                    createWinRoundBoard(2);
                }         
            }
        }

        // check if there is a win across columns (there are only two ways)
        if(gameBoard.getBoardData()[0][0] === gameBoard.getBoardData()[1][1] && gameBoard.getBoardData()[0][0] === gameBoard.getBoardData()[2][2]){
            if(playerOne.getPlayerRole() === gameBoard.getBoardData()[0][0]){
                playerOne.tallyRoundWon();
                roundCount += 1;
                //setRoundOver();
                deleteBoard();
                createWinRoundBoard(1);
            } else if(playerTwo.getPlayerRole() === gameBoard.getBoardData()[0][0]){
                playerTwo.tallyRoundWon();
                roundCount += 1;
                //setRoundOver();
                deleteBoard();
                createWinRoundBoard(2);
            }   
        }
        if(gameBoard.getBoardData()[0][2] === gameBoard.getBoardData()[1][1] && gameBoard.getBoardData()[0][2] === gameBoard.getBoardData()[2][0]){
            if(playerOne.getPlayerRole() === gameBoard.getBoardData()[0][2]){
                playerOne.tallyRoundWon();
                roundCount += 1;
                //setRoundOver();
                deleteBoard();
                createWinRoundBoard(1);
            } else if(playerTwo.getPlayerRole() === gameBoard.getBoardData()[0][2]){
                playerTwo.tallyRoundWon();
                roundCount += 1;
                //setRoundOver();
                deleteBoard();
                createWinRoundBoard(2);
            }   
        }

    };

//// UI stuff

// create player selection form
const createNewGameForm = () => {

    roundCount = 0;
    turnCount = 0;
    boardInputs = [];
    roundOver = false;

    let newGameContainer = document.createElement('div');
    newGameContainer.setAttribute('id', 'new-game-container');

    let divLeft = document.createElement('div');
    divLeft.setAttribute('id', 'new-game-left');
    divLeft.setAttribute('class', 'new-game-div');
    let divLeftText = document.createTextNode('Yes');
    divLeft.appendChild(divLeftText);
    let divMiddle = document.createElement('div');
    divMiddle.setAttribute('id', 'new-game-middle')
    let divMiddleText = document.createTextNode('Start New Game');
    divMiddle.appendChild(divMiddleText);
    let divRight = document.createElement('div');
    divRight.setAttribute('id', 'new-game-right')
    divRight.setAttribute('class', 'new-game-div');
    let divRightText = document.createTextNode('No');
    divRight.appendChild(divRightText);

    newGameContainer.appendChild(divLeft);
    newGameContainer.appendChild(divMiddle);
    newGameContainer.appendChild(divRight);

    bodyDiv.appendChild(newGameContainer);

    newGameForm = document.querySelectorAll('.new-game-div');

    newGameForm.forEach(divs => {
        divs.addEventListener('click', function(){
            if(divs.id === 'new-game-left'){
                // select players first
                newGameContainer.remove();
                setNewGame();
                createSelectPlayerForm();
            }
        })
    })

}

// create player selection form
const createSelectPlayerForm = () => {

    let selectPlayerContainer = document.createElement('div');
    selectPlayerContainer.setAttribute('id', 'select-player-container');

    let divLeft = document.createElement('div');
    divLeft.setAttribute('id', 'div-left');
    divLeft.setAttribute('class', 'selection-div');
    let divLeftText = document.createTextNode('\u2715');
    divLeft.appendChild(divLeftText);
    let divMiddle = document.createElement('div');
    divMiddle.setAttribute('id', 'div-middle')
    let divMiddleText = document.createTextNode('Player 1 Select Character');
    divMiddle.appendChild(divMiddleText);
    let divRight = document.createElement('div');
    divRight.setAttribute('id', 'div-right')
    divRight.setAttribute('class', 'selection-div');
    let divRightText = document.createTextNode('\u25EF');
    divRight.appendChild(divRightText);

    selectPlayerContainer.appendChild(divLeft);
    selectPlayerContainer.appendChild(divMiddle);
    selectPlayerContainer.appendChild(divRight);

    bodyDiv.appendChild(selectPlayerContainer);

    let selectionDivs = document.querySelectorAll('.selection-div');

    selectionDivs.forEach(divs => {
        divs.addEventListener('click', function(){
            if(divs.id === 'div-left'){
                playerOne.setPlayerRole('X');
                let playerTwoSelectRole = playerOne.getPlayerRole() == 'X' ? 'O' : 'X';
                playerTwo.setPlayerRole(playerTwoSelectRole);
                selectPlayerContainer.remove();
                createBoard();
            } else if(divs.id === 'div-right'){
                playerOne.setPlayerRole('O');
                let playerTwoSelectRole = playerOne.getPlayerRole() == 'X' ? 'O' : 'X';
                playerTwo.setPlayerRole(playerTwoSelectRole);
                selectPlayerContainer.remove();
                createBoard();
            }
        })
    });

};

// creates our visual gameboard
const createBoard = () => {
    let gameContainer = document.createElement('div');
    gameContainer.setAttribute('id', 'game-container');

    let boardRowOne = document.createElement('div');
    boardRowOne.setAttribute('id', 'row-one');
    let boardRowOneColOne = document.createElement('div');
    boardRowOneColOne.setAttribute('id', 'row-one-col-one');
    boardRowOneColOne.setAttribute('class', 'game-square');
    let boardRowOneColTwo = document.createElement('div');
    boardRowOneColTwo.setAttribute('id', 'row-one-col-two');
    boardRowOneColTwo.setAttribute('class', 'game-square');
    let boardRowOneColThree = document.createElement('div');
    boardRowOneColThree.setAttribute('id', 'row-one-col-three');
    boardRowOneColThree.setAttribute('class', 'game-square');
    boardRowOne.appendChild(boardRowOneColOne);
    boardRowOne.appendChild(boardRowOneColTwo);
    boardRowOne.appendChild(boardRowOneColThree);

    let boardRowTwo = document.createElement('div');
    boardRowTwo.setAttribute('id', 'row-two');
    let boardRowTwoColOne = document.createElement('div');
    boardRowTwoColOne.setAttribute('id', 'row-two-col-one');
    boardRowTwoColOne.setAttribute('class', 'game-square');
    let boardRowTwoColTwo = document.createElement('div');
    boardRowTwoColTwo.setAttribute('id', 'row-two-col-two');
    boardRowTwoColTwo.setAttribute('class', 'game-square');
    let boardRowTwoColThree = document.createElement('div');
    boardRowTwoColThree.setAttribute('id', 'row-two-col-three');
    boardRowTwoColThree.setAttribute('class', 'game-square');
    boardRowTwo.appendChild(boardRowTwoColOne);
    boardRowTwo.appendChild(boardRowTwoColTwo);
    boardRowTwo.appendChild(boardRowTwoColThree);


    let boardRowThree = document.createElement('div');
    boardRowThree.setAttribute('id', 'row-three');
    let boardRowThreeColOne = document.createElement('div');
    boardRowThreeColOne.setAttribute('id', 'row-three-col-one');
    boardRowThreeColOne.setAttribute('class', 'game-square');
    let boardRowThreeColTwo = document.createElement('div');
    boardRowThreeColTwo.setAttribute('id', 'row-three-col-two');
    boardRowThreeColTwo.setAttribute('class', 'game-square');
    let boardRowThreeColThree = document.createElement('div');
    boardRowThreeColThree.setAttribute('id', 'row-three-col-three');
    boardRowThreeColThree.setAttribute('class', 'game-square');
    boardRowThree.appendChild(boardRowThreeColOne);
    boardRowThree.appendChild(boardRowThreeColTwo);
    boardRowThree.appendChild(boardRowThreeColThree);
    
    gameContainer.appendChild(boardRowOne);
    gameContainer.appendChild(boardRowTwo);
    gameContainer.appendChild(boardRowThree);

    bodyDiv.appendChild(gameContainer);

    SelectSquare();
};

// select before logic
const SelectSquare = () => {
        
    let gamesquares = document.querySelectorAll('.game-square');
    
    let coordsOut = [];

    const inputClickAsCoords = (e) => {

        if(e.target.id === 'row-one-col-one'){
            coordsOut = [0, 0];
        } else if(e.target.id === 'row-one-col-two'){
            coordsOut = [0, 1];
        } else if(e.target.id === 'row-one-col-three'){
            coordsOut = [0, 2];
        } else if(e.target.id === 'row-two-col-one'){
            coordsOut = [1, 0];
        } else if(e.target.id === 'row-two-col-two'){
            coordsOut = [1, 1];
        } else if(e.target.id === 'row-two-col-three'){
            coordsOut = [1, 2];
        } else if(e.target.id === 'row-three-col-one'){
            coordsOut = [2, 0];
        } else if(e.target.id === 'row-three-col-two'){
            coordsOut = [2, 1];
        } else if(e.target.id === 'row-three-col-three'){
            coordsOut = [2, 2];
        } 


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
        // if it doesnt meet the exceptions above then its just whever's turn it is
        switch(playerOne.getPlayerTurn()){
            case true:
                // user input
                if(getRoundOver() === false){
                    // make sure its a free space
                    while(gameBoard.getOccupiedSpaceTestPass() == false){
                        let playerOneInputRow = coordsOut[0];
                        let playerOneInputColumn = coordsOut[1];
                        // play input
                        playerOne.playTurn(
                            playerOneInputRow,
                            playerOneInputColumn,
                        );
                        if(playerOne.getPlayerRole() === 'X'){
                            playerMark = document.createTextNode('\u2715');
                            e.target.appendChild(playerMark);
                        } 
                        if(playerOne.getPlayerRole() === 'O'){
                            playerMark = document.createTextNode('\u25EF');
                            e.target.appendChild(playerMark);
                        }
                    }
                    playerOne.endPlayerTurn();
                    gameBoard.resetOccupiedSpaceTestPass();
                    // now its the other player's turn
                    playerTwo.beginPlayerTurn();
                    // check if there is a win
                    checkWin();
                }
                // record turn
                turnCount += 1;
                break;
            case false:
                // user input
                if(getRoundOver() === false){
                    // make sure its a free space
                    while(gameBoard.getOccupiedSpaceTestPass() == false){
                        playerTwoInputRow = coordsOut[0];
                        playerTwoInputColumn = coordsOut[1];
                        // play input
                        playerTwo.playTurn(
                            playerTwoInputRow,
                            playerTwoInputColumn,
                        );
                        if(playerTwo.getPlayerRole() === 'X'){
                            playerMark = document.createTextNode('\u2715');
                            e.target.appendChild(playerMark);
                        } 
                        if(playerTwo.getPlayerRole() === 'O'){
                            playerMark = document.createTextNode('\u25EF');
                            e.target.appendChild(playerMark);
                        }
                    }
                    playerTwo.endPlayerTurn();
                    gameBoard.resetOccupiedSpaceTestPass();
                    // now its the other player's turn
                    playerOne.beginPlayerTurn();
                    // check if there is a win
                    checkWin();
                }
                // record turn
                turnCount += 1;
    
        }
    }
    
    gamesquares.forEach(gamesquare => {
        gamesquare.addEventListener('click', inputClickAsCoords);
    });

};

const createWinRoundBoard = (inputDigit) => {
    
    let textInput
    
    if(inputDigit === 0){
        textInput = 'Round ends in a Draw! (' + roundCount + ' Rounds Played)';
    } else if(inputDigit === 1){
        textInput = 'Player 1 Wins This Round!' + '\n' + '(' + playerOne.getRoundsWon() + '/' + roundCount + ' Rounds)';
    } else if(inputDigit === 2){
        textInput = 'Player 2 Wins This Round!' + '\n' + '(' + playerTwo.getRoundsWon() + '/' + roundCount + ' Rounds)';
    }

    let buttonTextInput;

    if(playerOne.getRoundsWon() >= 3 || playerTwo.getRoundsWon() >= 3){
        buttonTextInput = 'Okay';
    } else if(playerOne.getRoundsWon() < 3 && playerOne.getRoundsWon() < 3){
        buttonTextInput = 'Next Round'
    }

    winRoundBoard = document.createElement('div');
    winRoundBoard.setAttribute('id', 'win-round-board');

    topDiv = document.createElement('div');
    topDiv.setAttribute('id', 'top-div-win-round-board');
    topDivText = document.createTextNode(textInput);
    topDiv.appendChild(topDivText);

    bottomDiv = document.createElement('div');
    bottomDiv.setAttribute('id', 'bottom-div-win-round-board');
    bottomDivButton = document.createElement('div');
    bottomDivButton.setAttribute('id', 'bottom-div-button-win-round-board');
    bottomDiv.appendChild(bottomDivButton);
    buttonText = document.createTextNode(buttonTextInput);
    bottomDivButton.appendChild(buttonText);

    winRoundBoard.appendChild(topDiv);
    winRoundBoard.appendChild(bottomDiv);

    bodyDiv.appendChild(winRoundBoard);

    buttonSelector = document.querySelector('#bottom-div-button-win-round-board');
    buttonSelector.addEventListener('click', () => {
            winRoundBoard.remove();
            if(playerOne.getRoundsWon() >= 3){
                endGame(1);
            }
            if(playerTwo.getRoundsWon() >= 3){
                endGame(2);
            }
            if(playerOne.getRoundsWon() < 3 && playerTwo.getRoundsWon() < 3){
                createBoard();
            }
        });

};

const endGame = (inputDigits) => {

    roundCount = 0;
    turnCount = 0;
    boardInputs = [];
    roundOver = false;

    let inputText;

    if(inputDigits === 1){
        inputText = 'Game Over! Player 1 Wins!';
    }
    if(inputDigits === 2){
        inputText = 'Game Over! Player 2 Wins!';
    }

    endGameBoard = document.createElement('div');
    endGameBoard.setAttribute('id', 'end-game-board');

    topDiv = document.createElement('div');
    topDiv.setAttribute('id', 'top-div-end-game-board');
    topDivText = document.createTextNode(inputText);
    topDiv.appendChild(topDivText);

    bottomDiv = document.createElement('div');
    bottomDiv.setAttribute('id', 'bottom-div-end-game-board');
    bottomDivButton = document.createElement('div');
    bottomDivButton.setAttribute('id', 'bottom-div-button-end-game-board');
    bottomDiv.appendChild(bottomDivButton);
    buttonText = document.createTextNode('Okay');
    bottomDivButton.appendChild(buttonText);

    endGameBoard.appendChild(topDiv);
    endGameBoard.appendChild(bottomDiv);

    bodyDiv.appendChild(endGameBoard);

    buttonSelector = document.querySelector('#bottom-div-button-end-game-board');
    buttonSelector.addEventListener('click', () => {
        endGameBoard.remove();
        playerOne.resetRounds();
        playerTwo.resetRounds();
        createNewGameForm();
    });
}


createNewGameForm();