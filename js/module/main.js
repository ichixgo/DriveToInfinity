$(document).on("deviceready",function () {
    main.appendNotifications();

    listener.initializeListeners();
});

var overviewScreen = {
    start: function() {
        core.displayCurrent($("#overview"));
        core.changeHeading(constants.overview);
        core.addToHistory($("#overview"));
    }
};

var myMessages = ['info','warning','error','success'];

var tourScreen = {
    start: function(from) {
        core.displayCurrent($("#tour"));
        core.changeHeading(constants.tour);
        core.addToHistory(from);
    }
};

var main = {

    appendNotifications: function() {
        $("body").append(
                '<div id="infoMessage" class="info message">' +
                    '<h3>FYI, something just happened!</h3>' +
                    '<p>This is just an info notification message.</p>' +
                    '</div>' +

                    '<div id="errorMessage" class="error message">' +
                    '<h3>Ups, an error ocurred</h3>' +
                    '<p>This is just an error notification message.</p>' +
                    '</div>' +

                    '<div id="warningMessage" class="warning message">' +
                    '<h3>Wait, I must warn you!</h3>' +
                    '<p>This is just a warning notification message.</p>' +
                    '</div>' +

                    '<div id="successMessage" class="success message">' +
                    '<h3>Congrats, you did it!</h3>' +
                    '<p>This is just a success notification message.</p>' +
                    '</div>');
        main.hideAllMessages();
    },

    getCargoStatus: function(id) {
        return main.db.getItem("cargo_"+id);
    },

    setCargoed: function(id) {
        main.db.setItem("cargo_"+id, true);
    },

    setUncargoed: function(id) {
        main.db.setItem("cargo_"+id, false);
    },

    setCurrentTour: function(id) {
        main.db.setItem("currentTour",id);
    },

    getCurrentTour: function() {
        return main.db.getItem("currentTour");
    },
    setNotification: function(type,heading,text) {
        $("#"+type+"Message").empty().append('<h3>' + heading + '</h3>' + '<p>' + text + '</p>');
    },

    setDelivered: function(id) {
        main.db.setItem("delivered_"+id, true);
    },

    setUndeliverd: function(id) {
        main.db.setItem("delivered_"+id, false);
    },

    getDeliveryState: function(id) {
      return main.db.getItem("delivered_"+id);
    },

    getCurrentCustomer: function() {
        return main.db.getItem("currentCustomer");
    },

    setCurrentCustomer: function(id) {
        main.db.setItem("currentCustomer", id);
    },

    getCustomer: function(id) {
        return main.db.getItem("customer_"+id);
    },

    getNote: function(id) {
        return main.db.getItem("note_"+id);
    },

    setNote: function(id, note) {
        main.db.setItem("note_"+id,note);
    },

    hideAllMessages: function() {
        var messagesHeights = new Array();

        for (var i=0; i<myMessages.length; i++)
        {
            var messages = $('.' + myMessages[i]);
            messagesHeights[i] = messages.outerHeight();
            messages.css('top', -messagesHeights[i]);
        }
    },

    showMessage: function(type)
    {
        var message = $('.'+type);
        var headerHeight = $.mobile.activePage.find("div[data-role=header]").height();
        message.animate({top:headerHeight}, 300).delay(700).queue(function(next, message) {
            main.hideMessage(message);
            next();
        });
    },

    hideMessage: function() {
        var messagesHeights = new Array();

        for (var i=0; i<myMessages.length; i++)
        {
            var messages = $('.' + myMessages[i]);
            messagesHeights[i] = messages.outerHeight();
            messages.animate({top: -messagesHeights[i]});
        }
    },

    db : window.localStorage,

    gMapsApiKey: "AIzaSyBgQVLUZAMgedTkTtQrHyPBHFouCwHu-SY",

    lastScreen: $("#cargo"),

    fitScreen: function(current) {
        var viewportHeight = $(window).innerHeight();
        var viewportWidth = $(window).innerWidth();
        var headerHeight = $(current).parents().filter("div[data-role='page']").find("div[data-role='header']").first().height();
        var footerHeight = $(current).parents().filter("div[data-role='page']").find("div[data-role='footer']").first().height();
        $(current).height(viewportHeight-headerHeight-footerHeight);
        $(current).width(viewportWidth);
    }/*,

    adjustBackButton: function() {

    }*/
};

var noteScreen = {

    start: function(from) {
        core.displayCurrent($("#noteDetail"));
        core.changeHeading(constants.noteDetail);
        core.addToHistory(from);

        var note = main.getNote(main.getCurrentCustomer());
        if (!(note == null)) {
            $("#note").val(note);
        } else {
            $("#note").val("");
        }
    },

    save: function() {
        main.setNote(main.getCurrentCustomer(),$("#note").val());
        main.setNotification("success","Notiz erfolgreich gespeichert.","Ihre Notiz wurde erfolgreich gespeichert.");
        main.showMessage("success");
        $("#customerList").find("li").filter(function() { return $(this).data("id") == main.getCurrentCustomer}).append('<a href="#" class=noteIcon></a>');
        $("#customerList").listview("refresh");
        tourDetail.start();
        core.removeLastHistory();
    },

    cancel: function() {
        $("#note").val("");
        tourDetail.start();
        core.removeActiveButtons();
    }
};

