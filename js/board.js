import { events } from "./pubsub.js";

export function createBoard() {

    const _arrBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    const _htmlBoard = document.getElementById("gameboard");
    const _cellsHtml = _htmlBoard.querySelectorAll(".board-cell");

    _cellsHtml.forEach(cell => {

        const newImg = document.createElement("img");
        let img = cell.querySelector("img");
        if (!img) {

            cell.appendChild(newImg);
        } else {

            img = newImg;
        }
    });

    function _clickOnCell() {

        const rowPos = Number(this.id.split("-")[0].substring(1));
        const colPos = Number(this.id.split("-")[1].substring(1));

        events.emit("clickOnCell", { rowPos, colPos });
    };

    _cellsHtml.forEach(cell => cell.addEventListener("click", _clickOnCell.bind(cell)));

    const _renderMark = (imgSrc, imgAlt, rowPos, colPos) => {

        const cell = _htmlBoard.querySelector("#r" + rowPos + "-c" + colPos);//r0-c0

        const img = cell.querySelector("img");
        img.setAttribute("src", imgSrc);
        img.setAttribute("alt", imgAlt);
    };

    const placeMark = (playerID, imgScr, imgAlt, rowPos, colPos) => {

        _arrBoard[rowPos][colPos] = _createObjMark(playerID, imgScr, imgAlt, rowPos, colPos);
        _renderMark(imgScr, imgAlt, rowPos, colPos);
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

            if ((((lastRowPos === 0 && lastColPos === 0) || (lastRowPos === 2 && lastColPos === 2)) && (_arrBoard[i][i].playerID === lastPlayerID))) {
                diag++;
            }

            if ((((lastRowPos === 2 && lastColPos === 0) || (lastRowPos === 0 && lastColPos === 2)) && (_arrBoard[i][size - i + 1].playerID === lastPlayerID))) {
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

    const getThreeInLine = (lastRowPos, lastColPos, direction) => {

    };

    return { checkPositionEmpty, placeMark, veridateThreeInLine };
};

function _createObjMark(playerID, imgSrc, imgAlt, rowPos, colPos) {

    return {
        playerID: playerID,
        playerMark: { imgSrc: imgSrc, imgAlt: imgAlt },
        pos: { row: rowPos, col: colPos },
    };
}