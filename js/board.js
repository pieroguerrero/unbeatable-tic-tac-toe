import { events } from "./pubsub.js";

export function createBoard() {

    const _arrBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    const _htmlBoard = document.getElementById("gameboard");
    const _svgLine = document.getElementById("svg-line");
    _svgLine.classList.add("hidden");
    const _cellsHtml = _htmlBoard.querySelectorAll(".board-cell");


    _cellsHtml.forEach(cell => {

        // const newImg = document.createElement("img");
        // let img = cell.querySelector("img");
        // if (!img) {

        //     cell.appendChild(newImg);
        // } else {

        //     img = newImg;
        // }

        cell.textContent = "";
    });

    function _clickOnCell() {

        const rowPos = Number(this.id.split("-")[0].substring(1));
        const colPos = Number(this.id.split("-")[1].substring(1));

        events.emit("clickOnCell", { rowPos, colPos });
    };

    //_cellsHtml.forEach(cell => cell.addEventListener("click", _clickOnCell.bind(cell)));
    _cellsHtml.forEach(cell => cell.onclick = _clickOnCell.bind(cell));

    const _renderMark = (imgAlt, rowPos, colPos) => {

        const cell = _htmlBoard.querySelector("#r" + rowPos + "-c" + colPos);//r0-c0
        cell.textContent = imgAlt;
        // const img = cell.querySelector("img");
        // img.setAttribute("src", imgSrc);
        // img.setAttribute("alt", imgAlt);
    };

    const placeMark = (playerID, imgAlt, rowPos, colPos) => {

        _arrBoard[rowPos][colPos] = _createObjMark(playerID, imgAlt, rowPos, colPos);
        _renderMark(imgAlt, rowPos, colPos);
    };

    const checkPositionEmpty = (row, col) => {

        if (!_arrBoard[row][col]) {
            return true;
        }

        return false;
    };



    //will check if, based on the last movement, there is a winner or not
    const veridateThreeInLine = (lastPlayerID, lastRowPos, lastColPos) => {

        let vertical = 0;
        let horizontal = 0;
        let diag = 0;
        let rdiag = 0;
        let size = _arrBoard.length;
        let result = null;

        for (let i = 0; i < size; i++) {

            if ((_arrBoard[lastRowPos][i]) && (_arrBoard[lastRowPos][i].playerID === lastPlayerID)) {
                horizontal++;
            }

            if ((_arrBoard[i][lastColPos]) && (_arrBoard[i][lastColPos].playerID === lastPlayerID)) {
                vertical++;
            }

            if ((((lastRowPos === 0 && lastColPos === 0) || (lastRowPos === 2 && lastColPos === 2) || (lastRowPos === 1 && lastColPos === 1)) && ((_arrBoard[i][i]) && (_arrBoard[i][i].playerID === lastPlayerID)))) {
                diag++;
            }

            if ((((lastRowPos === 2 && lastColPos === 0) || (lastRowPos === 0 && lastColPos === 2) || (lastRowPos === 1 && lastColPos === 1)) && ((_arrBoard[i][size - i - 1]) && (_arrBoard[i][size - i - 1].playerID === lastPlayerID)))) {
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
            default:
                break;
        }

        return result;
    };

    const _createLine = (start, end, direction) => {

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

        return newLine;
    };

    const drawThreeLine = (lastRowPos, lastColPos, direction) => {

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

        const start = _htmlBoard.querySelector("#r" + rIni + "-c" + cIni).getBoundingClientRect();
        const end = _htmlBoard.querySelector("#r" + rFin + "-c" + cFin).getBoundingClientRect();

        const newLine = _createLine(start, end, direction);

        if (_svgLine.firstChild) {
            _svgLine.removeChild(_svgLine.firstChild);
        }

        _svgLine.append(newLine);
        _svgLine.classList.remove("hidden");
        _svgLine.classList.add("z-auto");
    };

    return { checkPositionEmpty, placeMark, veridateThreeInLine, drawThreeLine };
};

function _createObjMark(playerID, imgAlt, rowPos, colPos) {

    return {
        playerID: playerID,
        playerMark: { imgAlt: imgAlt },
        pos: { row: rowPos, col: colPos },
    };
}

