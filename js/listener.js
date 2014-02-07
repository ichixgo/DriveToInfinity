var listener = {
    initializeListeners : function () {

        $("#cargoB").on("click", function(event) {
            cargoScreen.start($(event.target).closest("div[data-role=content]"))
        });

        $("#keysB").on("click", function(event) {
            keyScreen.start($(event.target).closest("div[data-role=content]"))
        });

        $("#tourB").on("click",function (event) {
            tourScreen.start($(event.target).closest("div[data-role=content]"))
        });

        $("#mapB").on("click",function (event) {
            mapScreen.start($(event.target).closest("div[data-role=content]"))
        });

        $("#backMain").on("click", function() {
            core.backInHistory();
        });

        $(document).off("backbutton");
        $(document).on("backbutton", function() {
            core.backInHistory;
        });

        $("#cargoStatus").on("click", function() {
            cargoScreen.changeCargoStatus
        });

        $("#sortMeals").find("li").on("click",function(event) {
            tourDetail.startMealDetail($(event.target).closest("div[data-role=content]"))
        });

        $("#sortCustomers").find("li").on("click",function(event) {
            tourDetail.startCustomerDetail($(event.target).closest("div[data-role=content]"))
        });

        $("#keyList").find("li").on("click", function(event) {
            keyScreen.startKeyDetail($(event.target).closest("div[data-role=content]"))
        });

        $("#showOnMap").on("click", function(event) {
            mapScreen.start($(event.target).closest("div[data-role=content]"))
        });

        $("#takeNote").on("click", function(event) {
            noteScreen.start($(event.target).closest("div[data-role=content]"))
        });

        $("#clearN").on("click",noteScreen.cancel);

        $("#saveN").on("click",noteScreen.save);

        $("#clearData").on("click",function() {
            main.db.clear();
        });
        $("#customerList").on("click","a .note", function(event) {
            tourDetail.start(event.target.closest("li").data("id"),$(event.target).closest("div[data-role=content]"));
        });
        $("#mainCargo").on("click", function(event) {
            cargoScreen.start($(event.target).closest("div[data-role=content]"))
        });
        $("#mainKey").on("click", function(event) {
            keyScreen.start($(event.target).closest("div[data-role=content]"))
        });
        $("#mainTour").on("click", function(event){
            tourScreen.start($(event.target).closest("div[data-role=content]"))
        });
        $("#mainMap").on("click", function(event) {
            mapScreen.start($(event.target).closest("div[data-role=content]"))
        });
        $(".message").on("click", main.hideAllMessages);

        $(document).on("offline", out.queueAjax);

        $(document).on("online", out.executeAjaxQueue);
    }
}