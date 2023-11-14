const new_node_data = {
    new_node_name: "",
    relation: "",
    parent_id: "",
    type: "",
};

function addNodeBtn() {
    console.log(`the current node is ${current_node}`)
    contextMenu.style.display = 'none';
    // Set the position of the dialog and display it
    $("#add-node-dialog").toggle()
    const dialog = $("#add-node-dialog");
    dialog.css('position', 'absolute');
    dialog.css('top', current_mouse_network_pos.top);
    dialog.css('left', current_mouse_network_pos.left);
    // set the options of current nodes to the dialog drop down
    // const nodes_array = nodes.get();
    // const current_nodes = nodes_array.map(node => {
    //     return {
    //         value: node.id,
    //         text: node.label
    //     }
    // });
    // add_available_nodes_options(current_nodes, current_node);
    const current_options = mk_nodes_into_dropdown_options(nodes);
    console.log(current_options)
    add_available_nodes_to_selection_drop_down(available_nodes_drop_down, current_options, current_node)
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
            case 'available_nodes':
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
    } else {
        edges.add({
            from: new_node_data.parent_id,
            to: new_id,
            arrows: "to",
            color: {color: "blue"},
        });
    }
    // fix type if it changes
    refresh_nodes_types();
    // reset and close dialog
    addNewNode.reset();
    $("#add-node-dialog").toggle()
})


const available_nodes_drop_down = document.getElementById("available_nodes");
const available_nodes_options = [
    {value: '0', text: 'none'},
    {value: '1', text: 'none2'},
];

function add_available_nodes_options(options, defaultValue) {
    available_nodes_drop_down.length = 0;
    options.forEach(function (option) {
        let opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        available_nodes_drop_down.appendChild(opt);
    });
    available_nodes_drop_down.value = defaultValue;
}

// add_available_nodes_options(available_nodes_options, '0');
add_available_nodes_to_selection_drop_down(available_nodes_drop_down,
                                           available_nodes_options, '0')




$(function () {
    $("#add-node-dialog").draggable();
    $("#close-add-node-dialog").on("click", (e) => {
        $("#add-node-dialog").toggle();
    });
})