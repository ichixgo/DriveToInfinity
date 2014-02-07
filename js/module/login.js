$(document).on("deviceready",function () {
    constants.updateConstants();
    constants.setHeadingsData();


    $("#loginB").on("click", function () {
        constants.retrieveLogin();
        loginScreen.clearLogin();
        loginScreen.retrieveTours();
    });

    $("#clearB").on("click", function () {
        $("#username").val("");
        $("#password").val("");
    });

    $("#testData").on("click", function() {
        $.ajax({
            type:"GET",
            dataType: "json",
            url: constants.baseUrl + 'tours.json?date=' + constants.date,
            username:btoa("admin"),
            password:btoa("admin"),
            beforeSend: function(xhr){
                xhr.setRequestHeader("Authorization",
                    "Basic " + btoa(constants.username + ":" + constants.password));
            },
            success: function(data) {
                alert('Success');
                alert(JSON.stringify(data));
                alert(constants.date);
            },
            error: function(data) {
                alert('Failed!');
                alert(JSON.stringify(data));
                alert(constants.date);
            }
        });
    });
});

var loginScreen = {
    start : function () {
        $.mobile.changePage("#login");
        $(document).off("backbutton");
        $(document).on("backbutton", function() {
            navigator.app.exitApp();
        });
    },
    retrieveTours: function() {
        $.ajax({
            type:"GET",
            dataType: "json",
            url: constants.baseUrl + 'tours.json?date=' + constants.date,
            beforeSend: function(xhr){
                xhr.setRequestHeader("Authorization",
                    "Basic " + btoa(constants.username + ":" + constants.password));
            },
            success: function(data) {
                $("#tours").empty();
                loginScreen.appendTours(data);
            },
            error: function(data) {
                alert('Failed!');
                alert(JSON.stringify(data));
            }
        }).done(tourSelectScreen.start());
    },

    appendTours: function(data) {
        for (var tour in data.tours) {
            if (data.tours[tour].driver == null) {
                $("#tours").append('<li><a href="#"><h2>'+ data.tours[tour].name + '</h2>' +
                        '<p>ID: '+ data.tours[tour].id +'</p>' +
                        '<p class="ui-li-aside"><strong>Test-Fahrer</strong></p>' +
                        '</a></li>').promise().done( function () {
                        $("#tours").children().last().data("id",data.tours[tour].id);
                        console.log("Append");
                    });
            } else {
                $("#tours").append('<li><a href="#"><h2>'+ data.tours[tour].name + '</h2>' +
                        '<p>ID: '+ data.tours[tour].id +'</p>' +
                        '<p class="ui-li-aside"><strong>'+ data.tours[tour].driver.name +'</strong></p>' +
                        '</a></li>').promise().done( function () {
                        $("#tours").children().last().data("id",data.tours[tour].id);
                        console.log("Append 2");
                    });
            }
        }
        $("#tours").listview("refresh");
    },

    clearLogin : function() {
        $("#username").val("");
        $("#password").val("");
    }
}



