import { createBoard } from "./board.js";
import { createPlayer } from "./players.js";
import { events } from "./pubsub.js";


const referee = { gameBoard: null, player1: null, player2: null, turn: -1, numGame: -1 };

function play(objPostion) {

    if (referee.gameBoard.checkPositionEmpty(objPostion.rowPos, objPostion.colPos)) {

        let player, secPlayer;
        if (referee.turn === 1) {

            player = referee.player1;
            secPlayer = referee.player2
        } else {
            player = referee.player2;
            secPlayer = referee.player1
        }

        referee.gameBoard.placeMark(player.getID(), player.getImgAlt(), objPostion.rowPos, objPostion.colPos, referee.turn);
        const threeLineResult = referee.gameBoard.veridateThreeInLine(player.getID(), objPostion.rowPos, objPostion.colPos);

        if (threeLineResult && threeLineResult !== "full") {
            player.setWins(player.getWins() + 1);
            //secPlayer.setLosses(secPlayer.getLosses() + 1);

            //referee.gameBoard.drawThreeLine(objPostion.rowPos, objPostion.colPos, threeLineResult);
            referee.gameBoard.pulseMarks(objPostion.rowPos, objPostion.colPos, threeLineResult);



            referee.turn = 1;

            referee.player1.unNotifyTurn();
            referee.player2.unNotifyTurn();

            setTimeout(() => {
                referee.gameBoard = createBoard();
            }, 2300);

            setTimeout(() => {
                referee.player1.notifyTurn();
            }, 3500);

            referee.numGame++;

            //referee.gameBoard = createBoard();
        } else if (threeLineResult === "full") {

            referee.gameBoard.notifyTie();

            referee.numGame++;
            referee.turn = 1;

            referee.player1.unNotifyTurn();
            referee.player2.unNotifyTurn();

            setTimeout(() => {
                referee.gameBoard = createBoard();
            }, 2300);

            setTimeout(() => {
                referee.player1.notifyTurn();
            }, 3000);
        } else {
            referee.turn = (referee.turn === 1) ? 2 : 1;

            player.unNotifyTurn();

            setTimeout(() => {
                secPlayer.notifyTurn();

            }, 1500);
        }
    }


}

function startNewGame() {

    referee.gameBoard = createBoard();
    referee.player1 = createPlayer("Player 1", "x");
    referee.player2 = createPlayer("Player 2", "o");
    referee.turn = 1;
    referee.numGame = 1;

    setTimeout(() => referee.player1.notifyTurn(), 1500);

    referee.player1.setPanel("player1");
    referee.player2.setPanel("player2");

    events.on("clickOnCell", play);

}

startNewGame();