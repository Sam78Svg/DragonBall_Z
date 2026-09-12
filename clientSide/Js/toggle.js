$(document).ready(function () {
    // Fetch episodes and toggle the container when the button is clicked
    $("#season1Btn").click(() => {
        // Only fetch if the area is empty
        if ($("#episodeListingArea").is(":empty")) {
            fetchEp();
        }
        $("#episodeListingArea").slideToggle(500);
    });

    $("#season2Btn").click(() => {
        // Only fetch if the area is empty
        if ($("#episodeListingArea2").is(":empty")) {
            fetchEp2();
        }
        $("#episodeListingArea2").slideToggle(500);
    });

    $("#season3Btn").click(() => {
        // Only fetch if the area is empty
        if ($("#episodeListingArea3").is(":empty")) {
            fetchEp3();
        }
        $("#episodeListingArea3").slideToggle(500);
    });
});