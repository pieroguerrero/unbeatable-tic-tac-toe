import { events } from "./pubsub.js";

const boardActions = {

    _clickOnCell: function () {

        const rowPos = Number(this.id.split("-")[0].substring(1));
        const colPos = Number(this.id.split("-")[1].substring(1));

        events.emit("clickOnCell", { rowPos, colPos });
    },
    notifyTie: function () {


        this._cellsHtml.forEach(cell => {
            cell.classList.add("animation-mark-pulse");
        });

        this.myPlay(this._audioTags.tie);

    },
    myPlay: function (objAudio) {

        if (objAudio.audio) {

            objAudio.volume = 0.1;
            objAudio.audio.play();
        } else {
            objAudio.audio = document.getElementById(objAudio.id);
            objAudio.volume = 0.1;
            objAudio.audio.play();
        }
    },
    getArrBoard: function () {
        return this.arrBoard;
    },
    checkPositionEmpty: function (row, col) {

        if (!this.arrBoard[row][col]) {
            return true;
        }

        return false;
    },
    _renderMark: function (turn, imgAlt, rowPos, colPos) {

        const cell = this._htmlBoard.querySelector("#r" + rowPos + "-c" + colPos);//r0-c0

        const newP = document.createElement("p");
        newP.setAttribute("style", "padding:0px,margin:0px;")
        newP.classList.add("animation-mark");
        newP.textContent = imgAlt;

        cell.appendChild(newP);

        if (turn === 1) {
            this.myPlay(this._audioTags.player1);
        } else this.myPlay(this._audioTags.player2);
    },
    placeMark: function (playerID, imgAlt, rowPos, colPos, turn) {

        this.arrBoard[rowPos][colPos] = _createObjMark(playerID, imgAlt, rowPos, colPos);
        this._renderMark(turn, imgAlt, rowPos, colPos);
    },
    pulseMarks: function (lastRowPos, lastColPos, direction) {

        let rIni, cIni, rMed, cMed, rFin, cFin;

        switch (direction) {
            case "vertical":
                rIni = 0;
                cIni = lastColPos;

                rFin = 2;
                cFin = lastColPos;

                break;
            case "horizontal":
                rIni = lastRowPos;
                cIni = 0;

                rFin = lastRowPos;
                cFin = 2;
                break;
            case "diag":
                rIni = 0;
                cIni = 0;

                rFin = 2;
                cFin = 2;
                break;
            case "rdiag":
                rIni = 0;
                cIni = 2;

                rFin = 2;
                cFin = 0;
                break;

            default:
                break;
        }

        rMed = (rIni + rFin) / 2;
        cMed = (cIni + cFin) / 2;

        const pIni = this._htmlBoard.querySelector("#r" + rIni + "-c" + cIni).firstElementChild;
        const pMed = this._htmlBoard.querySelector("#r" + rMed + "-c" + cMed).firstElementChild;
        const pFin = this._htmlBoard.querySelector("#r" + rFin + "-c" + cFin).firstElementChild;

        pIni.classList.add("animation-mark-pulse");
        pMed.classList.add("animation-mark-pulse");
        pFin.classList.add("animation-mark-pulse");


        setTimeout(() => this.myPlay(this._audioTags.match), 1000);
    },
    veridateThreeInLine: function (lastPlayerID, lastRowPos, lastColPos) {

        let vertical = 0;
        let horizontal = 0;
        let diag = 0;
        let rdiag = 0;
        let size = this.arrBoard.length;
        let result = null;

        for (let i = 0; i < size; i++) {

            if ((this.arrBoard[lastRowPos][i]) && (this.arrBoard[lastRowPos][i].playerID === lastPlayerID)) {
                horizontal++;
            }

            if ((this.arrBoard[i][lastColPos]) && (this.arrBoard[i][lastColPos].playerID === lastPlayerID)) {
                vertical++;
            }

            if ((((lastRowPos === 0 && lastColPos === 0) || (lastRowPos === 2 && lastColPos === 2) || (lastRowPos === 1 && lastColPos === 1)) && ((this.arrBoard[i][i]) && (this.arrBoard[i][i].playerID === lastPlayerID)))) {
                diag++;
            }

            if ((((lastRowPos === 2 && lastColPos === 0) || (lastRowPos === 0 && lastColPos === 2) || (lastRowPos === 1 && lastColPos === 1)) && ((this.arrBoard[i][size - i - 1]) && (this.arrBoard[i][size - i - 1].playerID === lastPlayerID)))) {
                rdiag++;
            }
        }

        switch (true) {
            case horizontal === size:

                result = "horizontal";
                break;
            case vertical === size:

                result = "vertical";
                break;
            case diag === size:

                result = "diag";
                break;
            case rdiag === size:

                result = "rdiag";
                break;
            case (!this.arrBoard.some(row => row.includes(null))):

                result = "full";
                break;
            default:
                break;
        }

        return result;
    },
    _createLine: function (start, end, direction) {

        let x1, y1, x2, y2;

        switch (direction) {
            case "vertical":

                x1 = start.left + start.width / 2;
                y1 = start.top;
                x2 = end.left + end.width / 2;
                y2 = end.top + end.height;


                break;
            case "horizontal":
                x1 = start.left;
                y1 = start.top + start.height / 2;
                x2 = end.left + end.width;
                y2 = end.top + end.height / 2;

                break;
            case "diag":

                x1 = start.left;
                y1 = start.top;
                x2 = end.left + end.width;
                y2 = end.top + end.height;
                break;
            case "rdiag":

                x1 = start.left + start.width;
                y1 = start.top;
                x2 = end.left;
                y2 = end.top + end.height;
                break;

            default:
                break;
        }

        const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        newLine.setAttribute('id', 'line1');
        newLine.setAttribute('x1', x1);
        newLine.setAttribute('y1', y1);
        newLine.setAttribute('x2', x2);
        newLine.setAttribute('y2', y2);
        newLine.setAttribute('style', 'stroke: red; stroke-width: 5; z-index: 50;');

        newLine.classList.add("animation-line");

        return newLine;
    },
    drawThreeLine: function (lastRowPos, lastColPos, direction) {

        let rIni, cIni, rFin, cFin;

        switch (direction) {
            case "vertical":
                rIni = 0;
                cIni = lastColPos;

                rFin = 2;
                cFin = lastColPos;
                break;
            case "horizontal":
                rIni = lastRowPos;
                cIni = 0;

                rFin = lastRowPos;
                cFin = 2;
                break;
            case "diag":
                rIni = 0;
                cIni = 0;

                rFin = 2;
                cFin = 2;
                break;
            case "rdiag":
                rIni = 0;
                cIni = 2;

                rFin = 2;
                cFin = 0;
                break;

            default:
                break;
        }

        const start = this._htmlBoard.querySelector("#r" + rIni + "-c" + cIni).getBoundingClientRect();
        const end = this._htmlBoard.querySelector("#r" + rFin + "-c" + cFin).getBoundingClientRect();

        const newLine = this._createLine(start, end, direction);

        // if (_svgLine.firstChild) {
        //     _svgLine.removeChild(_svgLine.firstChild);
        // }

        // _svgLine.append(newLine);
        // _svgLine.classList.remove("hidden");
        // _svgLine.classList.add("z-auto");
        //to animate de line: https://css-tricks.com/svg-line-animation-works/
    },
    restartBoard: function () {

        // this.arrBoard.forEach(row => {
        //     row = [null, null, null];
        //     //row.forEach(cell => cell = null);
        // });

        for (let index = 0; index < this.arrBoard.length; index++) {
            this.arrBoard[index] = [null, null, null];
        }

        this._cellsHtml.forEach(cell => {

            cell.textContent = "";
            cell.classList.remove("animation-mark-pulse");
        });

    },
};

