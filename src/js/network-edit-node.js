function editNodeBtn() {
    console.log(`the current node is ${current_node}`)
    nodeContextMenu.style.display = 'none';
    show_dialog_at("#edit-node-dialog",
                    current_mouse_network_pos.top,
                    current_mouse_network_pos.left)
    const editNodeProperties_name = document.getElementById("edit_node_name");
    const editNodeProperties_type = document.getElementById("edit_node_type");
    const current_node_properties = nodes.get(current_node);
    editNodeProperties_name.value = current_node_properties.id;
    editNodeProperties_type.value = current_node_properties.obj.type;

    //set up properties
    build_node_type_properties_dialog(
        "#edit-node-type-properties",
        editNodeProperties_type.value,
        nodes.get(current_node)
    );



}

const editNodeProperties = document.getElementById("edit-node-dialog-input-form");
editNodeProperties.addEventListener('submit', function (e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    console.log(formData);
    let new_node_properties_options = {
        new_name: null,
        obj : {

        },
    };

    for (let pair of formData.entries()) {
        let key = pair[0];
        let value = pair[1];
        switch (key) {
            case 'edit_node_name':
                new_node_properties_options.new_name = value;
                break;
            default:
                console.log(`${key}  - ${value} `)
                new_node_properties_options.obj[key] =
                    (value === '' || value === undefined  ) ?
                        null : value;
                break;
        }
    }

    const current_node_properties = nodes.get(current_node);
    const new_node_properties = nodes.get(current_node);
    nodes.remove(current_node_properties);
    new_node_properties.id = new_node_properties_options.new_name;
    new_node_properties.label = new_node_properties_options.new_name;
    new_node_properties.obj = new_node_properties_options.obj;
    new_node_properties.obj.label = new_node_properties_options.new_name;

    nodes.add(new_node_properties);

    edges.forEach(edge => {
        if (edge.from === current_node_properties.id) {
            edges.update({id: edge.id, from: new_node_properties.id});
        }
        if (edge.to === current_node_properties.id) {
            edges.update({id: edge.id, to: new_node_properties.id});
        }
    });

    refresh_nodes_types();
    editNodeProperties.reset();
    $("#edit-node-dialog").toggle()
});


$(function () {
    $("#edit-node-dialog").draggable();
    $("#close-edit-node-dialog").on("click", (e) => {
        $("#edit-node-dialog").toggle();
    });

    $("#edit_node_type").on('change',(e) => {
        let selectedType = $("#edit_node_type option:selected").val();
        build_node_type_properties_dialog(
            "#edit-node-type-properties",
            selectedType,
            nodes.get(current_node));
    });
})