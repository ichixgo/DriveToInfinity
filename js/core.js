var core = {
    backInHistory : function() {
        if (coreVar.history.length == 0) {
            tourSelectScreen.start();
        } else {
            var tmpBack = coreVar.history.pop();
            core.displayCurrent(tmpBack);
            core.changeHeading(tmpBack.attr("data-name"));
        }
    },

    addToHistory: function(screen) {
        coreVar.history.push(screen);
    },

    removeLastHistory : function () {
        coreVar.history.pop();
    },

    displayCurrent: function(current) {
        $("#main")
            .find("div[data-role='content']")
            .not(current)
            .hide(function () {
                current.show();
            });
    },

    changeHeading: function(text) {
        $("#main").find("h1").first().text(text);
    }
}

var coreVar = {
    history : []
}