export function createBoard() {

    const objBoard = Object.create(boardActions);

    objBoard.arrBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    objBoard._audioTags = {
        welcome: { id: "welcome-audio", audio: null },
        player1: { id: "player1-audio", audio: null },
        player2: { id: "player2-audio", audio: null },
        match: { id: "match-audio", audio: null },
        tie: { id: "tie-audio", audio: null },
    };

    objBoard._htmlBoard = document.getElementById("gameboard");
    //const _svgLine = document.getElementById("svg-line");
    //_svgLine.classList.add("hidden");
    objBoard._cellsHtml = objBoard._htmlBoard.querySelectorAll(".board-cell");

    objBoard._cellsHtml.forEach(cell => {

        cell.textContent = "";
        cell.classList.remove("animation-mark-pulse");
        // @ts-ignore
        cell.onclick = objBoard._clickOnCell.bind(cell);
    });

    return {
        checkPositionEmpty: objBoard.checkPositionEmpty.bind(objBoard),
        placeMark: objBoard.placeMark.bind(objBoard),
        veridateThreeInLine: objBoard.veridateThreeInLine.bind(objBoard),
        drawThreeLine: objBoard.drawThreeLine.bind(objBoard),
        pulseMarks: objBoard.pulseMarks.bind(objBoard),
        notifyTie: objBoard.notifyTie.bind(objBoard),
        getArrBoard: objBoard.getArrBoard.bind(objBoard),
        restartBoard: objBoard.restartBoard.bind(objBoard),
    };
};


function _createObjMark(playerID, imgAlt, rowPos, colPos) {

    return {
        playerID: playerID,
        playerMark: { imgAlt: imgAlt },
        pos: { row: rowPos, col: colPos },
    };
}


