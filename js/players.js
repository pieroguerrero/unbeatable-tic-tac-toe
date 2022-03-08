
import { events } from "./pubsub.js";

const playerActions = {

    setPanel: function (panelClassID) {

        const panelHtml = document.querySelector("." + panelClassID);
        panelHtml.setAttribute("id", this.id);

        this.pPlayerName = panelHtml.querySelector(".name-image p");
        this.pPlayerName.textContent = this.name;

        this.pWinsHtml = panelHtml.querySelector(".wins-value");
        this.pWinsHtml.textContent = this.nWins + "";

        // this.pLossesHtml = panelHtml.querySelector(".losses-value");
        // this.pLossesHtml.textContent = this.nLosses + "";
    },
    // setLosses: function (newNlosses) {

    //     this.nLosses = newNlosses;
    //     this.pLossesHtml.textContent = newNlosses + "";
    // },
    setWins: function (newNwins) {

        this.nWins = newNwins;
        this.pWinsHtml.textContent = newNwins + "";
    },
    notifyTurn: function () {

        this.pPlayerName.classList.add("animation-notify", "before:content-['▶_']");
    },
    unNotifyTurn: function () {

        this.pPlayerName.classList.remove("animation-notify", "before:content-['▶_']");
    },
    getWins: function () {
        return this.nWins;
    },
    // getLosses: function () {
    //     return this.nLosses;
    // },
    getID: function () {
        return this.id;
    },
    getImgAlt: function () {
        return this.imgAlt;
    },
    setName: function (newName) {
        this.name = newName;
    },

};

export function createPlayer(name, imgAlt) {

    const player = Object.create(playerActions);
    player.id = Date.now() + ((Math.random() * 100000).toFixed()) + "";
    player.name = name;
    player.imgAlt = imgAlt;
    player.pWinsHtml = null;
    player.pLossesHtml = null;
    player.nWins = 0;
    player.nLosses = 0;
    player.pPlayerName = null;

    return {
        getID: player.getID.bind(player),
        setPanel: player.setPanel.bind(player),
        notifyTurn: player.notifyTurn.bind(player),
        unNotifyTurn: player.unNotifyTurn.bind(player),
        getWins: player.getWins.bind(player),
        setWins: player.setWins.bind(player),
        getImgAlt: player.getImgAlt.bind(player),
        setName: player.setName.bind(player),

    };

};

