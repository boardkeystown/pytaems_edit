
function addNodeBtn() {
    console.log(`the current node is ${current_node}`)
    nodeContextMenu.style.display = 'none';
    show_dialog_at("#add-node-dialog",
                    current_mouse_network_pos.top,
                    current_mouse_network_pos.left);

    const current_options = mk_nodes_into_dropdown_options(nodes);
    add_options_to_selection_drop_down(
        add_node_drop_down_options,
        current_options,
        current_node
    );
    const newNodeProperties_type = document.getElementById("new_node_type");
    // set up properties
    build_node_type_properties_dialog(
        "#add-node-type-properties",
        newNodeProperties_type.value,
        null,
        "edit_dialog"
    );

}

const addNewNode = document.getElementById("add-node-dialog-input-form");
addNewNode.addEventListener("submit", function (e) {
    e.preventDefault();
    const new_node_data = {
        new_node_name: "",
        relation: "",
        parent_id: "",
        obj: {
            type: "",
        }
    };
    let formData = new FormData(e.target);
    for (let pair of formData.entries()) {
        let key = pair[0]
        let value = pair[1]
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
            case 'outcomes':
                // we have outcomes to add to the new node
                new_node_data.obj.outcomes = new_node_outcome.obj.outcomes;
                break;
            default:
                new_node_data.obj[key]=value;
                break;
        }
    }
    const new_node_object ={
            id: new_node_data.new_node_name,
            label: new_node_data.new_node_name,
            obj: {
                ...new_node_data.obj,
                label: new_node_data.new_node_name,
            },
    };

    nodes.add(new_node_object);
    if (new_node_data.relation === 'to') {
        edges.add({
            from: new_node_data.new_node_name,
            to: new_node_data.parent_id,
            arrows: "to",
            color: {color: "blue"},
        });
    }
    if (new_node_data.relation === 'from') {
        edges.add({
            from: new_node_data.parent_id,
            to: new_node_data.new_node_name,
            arrows: "to",
            color: {color: "blue"},
        });
    }

    refresh_nodes_types();
    addNewNode.reset();
    $("#add-node-dialog").toggle()
    // nuke the temp outcomes when done
    new_node_outcome.obj.outcomes = {}
    console.log(new_node_data)
})


const add_node_drop_down_options = document.getElementById("new_node_available_nodes");
add_options_to_selection_drop_down(
    add_node_drop_down_options,
    default_available_nodes_dropdown_options,
    '0'
);

$(function () {
    $("#add-node-dialog").draggable();
    $("#close-add-node-dialog").on("click", (e) => {
        $("#add-node-dialog").toggle();
        // nuke the temp outcomes when done
        new_node_outcome.obj.outcomes = {}
    });
    $("#new_node_type").on('change',(e) => {
       let selectedType = $("#new_node_type option:selected").val();
       build_node_type_properties_dialog(
           "#add-node-type-properties",
           selectedType,
           null,
           "add_dialog"
       );
    });

})