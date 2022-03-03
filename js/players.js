
const playerActions = {

    setPanel: function (panelClassID) {

        const panelHtml = document.querySelector("." + panelClassID);
        panelHtml.setAttribute("id", this.id);

        const profileImg = panelHtml.querySelector(".name-image img");
        profileImg.setAttribute("src", this.imgProfileSrc);
        profileImg.setAttribute("alt", this.imgProfileAlt);

        const playerName = panelHtml.querySelector(".name-image p");
        playerName.textContent = this.name;

        this.pWinsHtml = panelHtml.querySelector(".wins-value");
        this.pWinsHtml.textContent = this.nWins + "";

        this.pLossesHtml = panelHtml.querySelector(".losses-value");
        this.pLossesHtml.textContent = this.nLosses + "";
    },
    setLosses: function (newNlosses) {

        this.nLosses = newNlosses;
        this.pLossesHtmls.textContent = newNlosses + "";
    },
    setWins: function (newNwins) {

        this.nWins = newNwins;
        this.pWinsHtmls.textContent = newNwins + "";
    },
    notifyTurn: function () {

    },
    getWins: function () {
        return this.nWins;
    },
    getLosses: function () {
        return this.nLosses;
    },
    getID: function () {
        return this.id;
    },
    getProfileSrc: function () {
        return this.imgProfileSrc;
    },
    getProfileAlt: function () {
        return this.imgProfileAlt;
    },

    getImgSrc: function () {
        return this.imgScr;
    },

    getImgAlt: function () {
        return this.imgAlt;
    },

};

export function createPlayer(name, imgSrc, imgAlt, imgProfileSRC, imgProfileALT) {

    const player = Object.create(playerActions);
    player.id = Date.now() + ((Math.random() * 100000).toFixed()) + "";
    player.name = name;
    player.imgProfileSrc = imgProfileSRC;
    player.imgProfileAlt = imgProfileALT;
    player.imgScr = imgSrc;
    player.imgAlt = imgAlt;
    player.pWinsHtml = null;
    player.pLossesHtml = null;
    player.nWins = 0;
    player.nLosses = 0;

    return {
        getID: player.getID.bind(player),
        setPanel: player.setPanel.bind(player),
        notifyTurn: player.notifyTurn.bind(player),
        getWins: player.getWins.bind(player),
        getLosses: player.getLosses.bind(player),
        setWins: player.setWins.bind(player),
        setLosses: player.setLosses.bind(player),
        getProfileSrc: player.getProfileSrc.bind(player),
        getProfileAlt: player.getProfileAlt.bind(player),
        getImgSrc: player.getImgSrc.bind(player),
        getImgAlt: player.getImgAlt.bind(player),

    };

};