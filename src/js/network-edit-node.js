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
    switch (editNodeProperties_type.value) {
        case node_types.task_group:
            const propertiesDiv = $("#edit-node-type-properties");
            propertiesDiv.empty();
            propertiesDiv.append(mk_agent_dialog_properties());
        default:
            break;
    }

}

const editNodeProperties = document.getElementById("edit-node-dialog-input-form");
editNodeProperties.addEventListener('submit', function (e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    console.log(formData);
    let new_node_properties_options = {
        new_name: null,
        type: null,
    };
    for (let pair of formData.entries()) {
        let key = pair[0];
        let value = pair[1];
        switch (key) {
            case 'edit_node_name':
                new_node_properties_options.new_name = value;
                break;
            case 'edit_node_type':
                new_node_properties_options.type = value;
            default:
                console.log(key + " , " + value);
                break;
        }
    }
    const current_node_properties = nodes.get(current_node);
    const new_node_properties = nodes.get(current_node);
    nodes.remove(current_node_properties);
    new_node_properties.id = new_node_properties_options.new_name;
    new_node_properties.label = new_node_properties_options.new_name;
    new_node_properties.obj.type = new_node_properties_options.type;

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
        const propertiesDiv = $("#edit-node-type-properties");
        propertiesDiv.empty();
        let selectedType = $("#edit_node_type option:selected").val();
        // console.log("Selected type:", selectedType);
        if (selectedType === node_types.task_group) {
            propertiesDiv.append(mk_agent_dialog_properties());
        }
    });


})