var constants = {
    date:"",
    baseUrl:"",
    username:"",
    password:"",



    /*************
    *  Headings  *
    *************/
    overview: "Hauptmenü",
    cargo: "Verladeliste",
    mealDetail: "",
    keys : "Schlüsselliste",
    keyDetail : "Schlüssel",
    tour : "Tourliste",
    tourDetail : "Kunde",
    noteDetail : "Notiz",
    map : "Karte",
    /**Headings**/

    /***************
     *  Functions  *
     **************/
    updateConstants : function() {
        // update date
        if(config.requestDate == "current") {
            var currentDate = new Date();
            constants.date = currentDate.getFullYear() + "-" +( "0" + (1+currentDate.getMonth())).slice(-2) + "-" + ("0" + currentDate.getDate()).slice(-2);
        } else {
            constants.date = config.requestDate;
        }

        // update baseUrl
        constants.baseUrl = config.apiUrl + config.apiVersion +"/";

        // reset username and password
        constants.resetLoginConstants();
    },

    retrieveLogin : function() {
        constants.username = $("#username").val();
        constants.password = $("#password").val();
    },

    resetLoginConstants : function () {
        constants.username = "";
        constants.password = "";
    },

    setHeadingsData : function () {
        $("#overview").attr("data-name", core.overview);
        $("#cargo").attr("data-name", core.cargo);
        $("#mealDetail").attr("data-name", core.mealDetail);
        $("#keys").attr("data-name", core.keys);
        $("#keyDetail").attr("data-name", core.keyDetail);
        $("#tour").attr("data-name", core.tour);
        $("#tourDetail").attr("data-name", core.tourDetail);
        $("#noteDetail").attr("data-name", core.noteDetail);
        $("#map").attr("data-name", core.map);
    }
    /**Functions**/
}