import { createBoard } from "./board.js";
import { createPlayer, createPlayerRobot } from "./players.js";
import { events } from "./pubsub.js";


const referee = { gameBoard: null, player1: null, player2: null, turn: -1, numGame: -1, numPlayers: -1 };

const divPresentation = document.querySelector(".presentation-ui");
const divSelection = document.querySelector(".selection");
const divCollection = document.querySelector(".names-collection");

const divGame = document.querySelector(".game-ui");

const audioWelcome = document.getElementById("welcome-audio");

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

            referee.gameBoard.pulseMarks(objPostion.rowPos, objPostion.colPos, threeLineResult);

            referee.turn = 1;

            referee.player1.unNotifyTurn();
            referee.player2.unNotifyTurn();

            setTimeout(() => {
                referee.gameBoard.restartBoard();
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
                referee.gameBoard.restartBoard();
            }, 2300);

            setTimeout(() => {
                referee.player1.notifyTurn();
            }, 3000);
        } else {
            referee.turn = (referee.turn === 1) ? 2 : 1;

            player.unNotifyTurn();
            secPlayer.unNotifyTurn();

            //setTimeout(() => {
            secPlayer.notifyTurn();

            //}, 500);
        }
    }


}

// function restartGame(){

// }

function startNewGame(namePlayer1, namePlayer2) {

    referee.gameBoard = createBoard();
    referee.player1 = createPlayer(namePlayer1, "x");
    referee.player2 = (referee.numPlayers === 2) ? createPlayer(namePlayer2, "o") : createPlayerRobot(namePlayer2, "o", referee.gameBoard.getArrBoard());
    referee.turn = 1;
    referee.numGame = 1;

    referee.player1.setPanel("player1");
    referee.player2.setPanel("player2");

    divPresentation.classList.add("hidden");
    divGame.classList.remove("hidden");

    const btnRestartGame = document.getElementById("restart-game");
    btnRestartGame.onclick = startPresentation;

    setTimeout(() => referee.player1.notifyTurn(), 1500);

    events.on("clickOnCell", play);
}

function onClickStartNow() {

    const frm = document.getElementById("form-collection");

    if (frm.checkValidity()) {
        audioWelcome.pause();
        audioWelcome.currentTime = 0;

        const audioSelection = document.getElementById("fight-audio");
        audioSelection.volume = 0.4;
        audioSelection.play();

        const inputPlayer2Name = document.getElementById("input-player2-name");
        const inputPlayer1Name = document.getElementById("input-player1-name");

        startNewGame(inputPlayer1Name.value, inputPlayer2Name.value);
    }
}

function onClickOption() {

    this.classList.add("animation-mark-pulse-option");
    const audioSelection = document.getElementById("selection-audio");
    audioSelection.volume = 0.2;
    audioSelection.play();

    const labelPlayer2Name = document.querySelector("label[for='input-player2-name']");
    const inputPlayer2Name = document.getElementById("input-player2-name");
    const inputPlayer1Name = document.getElementById("input-player1-name");

    if (this.id === "pPlayers1") {

        referee.numPlayers = 1;

        labelPlayer2Name.textContent = "R2D2 🤖";
        labelPlayer2Name.classList.remove("text-lg");
        labelPlayer2Name.classList.add("text-2xl");

        inputPlayer2Name.value = "R2D2 🤖";
        inputPlayer2Name.classList.add("hidden");
    } else {

        referee.numPlayers = 2;

        labelPlayer2Name.textContent = "Player 2 name:";
        labelPlayer2Name.classList.remove("text-2xl");
        labelPlayer2Name.classList.add("text-lg");

        inputPlayer2Name.value = "";
        inputPlayer2Name.classList.remove("hidden");
    }
    setTimeout(() => {

        divSelection.classList.add("hidden");

        divCollection.classList.remove("hidden");

        const btnStartNow = document.getElementById("start-now");
        btnStartNow.onclick = onClickStartNow;
    }, 1600);

}

function startPresentation() {

    audioWelcome.volume = 0.4;
    //audioWelcome.play();

    divPresentation.classList.remove("hidden");

    divSelection.classList.remove("hidden");
    divCollection.classList.add("hidden");

    divGame.classList.add("hidden");

    const optionPlayers = document.querySelectorAll(".player-option");
    optionPlayers.forEach(option => {
        option.classList.remove("animation-mark-pulse-option");
        option.onclick = onClickOption.bind(option)
    });
}

startPresentation();