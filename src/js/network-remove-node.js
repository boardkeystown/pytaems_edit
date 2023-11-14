function removeNodeBnt() {
    console.log(`the current node is ${current_node}`)
    nodeContextMenu.style.display = 'none';
    show_dialog_at("#remove-node-dialog",
                    current_mouse_network_pos.top,
                    current_mouse_network_pos.left)
    const current_options = mk_nodes_into_dropdown_options(nodes);
    add_available_nodes_to_selection_drop_down(remove_node_drop_down_options, current_options, current_node)
}

const removeNode = document.getElementById('remove-node-dialog-input-form');
removeNode.addEventListener("submit",function (e) {
    e.preventDefault();
    const remove_node_options = {
        name: null,
    }
    let formData = new FormData(e.target);
    for (let pair of formData.entries()) {
        let key = pair[0]
        let value = pair[1]
        switch (key) {
            case 'remove_node_available_nodes':
                remove_node_options.name = value;
                break
            default:
                console.log(key + ' , ' + value);
        }
    }
    let node_to_remove = nodes.get(remove_node_options.name);
    if (node_to_remove) {
        // can't remove last node!
        if (nodes.length>1) {
            nodes.remove(node_to_remove);
            edges.forEach(edge => {
                if (edge.from === remove_node_options.name || edge.to === remove_node_options.name) {
                    edges.remove(edge);
                }
            })
        }
    }
    removeNode.reset();
    $("#remove-node-dialog").toggle();
});


const remove_node_drop_down_options = document.getElementById("remove_node_available_nodes");
add_available_nodes_to_selection_drop_down(remove_node_drop_down_options,
                                           default_available_nodes_dropdown_options,
                                                        '0')


$(function () {
    $("#remove-node-dialog").draggable();
    $("#close-remove-node-dialog").on("click", (e) => {
        $("#remove-node-dialog").toggle();
    });
})