const playerRobotActions = {

    notifyTurn: function () {
        this.notifyTurn();

        const charBoard = this.htmlBoard.map(row => {

            const newRow = row.map(cell => {

                if (cell === null) {
                    return "_"
                } else return cell.playerMark.imgAlt;
            });

            return newRow;
        });

        const { rowPos, colPos } = this.findBestMove(charBoard);


        setTimeout(

            () =>

                events.emit("clickOnCell", { rowPos, colPos })

            , 1200);

    },
    setHtmlBoard: function (htmlBoard) {
        this.htmlBoard = htmlBoard;
    },
    // getHtmlBoard: function () {
    //     return this.htmlBoard;
    // },
    isMovesLeft: function (charBoard) {
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (charBoard[i][j] == '_')
                    return true;

        return false;
    },
    evaluate3InLine: function (charBoard) {

        // Checking for Rows for X or O victory.
        for (let row = 0; row < 3; row++) {
            if (charBoard[row][0] == charBoard[row][1] &&
                charBoard[row][1] == charBoard[row][2]) {
                if (charBoard[row][0] == this.player)
                    return +10;

                else if (charBoard[row][0] == this.opponent)
                    return -10;
            }
        }

        // Checking for Columns for X or O victory.
        for (let col = 0; col < 3; col++) {
            if (charBoard[0][col] == charBoard[1][col] &&
                charBoard[1][col] == charBoard[2][col]) {
                if (charBoard[0][col] == this.player)
                    return +10;

                else if (charBoard[0][col] == this.opponent)
                    return -10;
            }
        }

        // Checking for Diagonals for X or O victory.
        if (charBoard[0][0] == charBoard[1][1] && charBoard[1][1] == charBoard[2][2]) {
            if (charBoard[0][0] == this.player)
                return +10;

            else if (charBoard[0][0] == this.opponent)
                return -10;
        }

        if (charBoard[0][2] == charBoard[1][1] &&
            charBoard[1][1] == charBoard[2][0]) {
            if (charBoard[0][2] == this.player)
                return +10;

            else if (charBoard[0][2] == this.opponent)
                return -10;
        }

        // Else if none of them have
        // won then return 0
        return 0;
    },
    minimax: function (charBoard, depth, isMax) {
        let score = this.evaluate3InLine(charBoard);

        // If Maximizer has won the game
        // return his/her evaluated score
        if (score == 10)
            return score;

        // If Minimizer has won the game
        // return his/her evaluated score
        if (score == -10)
            return score;

        // If there are no more moves and
        // no winner then it is a tie
        if (this.isMovesLeft(charBoard) == false)
            return 0;

        // If this maximizer's move
        if (isMax) {
            let best = -1000;

            // Traverse all cells
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {

                    // Check if cell is empty
                    if (charBoard[i][j] == '_') {

                        // Make the move
                        charBoard[i][j] = this.player;

                        // Call minimax recursively
                        // and choose the maximum value
                        best = Math.max(best, this.minimax(charBoard,
                            depth + 1, !isMax));

                        // Undo the move
                        charBoard[i][j] = '_';
                    }
                }
            }
            return best;
        }

        // If this minimizer's move
        else {
            let best = 1000;

            // Traverse all cells
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {

                    // Check if cell is empty
                    if (charBoard[i][j] == '_') {

                        // Make the move
                        charBoard[i][j] = this.opponent;

                        // Call minimax recursively and
                        // choose the minimum value
                        best = Math.min(best, this.minimax(charBoard,
                            depth + 1, !isMax));

                        // Undo the move
                        charBoard[i][j] = '_';
                    }
                }
            }
            return best;
        }
    },
    findBestMove: function (charBoard) {
        let bestVal = -1000;
        const bestMove = { rowPos: -1, colPos: -1 };

        // Traverse all cells, evaluate
        // minimax function for all empty
        // cells. And return the cell
        // with optimal value.
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                // Check if cell is empty
                if (charBoard[i][j] == '_') {

                    // Make the move
                    charBoard[i][j] = this.player;

                    // compute evaluation function
                    // for this move.
                    let moveVal = this.minimax(charBoard, 0, false);

                    // Undo the move
                    charBoard[i][j] = '_';

                    // If the value of the current move
                    // is more than the best value, then
                    // update best
                    if (moveVal > bestVal) {
                        bestMove.rowPos = i;
                        bestMove.colPos = j;
                        bestVal = moveVal;
                    }
                }
            }
        }

        console.log("The value of the best Move " +
            "is : ", bestVal + " row: " + bestMove.rowPos + " col:" + bestMove.colPos);

        return bestMove;
    },

};

export function createPlayerRobot(name, imgAlt, htmlBoard) {

    const objParent = createPlayer(name, imgAlt);
    const obj = Object.create(playerRobotActions);

    obj.htmlBoard = htmlBoard;
    obj.notifyTurn = objParent.notifyTurn.bind(objParent);
    obj.player = "o";
    obj.opponent = "x";

    return {
        getID: objParent.getID,
        setPanel: objParent.setPanel,
        unNotifyTurn: objParent.unNotifyTurn,
        getWins: objParent.getWins,
        setWins: objParent.setWins,
        getImgAlt: objParent.getImgAlt,
        setName: objParent.setName,

        notifyTurn: obj.__proto__.notifyTurn.bind(obj),
        setHtmlBoard: obj.setHtmlBoard.bind(obj),
    };
}