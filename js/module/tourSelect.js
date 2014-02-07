$(document).on("deviceready",function () {
    $("#tours").on("click","li", function () {
        tourSelectScreen.loadTour($(event.target).closest("li").data("id"));
    });
    $("#logout").on("click", function() {
        loginScreen.start();
    })
    $("#refreshTours").on("click", loginScreen.retrieveTours);
});

var tourSelectScreen = {
    start : function() {
        $.mobile.changePage("#tourSelect");
        $(document).off("backbutton");
        $(document).on("backbutton", function() {
            loginScreen.start();
        });
    },
    loadTour: function(id) {
        tourSelectScreen.loadKeys(id);
        tourSelectScreen.loadCustomers(id);
        $.mobile.changePage("#main");
        overviewScreen.start();
    },

    loadKeys :function(id) {
        $.ajax({
            type:"GET",
            dataType: "json",
            url: constants.baseUrl + 'tours/'+id+'/keys.json?date=' + constants.date,
            beforeSend: function(xhr){
                xhr.setRequestHeader("Authorization",
                    "Basic " + btoa(constants.username + ":" + constants.password));
            },
            success: function(data) {
                $("#keyList").empty();
                for (var key in data.keys) {
                    $("#keyList").append('<li><a href="#">'+data.keys[key].name+'</li>');
                    $("#keyList").children().last().data("id",data.keys[key].id);
                };
                $("#keyList").listview("refresh");
            },
            error: function(data) {
                alert('Failed!');
                alert(JSON.stringify(data));
            }
        });
    },

    loadCustomers: function(id) {
        $.ajax({
            type:"GET",
            dataType: "json",
            url: constants.baseUrl + 'tours/'+id+'.json?date=' + constants.date,
            beforeSend: function(xhr){
                xhr.setRequestHeader("Authorization",
                    "Basic " + btoa(constants.username + ":" + constants.password));
            },
            success: function(data) {
                $("#customerList").empty();
                $("#sortedCustomers").empty();
                for (var station in data.tour.stations) {
                    $("#customerList").append('<li data-theme="b" id="customer_' + data.tour.stations[station].customer.id + '"><a href="#"><h2>'+ data.tour.stations[station].customer.forename
                        + " " + data.tour.stations[station].customer.surname + '</h2>'
                        + '<p>' + "Musterstraße" + " "
                        + "123" + ", "
                        + data.tour.stations[station].customer.address.postal_code + " "
                        + data.tour.stations[station].customer.address.town + '</p>'
                        + '<p class="ui-li-aside"><strong>Gericht 1</strong></p>'
                        + '</a></li>');
                    $("#sortedCustomers").append('<li id="sortCustomer_' + data.tour.stations[station].customer.id + '"><a href="#"><h2>'+ data.tour.stations[station].customer.forename
                        + " " + data.tour.stations[station].customer.surname + '</h2>'
                        + '<p>' + "Musterstraße" + " "
                        + "123" + ", "
                        + data.tour.stations[station].customer.address.postal_code + " "
                        + data.tour.stations[station].customer.address.town + '</p>'
                        + '<p class="ui-li-aside"><strong>Gericht 1</strong></p>'
                        + '</a></li>');
                    var cData = {
                        "name":data.tour.stations[station].customer.forename +
                            " " + data.tour.stations[station].customer.surname,
                        "address":"Musterstraße" + " " + "123",
                        "pc_city":data.tour.stations[station].customer.address.postal_code + " " +
                            data.tour.stations[station].customer.address.town
                    };
                    var oData = {
                        "id":data.tour.stations[station].order.id,
                        "delivered":data.tour.stations[station].order.delivered,
                        "loaded":data.tour.stations[station].order.loaded,
                        "offering":data.tour.stations[station].order.offering
                    };

                    main.db.setItem("customer_"+data.tour.stations[station].customer.id, JSON.stringify(cData));
                    $("#customerList").children().last().data("id",data.tour.stations[station].customer.id);
                    main.db.setItem("order_"+data.tour.stations[station].customer.id, JSON.stringify(oData));
                    /*main.db.setItem("delivered_"+data.tour.stations[station].customer.id, data.tour.stations[station].delivered);*/
                    /*speicherung im DOM $("#customerList").children().last().data("name", data.tour.stations[station].customer.forename
                        + " " + data.tour.stations[station].customer.surname);
                    $("#customerList").children().last().data("address", "Musterstraße" + " "
                        + "123");
                    $("#customerList").children().last().data("pc_city",data.tour.stations[station].customer.address.postal_code + " "
                        + data.tour.stations[station].customer.address.town);*/

                    /* ************** vollständige Daten nötig!
                    $("#customerList").append('<li><a href="#"><h2>'+ data.tour.stations[station].customer.forename
                     + " " + data.tour.stations[station].customer.surname + '</h2>'
                     + '<p>' + data.tour.stations[station].customer.address.street_name + " "
                     + data.tour.stations[station].customer.address.street_number + ", "
                     + data.tour.stations[station].customer.address.postal_code + " "
                     + data.tour.stations[station].customer.address.town + '</p>'
                     + '<p class="ui-li-aside"><strong>Gericht 1</strong></p>'
                     + '</a></li>');
                    $("#customerList").children().last().data("address", data.tour.stations[station].customer.address.street_name + " "
                     + data.tour.stations[station].customer.address.street_number);
                    var jData2 = {"name":data.tour.stations[station].customer.forename + " " + data.tour.stations[station].customer.surname,
                     "address":data.tour.stations[station].customer.address.street_name + " " + data.tour.stations[station].customer.address.street_number,
                     "pc_city":data.tour.stations[station].customer.address.postal_code + " " + data.tour.stations[station].customer.address.town};
                    main.db.setItem("customer_"+data.tour.stations[station].customer.id, JSON.stringify(jData2));*/

                };
                $("#customerList").listview("refresh");
                $("#sortedCustomers").listview("refresh");
                main.setUncargoed(id);
                main.setCurrentTour(id);
            },
            error: function(data) {
                alert('Failed!');
                alert(JSON.stringify(data));
            }
        });

    }
}