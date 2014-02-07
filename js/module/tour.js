$(document).on("deviceready",function () {
    $("#markDelivered").on("click", tourDetail.changeDeliveryStatus);
    $("#customerList").on("click","li", function() {
        main.setCurrentCustomer($(event.target).closest("li").data("id"));
        tourDetail.start($(event.target).closest("div[data-role=content]"));
    });
    $("#call").on("click", tourDetail.callCustomer);
});


var tourDetail = {
    start: function(from) {
        $("#customerData").empty();
        var data = JSON.parse(main.getCustomer(main.getCurrentCustomer()));
        tourDetail.setDeliveryStatus();
        core.displayCurrent($("#tourDetail"));
        core.changeHeading(constants.tourDetail);
        $("#customerData").append('<li>Herr</li>'
            +'<li>' + data.name + '</li>'
            +'<li>' + data.address + '</li>'
            +'<li>' + data.pc_city + '</li>');
        core.addToHistory(from);
        $("#customerData").listview("refresh");
    },

    setDeliveryStatus:function() {
        var deliveryStatus = $("#markDelivered");
        if(main.getDeliveryState(main.getCurrentCustomer()) == "false") {
            deliveryStatus.buttonMarkup({icon:"delete"});
            deliveryStatus.attr("data-icon","delete");
        } else {
            deliveryStatus.buttonMarkup({icon:"check"});
            deliveryStatus.attr("data-icon","check");
        }
    },

    changeDeliveryStatus: function() {
        var deliveryStatus = $("#markDelivered");
        var listEntry = $("#customer_"+main.getCurrentCustomer());
        if(main.getDeliveryState(main.getCurrentCustomer()) == "false") {
            deliveryStatus.buttonMarkup({icon:"check"});
            deliveryStatus.attr("data-icon","check");
            main.setDelivered(main.getCurrentCustomer());
            listEntry.attr("data-theme","c")
            listEntry.children("a").removeClass("ui-btn-b").addClass("ui-btn-c");
        } else {
            deliveryStatus.buttonMarkup({icon:"delete"});
            deliveryStatus.attr("data-icon","delete");
            //alert("else "+main.getDeliveryState(main.getCurrentCustomer()));
            main.setUndeliverd(main.getCurrentCustomer());
            listEntry.attr("data-theme","b");
            listEntry.children("a").removeClass("ui-btn-c").addClass("ui-btn-b");
        }



    },

    startMealDetail: function(from) {
        core.displayCurrent($("#mealDetail"));
        core.changeHeading(constants.mealDetail);
        core.addToHistory(from);
    },

    startCustomerDetail: function(from) {
        core.displayCurrent($("#tourDetail"));
        core.changeHeading(constants.tourDetail);
        core.addToHistory(from);
    },

    callCustomer: function() {
        document.location.href= "tel:+4972112345678";
    }
};

