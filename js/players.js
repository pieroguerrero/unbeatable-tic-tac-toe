
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

    notifyTurn: function notifyTurn() {
        this.notifyTurn();
    },
    setHtmlBoard: function (htmlBoard) {
        this.htmlBoard = htmlBoard;
    },

};

export function createPlayerRobot(name, imgAlt, htmlBoard) {

    const objParent = createPlayer(name, imgAlt);
    const obj = Object.create(playerRobotActions);

    obj.htmlBoard = htmlBoard;
    obj.notifyTurn = objParent.notifyTurn.bind(objParent);

    return {
        getID: objParent.getID,
        setPanel: objParent.setPanel,
        unNotifyTurn: objParent.unNotifyTurn,
        getWins: objParent.getWins,
        setWins: objParent.setWins,
        getImgAlt: objParent.getImgAlt,
        setName: objParent.setName,

        notifyTurn: obj.notifyTurn.bind(obj),
        setHtmlBoard: obj.setHtmlBoard.bind(obj),
    };
}