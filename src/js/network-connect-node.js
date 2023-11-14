function connectNodeBtn() {
    contextMenu.style.display = 'none';
    show_dialog_at("#connect-node-dialog",
                    current_mouse_network_pos.top,
                    current_mouse_network_pos.left);
    const current_options = mk_nodes_into_dropdown_options(nodes);

    add_available_nodes_to_selection_drop_down(
        connect_available_nodes_left_drop_down,
        current_options,
        current_node)
    current_options.unshift({value: 'none', text: 'none'});
    add_available_nodes_to_selection_drop_down(
        connect_available_nodes_right_drop_down,
        current_options,
        'none')
}


const connect_available_nodes_left_drop_down = document.getElementById("connect_available_nodes_left");
const connect_available_nodes_right_drop_down = document.getElementById("connect_available_nodes_right");

add_available_nodes_to_selection_drop_down(
    connect_available_nodes_left_drop_down,
    default_available_nodes_dropdown_options,
    '0')
add_available_nodes_to_selection_drop_down(
    connect_available_nodes_right_drop_down,
    default_available_nodes_dropdown_options,
    '0')


const connect_node_dialog_input_form = document.getElementById("connect-node-dialog-input-form");
connect_node_dialog_input_form.addEventListener('submit', function (e) {
   e.preventDefault();
   const connect_options = {
       left_node_name: null,
       relation: null,
       right_node_name: null,
   };
    let formData = new FormData(e.target);
    for (let pair of formData.entries()) {
        let key = pair[0]
        let value = pair[1]
        switch (key) {
            case 'connect_available_nodes_left':
                connect_options.left_node_name = value;
                break;
            case 'connect_node_relation':
                connect_options.relation = value;
            case 'connect_available_nodes_right':
                connect_options.right_node_name = value;
            default:
                console.log(key + " , " + value);
        }
    }
    // if right node name != none
    if (nodes.get(connect_options.right_node_name)) {
        if (connect_options.relation === 'to') {
            edges.add({
                from: connect_options.left_node_name,
                to: connect_options.right_node_name,
                arrows: "to",
                color: {color: "blue"},
            });
        }
        if (connect_options.relation === 'from') {
            edges.add({
                from: connect_options.right_node_name,
                to: connect_options.left_node_name,
                arrows: "to",
                color: {color: "blue"},
            });
        }
    }
    refresh_nodes_types();
    connect_node_dialog_input_form.reset();
    $("#connect-node-dialog").toggle();
});

$(function () {
    $("#connect-node-dialog").draggable();
    $("#close-connect-node-dialog").on("click", (e) => {
        $("#connect-node-dialog").toggle();
    });
});