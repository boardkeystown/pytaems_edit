function editNodeBtn() {
    console.log(`the current node is ${current_node}`)
    contextMenu.style.display = 'none';
    $("#edit-node-dialog").toggle()
    const dialog = $("#edit-node-dialog");
    dialog.css('position', 'absolute');
    dialog.css('top', current_mouse_network_pos.top);
    dialog.css('left', current_mouse_network_pos.left);

    const editNodeProperties_type = document.getElementById("edit_node_type");
    const current_node_properties = nodes.get(current_node);
    editNodeProperties_type.value = current_node_properties.type;

}

const editNodeProperties = document.getElementById("edit-node-dialog-input-form");
editNodeProperties.addEventListener('submit', function (e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    console.log(formData);
    let new_name = null;

    for (let pair of formData.entries()) {
        let key = pair[0];
        let value = pair[1];
        switch (key) {
            case 'edit_node_name':
                new_name = value;
            default:
                console.log(key + " , " + value);
        }
    }
    console.log(new_name);
    const current_node_properties = nodes.get(current_node);
    const new_node_properties = nodes.get(current_node);
    nodes.remove(current_node_properties);
    new_node_properties.id = new_name;
    new_node_properties.label = new_name;
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
    // editNodeProperties.reset();
});




$(function () {
    $("#edit-node-dialog").draggable();
    $("#close-edit-node-dialog").on("click", (e) => {
        $("#edit-node-dialog").toggle();
    });
})