
const playerActions = {

    setPanel: function (panelClassID) {

        const panelHtml = document.querySelector("." + panelClassID);
        panelHtml.setAttribute("id", this.id);

        this.profileImg = panelHtml.querySelector(".name-image img");
        this.profileImg.setAttribute("src", this.imgProfileSrc);
        this.profileImg.setAttribute("alt", this.imgProfileAlt);

        const playerName = panelHtml.querySelector(".name-image p");
        playerName.textContent = this.name;

        this.pWinsHtml = panelHtml.querySelector(".wins-value");
        this.pWinsHtml.textContent = this.nWins + "";

        this.pLossesHtml = panelHtml.querySelector(".losses-value");
        this.pLossesHtml.textContent = this.nLosses + "";
    },
    setLosses: function (newNlosses) {

        this.nLosses = newNlosses;
        this.pLossesHtml.textContent = newNlosses + "";
    },
    setWins: function (newNwins) {

        this.nWins = newNwins;
        this.pWinsHtml.textContent = newNwins + "";
    },
    notifyTurn: function () {

        if (this.profileImg.classList.contains("animation-notify")) {

            const newone = this.profileImg.cloneNode(true);
            this.profileImg.parentNode.replaceChild(newone, this.profileImg);
            this.profileImg = newone;
        } else this.profileImg.classList.add("animation-notify");

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
    // player.imgScr = imgSrc;
    player.imgAlt = imgAlt;
    player.pWinsHtml = null;
    player.pLossesHtml = null;
    player.nWins = 0;
    player.nLosses = 0;
    player.profileImg = null;

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
        // getImgSrc: player.getImgSrc.bind(player),
        getImgAlt: player.getImgAlt.bind(player),

    };

};