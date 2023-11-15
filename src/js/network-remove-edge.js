function removeEdgeBtn() {
    console.log(`the current edge is ${current_edge}`)
    edgeContextMenu.style.display = 'none';
    show_dialog_at(
        "#remove-edge-dialog",
        current_mouse_network_pos.top,
        current_mouse_network_pos.left
    );
    const options = mk_edges_into_dropdown_options(edges)
    add_options_to_selection_drop_down(
        remove_edge_available_drop_down,
        options,
        current_edge
    );
}

const remove_edge_dialog_input_form = document.getElementById("remove-edge-dialog-input-form");
remove_edge_dialog_input_form.addEventListener('submit',function (e) {
    e.preventDefault();
    const options = {
        remove_id: null,
    }
    let formData = new FormData(e.target);
    for (let pair of formData.entries()) {
        let key = pair[0];
        let value = pair[1];
        switch (key) {
            case 'remove_edge_available':
                options.remove_id = value;
                break;
            default:
                console.log(key + " , " + value);
                break;
        }
    }
    //
    const remove_edge = edges.get(options.remove_id);
    if (remove_edge) {
        edges.remove(remove_edge);
    }
    remove_edge_dialog_input_form.reset();
    $("#remove-edge-dialog").toggle();

});

const remove_edge_available_drop_down = document.getElementById("remove_edge_available");
add_options_to_selection_drop_down(
    remove_edge_available_drop_down,
    default_available_nodes_dropdown_options,
    '0'
    );


$(function () {
    $("#remove-edge-dialog").draggable();
    $("#close-remove-edge-dialog").on("click", (e) => {
        $("#remove-edge-dialog").toggle();
    });
})