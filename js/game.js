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

        referee.gameBoard.placeMark(player.getID(), player.getImgSrc(), player.getImgAlt(), objPostion.rowPos, objPostion.colPos);
        const threeLineResult = referee.gameBoard.veridateThreeInLine(player.getID(), objPostion.rowPos, objPostion.colPos);

        if (threeLineResult) {
            player.setWins(player.getWins() + 1);
            secPlayer.setWins(player.getLosses() + 1);

            //pintar la raya
            //reiniciar tablero
        } else {
            referee.turn = (referee.turn === 1) ? 2 : 1;
        }
    }


}

function startNewGame() {

    referee.gameBoard = createBoard();
    referee.player1 = createPlayer("Player 1", "./img/x.svg", "x", "./img/profile-test.png", "img player 1");
    referee.player2 = createPlayer("Player 2", "./img/o.svg", "o", "./img/profile-test.png", "img player 2");
    referee.turn = 1;
    referee.numGame = 1;

    referee.player1.setPanel("player1");
    referee.player2.setPanel("player2");

    events.on("clickOnCell", play);

}

startNewGame();