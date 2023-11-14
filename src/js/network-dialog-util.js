// constants

const default_available_nodes_dropdown_options = [
    {value: '0', text: 'none'},
    {value: '1', text: 'none2'},
];


/**
 * @param available_nodes vis.DataSet[{id: 'node-0', label: 'node-0'}]
 * @returns [{value: '0', text: 'none'}]
 */
function mk_nodes_into_dropdown_options(available_nodes) {
    const nodes_array = available_nodes.get();
    let options = nodes_array.map(node => {
        return {
            value: node.id,
            text: node.label
        }
    });
    return options;
}
/**
 * @param selection_drop_down  <select id="dropdown"> document element
 * @param options  [{value: '0', text: 'none'}]
 * @param default_selection value
 */
function add_available_nodes_to_selection_drop_down(
    selection_drop_down,
    options,
    default_selection
) {
    selection_drop_down.length = 0;
    options.forEach(function (option) {
        let opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        selection_drop_down.appendChild(opt);
    });
    selection_drop_down.value = default_selection;
    console.log(default_selection)
}

function mk_edges_into_dropdown_options(available_edge) {
    const edges_array = available_edge.get();
    let options = edges_array.map(edge => {
        return {
            value: edge.id,
            text: `from ${edge.from} to ${edge.to}`
        }
    });
    return options;
}



/**
 * @param dialog_id_name_str "#id-name"
 * @param top_px_str         "123px"
 * @param left_px_str        "123px"
 */
function show_dialog_at(dialog_id_name_str,top_px_str,left_px_str) {
    $(dialog_id_name_str).toggle()
    const dialog = $(dialog_id_name_str);
    dialog.css('position', 'absolute');
    dialog.css('top', top_px_str);
    dialog.css('left', left_px_str);
}