var cargoScreen = {
    start: function(from) {
        core.displayCurrent($("#cargo"));
        core.changeHeading(constants.cargo);
        core.addToHistory(from);
        var cargoStatus = $("#cargoStatus");
        if(main.getCargoStatus(main.getCurrentTour()) == "false") {
            cargoStatus.buttonMarkup({icon:"delete"});
            cargoStatus.attr("data-icon","delete");
        } else {
            cargoStatus.buttonMarkup({icon:"check"});
            cargoStatus.attr("data-icon","check");
        }
    },

    changeCargoStatus: function() {
        var cargoStatus = $("#cargoStatus");
        if(main.getCargoStatus(main.getCurrentTour()) == "false") {
            cargoStatus.buttonMarkup({icon:"check"});
            cargoStatus.attr("data-icon","check");
            main.setCargoed(main.getCurrentTour());
        } else {
            cargoStatus.buttonMarkup({icon:"delete"});
            cargoStatus.attr("data-icon","delete");
            main.setUncargoed(main.getCurrentTour());
        }

    }
};

var keyScreen = {
    start: function(from) {
        core.displayCurrent($("#keys"));
        core.changeHeading(constants.keys);
        core.addToHistory(from);
    },

    startKeyDetail: function(from) {
        core.displayCurrent($("#keyDetail"));
        core.changeHeading(constants.keyDetail);
        core.addToHistory(from);
    }
};

var mapScreen = {
    mapOptions: {},
    gMapsLoaded: false,
    map: {},
    marker: {},
    defaultPos: "Schönfeldstraße 8, Karlsruhe",
    defPosition: {},
    geocoder: {},
    marker: {},
    gMapsPos: {},
    start: function(from) {
        core.displayCurrent($("#map"));
        core.changeHeading(constants.map);
        core.addToHistory(from);
        if (!mapScreen.gMapsLoaded) {
            mapScreen.loadScript();
            mapScreen.gMapsLoaded = true;
        }
    },

    loadScript: function() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key='+ main.gMapsApiKey + '&sensor=true&' +
        'callback=mapScreen.mapInitialize';
    document.body.appendChild(script);
    },
    mapInitialize: function() {
        /*map.getGMapsPos();*/
        mapScreen.geocoder = new google.maps.Geocoder();
        var infowindow = new google.maps.InfoWindow();
        mapScreen.geocoder.geocode({'address': mapScreen.defaultPos}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                mapScreen.defPosition = results[0].geometry.location;
                mapScreen.mapOptions = {
                    center: mapScreen.defPosition,
                    zoom: 18,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                mapScreen.map = new google.maps.Map(document.getElementById("map"), mapScreen.mapOptions);
                mapScreen.marker = new google.maps.Marker({
                    position: mapScreen.defPosition,
                    map: mapScreen.map,
                    title:"Meine Position",
                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                });
                google.maps.event.addListener(mapScreen.marker, 'click', function() {
                    infowindow.setContent("Schönfeldstraße 8 <br /> Karlsruhe");
                    infowindow.open(mapScreen.map, mapScreen.marker);
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });


        /*map.createMarker("Meine Position");
        map.updateMarker(map.map);*/


        mapScreen.geocoder.geocode({'address': "Haid-und-Neu-Straße 10-14, Karlsruhe"}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var marker2 = new google.maps.Marker({
                    map: mapScreen.map,
                    position: results[0].geometry.location
                });
                google.maps.event.addListener(marker2, 'click', function() {
                    infowindow.setContent("Haid-und-Neu-Straße 10-14 <br /> Karlsruhe");
                    infowindow.open(mapScreen.map, marker2);
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
        mapScreen.geocoder.geocode({'address': "Haid-und-Neu-Straße 5A, Karlsruhe"}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var marker3 = new google.maps.Marker({
                    map: mapScreen.map,
                    position: results[0].geometry.location
                });
                google.maps.event.addListener(marker3, 'click', function() {
                    infowindow.setContent("Haid-und-Neu-Straße 5A <br /> Karlsruhe");
                    infowindow.open(mapScreen.map, marker3);
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    },

    getGMapsPos: function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            mapScreen.gMapsPos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        }, function(error) {
            alert("Code: " + error.code + "\nMessage: " + error.message);
            console.log("Code: " + error.code + "\nMessage: " + error.message);
        },{ maximumAge: 20000, timeout: 20000, enableHighAccuracy: false });
    },

    updateMarker:function(mapV) {
        mapScreen.marker.setMap(mapV);
    }
};