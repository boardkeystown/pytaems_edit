function editEdgeBtn() {
    console.log("TODO!");
}

$(function () {
    $("#edit-edge-dialog").draggable();
    $("#close-edit-edge-dialog").on("click", (e) => {
        $("#edit-edge-dialog").toggle();
    });


});