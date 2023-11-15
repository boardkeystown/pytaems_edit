function editEdgeBtn() {
    console.log(`the current edge is ${current_edge}`)
    edgeContextMenu.style.display = 'none';
    show_dialog_at("#edit-edge-dialog",
        current_mouse_network_pos.top,
        current_mouse_network_pos.left)
    const edge_options = mk_edges_into_dropdown_options(edges);
    add_options_to_selection_drop_down(
        edit_edge_available_drop_down,
        edge_options,
        current_edge
    );
    // check the edge type to populate the dialog
    const edge_properties = edges.get(current_edge);
    let current_edge_type = 'none';
    if (edge_properties.obj && edge_properties.obj.type) {
        current_edge_type = edge_properties.obj.type;
    }
    $("#edit_edge_type").value=current_edge_type;

    build_edge_type_properties_dialog(
        "#edit-edge-type-properties",
        current_edge_type
    )

}






const edit_edge_available_drop_down = document.getElementById("edit_edge_available");
add_options_to_selection_drop_down(
    edit_edge_available_drop_down,
    default_available_nodes_dropdown_options,
    '0'
);


$(function () {
    $("#edit-edge-dialog").draggable();
    $("#close-edit-edge-dialog").on("click", (e) => {
        $("#edit-edge-dialog").toggle();
    });

    $("#edit_edge_type").on('change',(e) => {
        let selectedType = $("#edit_edge_type option:selected").val();
        build_edge_type_properties_dialog(
            "#edit-edge-type-properties",
            selectedType);
    });

});