$(document).on("deviceready", function() {
    main.appendNotifications();
    main.hideAllMessages();
    $("#mainCargo").off("click");
    $("#mainCargo").on("click", function() {
        main.showMessages("success");
    });
    $(".message").on("click", main.hideMessage);
});

var myMessages = ['info','warning','error','success'];


var main = {
    appendNotifications: function() {
        $("body").each(function() {
            $(this).append(
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
                    '<h3>Congrats, you penised it!</h3>' +
                    '<p>This is just a success notification message.</p>' +
                    '</div>');
        });
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

    showMessages: function(type)
    {
            main.hideAllMessages();
            var headerHight = $.mobile.activePage.find("div[data-role=header]").height();
            $('.'+type).animate({top:headerHight}, 300);
    },

    hideMessage: function() {
            $(this).animate({top: -$(this).outerHeight()}, 500);
    }
};