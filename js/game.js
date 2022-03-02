function createBoard() {

    const arrBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    const mark = (row, col, playerID, playerMark) => {

        arrBoard[row][col] = { playerID, playerMark };
        //emit event to print on screen
    };
};