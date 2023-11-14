function removeNodeBnt() {
    console.log(`the current node is ${current_node}`)
    contextMenu.style.display = 'none';
    show_dialog_at("#remove-node-dialog",
                    current_mouse_network_pos.top,
                    current_mouse_network_pos.left)

}





$(function () {
    $("#remove-node-dialog").draggable();
    $("#close-remove-node-dialog").on("click", (e) => {
        $("#remove-node-dialog").toggle();
    });
})