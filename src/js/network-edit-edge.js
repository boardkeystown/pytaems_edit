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
    console.log("the edge type is set tooooO!")
    console.log(current_edge_type)
    console.log(edge_properties)
    $("#edit_edge_type").val('');
    $("#edit_edge_type").val(current_edge_type);

    build_edge_type_properties_dialog(
        "#edit-edge-type-properties",
        current_edge_type,
        edges.get(current_edge)
    )

}

function edge_type_label_rename(type,label) {
    let result;
    switch (type) {
        case 'Consumes':
            result = "(C) " + label;
            break;
        case 'Enables':
            result = "(E) " + label;
            break;
        case 'Disables':
            result = "(D) " + label;
            break;
        case 'Facilitates':
            result = "(F) " + label;
            break;
        case 'Hinders':
            result = "(H) " + label;
            break;
        case 'Limits':
            result = "(L) " + label;
            break;
        case 'Produces':
            result = "(P) " + label;
            break;
        default:
            result = label;
    }
    return result;
}


const editEdgeProperties = document.getElementById("edit-edge-dialog-input-form");
editEdgeProperties.addEventListener("submit",function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const edit_edge_properties_options = {
        id: current_edge,
        new_label: null,
        obj: {
            label: null,
        }
    };
    for (let pair of formData.entries()) {
        let key = pair[0];
        let value = pair[1];
        switch (key) {
            case 'id':
                edit_edge_properties_options.id = value;
                break;
            default:
                // console.log(`${key} , ${value}`);
                edit_edge_properties_options.obj[key] = value;
                break;
        }
    }
    let current_edge_object = edges.get(edit_edge_properties_options.id);
    // we have a label edit
    if (edit_edge_properties_options.obj.label) {
        current_edge_object.label = edge_type_label_rename(
            edit_edge_properties_options.obj.type,
            edit_edge_properties_options.obj.label
        );
        current_edge_object.obj = edit_edge_properties_options.obj;
    } else {
        current_edge_object.label = '';
        current_edge_object.obj = {}
    }
    edges.update(current_edge_object);
    $("#edit-edge-dialog").toggle();
});


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
            selectedType,
            edges.get(current_edge));
    });

});