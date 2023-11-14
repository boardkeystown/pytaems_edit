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
    console.log("assssssssss")
    console.log(selection_drop_down)
    selection_drop_down.length=0;
    options.forEach(function (option) {
        let opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        selection_drop_down.appendChild(opt);
    });
    selection_drop_down.value=default_selection;
    console.log(default_selection)
}

