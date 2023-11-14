const new_node_data = {
    new_node_name: "",
    relation: "",
    parent_id: "",
    type: "",
};

function addNodeBtn() {
    console.log(`the current node is ${current_node}`)
    contextMenu.style.display = 'none';
    show_dialog_at("#add-node-dialog",
                    current_mouse_network_pos.top,
                    current_mouse_network_pos.left);
    const current_options = mk_nodes_into_dropdown_options(nodes);
    add_available_nodes_to_selection_drop_down(add_node_drop_down_options, current_options, current_node)
}

const addNewNode = document.getElementById("add-node-dialog-input-form");
addNewNode.addEventListener("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    console.log(formData);
    for (let pair of formData.entries()) {
        let key = pair[0]
        let value = pair[1]
        console.log(key + " , " + value);
        switch (key) {
            case 'new_node_name':
                new_node_data.new_node_name = value;
                break;
            case 'new_node_relation':
                new_node_data.relation = value;
                break;
            case 'new_node_available_nodes':
                new_node_data.parent_id = value;
                break;
            case 'new_node_type':
                new_node_data.type = value;
                break;
            default:
                console.log(key + " , " + value);
        }
    }
    let new_id = new_node_data.new_node_name;
    nodes.add({
        id: new_id,
        label: new_node_data.new_node_name,
        obj: {
            type: new_node_data.type,
        }
    });
    if (new_node_data.relation === 'to') {
        edges.add({
            from: new_id,
            to: new_node_data.parent_id,
            arrows: "to",
            color: {color: "blue"},
        });
    }
    if (new_node_data.relation === 'from') {
        edges.add({
            from: new_node_data.parent_id,
            to: new_id,
            arrows: "to",
            color: {color: "blue"},
        });
    }
    console.log(edges)
    // fix type if it changes
    refresh_nodes_types();
    // reset and close dialog
    addNewNode.reset();
    $("#add-node-dialog").toggle()
})


const add_node_drop_down_options = document.getElementById("new_node_available_nodes");
add_available_nodes_to_selection_drop_down(add_node_drop_down_options,
                                           default_available_nodes_dropdown_options,
                                                 '0')

$(function () {
    $("#add-node-dialog").draggable();
    $("#close-add-node-dialog").on("click", (e) => {
        $("#add-node-dialog").toggle();
    });
})