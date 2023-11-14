function removeNodeBnt() {
    console.log(`the current node is ${current_node}`)
    contextMenu.style.display = 'none';
    // Set the position of the dialog and display it
    $("#remove-node-dialog").toggle()
    const dialog = $("#remove-node-dialog");
    dialog.css('position', 'absolute');
    dialog.css('top', current_mouse_network_pos.top);
    dialog.css('left', current_mouse_network_pos.left);


}





$(function () {
    $("#remove-node-dialog").draggable();
    $("#close-remove-node-dialog").on("click", (e) => {
        $("#remove-node-dialog").toggle();
    });
})