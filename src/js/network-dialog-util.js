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
 * @param available_edge vis.DataSet[{id: 'node-0', label: 'node-0'}]
 * @returns [{value: '0', text: 'none'}]
 */
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
 * @param selection_drop_down  <select id="dropdown"> document element
 * @param options  [{value: '0', text: 'none'}]
 * @param default_selection value
 */
function add_options_to_selection_drop_down(
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


/*  edge type dialog properties  */


function mk_consume_properties() {
    return `
    <label> Name: </label>
    <input type="text" name="label">
    <br>
    <label> Agent: </label>
    <input type="text" name="agent">
    <br>
    <label> From Outcomes: </label>
    <input type="text" name="from_outcome">
    <br>
    <label> Model: </label>
    <input type="text" name="model">
    <br>
    <label> Produces: </label>
    <input type="text" name="produces">
    `;
}

function mk_enables_properties() {
    return `
    <label> Name: </label>
    <input type="text" name="label">
    <br>
    <label> Agent: </label>
    <input type="text" name="agent">
    <br>
    <label> From Outcomes: </label>
    <input type="text" name="from_outcome">
    <br>
    <label> Delay: </label>
    <input type="text" name="delay">
    `;
}

function mk_disables_properties() {
    return `
    <label> Name: </label>
    <input type="text" name="label">
    <br>
    <label> Agent: </label>
    <input type="text" name="agent">
    <br>
    <label> From Outcomes: </label>
    <input type="text" name="from_outcome">
    <br>
    <label> Delay: </label>
    <input type="text" name="delay">
    `;
}


function mk_facilitates_properties() {
    return `
    <label> Name: </label>
    <input type="text" name="label">
    <br>
    <label> Agent: </label>
    <input type="text" name="agent">
    <br>
    <label> From Outcomes: </label>
    <input type="text" name="from_outcome">
    <br>
    <label> Quality Power: </label>
    <input type="text" name="quality_power">
    <br>
    <label> Duration Power: </label>
    <input type="text" name="duration_power">
    <br>
    <label> Cost Power: </label>
    <input type="text" name="cost_power">
    <br>
    <label> Delay: </label>
    <input type="text" name="delay">
    `;
}


function mk_hinders_properties() {
    return `
    <label> Name: </label>
    <input type="text" name="label">
    <br>
    <label> Agent: </label>
    <input type="text" name="agent">
    <br>
    <label> From Outcomes: </label>
    <input type="text" name="from_outcome">
    <br>
    <label> Quality Power: </label>
    <input type="text" name="quality_power">
    <br>
    <label> Duration Power: </label>
    <input type="text" name="duration_power">
    <br>
    <label> Cost Power: </label>
    <input type="text" name="cost_power">
    <br>
    <label> Delay: </label>
    <input type="text" name="delay">
    `;
}



function mk_limits_properties() {
    return `
    <label> Name: </label>
    <input type="text" name="label">
    <br>
    <label> Agent: </label>
    <input type="text" name="agent">
    <br>
    <label> From Outcomes: </label>
    <input type="text" name="from_outcome">
    <br>
    <label> Quality Power: </label>
    <input type="text" name="quality_power">
    <br>
    <label> Duration Power: </label>
    <input type="text" name="duration_power">
    <br>
    <label> Cost Power: </label>
    <input type="text" name="cost_power">
    <br>
    <label> Delay: </label>
    <input type="text" name="delay">
    `;
}


function mk_produces_properties() {
    return `
    <label> Name: </label>
    <input type="text" name="label">
    <br>
    <label> Agent: </label>
    <input type="text" name="agent">
    <label> From Outcomes: </label>
    <br>
    <input type="text" name="from_outcome">
    <br>
    <label> Model: </label>
    <input type="text" name="model">
    <br>
    <label> Produces: </label>
    <input type="text" name="produces">
    `;
}

/**
 *
 * @param from_dialog_id_str "#id-name"
 * @param selected_type_str   a edge_type str
 */
function build_edge_type_properties_dialog(
    from_dialog_id_str,
    selected_type_str,
) {
    // get and empty out the properties dialog
    const propertiesDiv = $(from_dialog_id_str);
    propertiesDiv.empty();
    switch (selected_type_str) {
        case edge_types.consumes:
            propertiesDiv.append(mk_consume_properties());
            break;
        case edge_types.enables:
            propertiesDiv.append(mk_enables_properties());
            break;
        case edge_types.disables:
            propertiesDiv.append(mk_disables_properties());
            break;
        case edge_types.facilitates:
            propertiesDiv.append(mk_facilitates_properties());
            break;
        case edge_types.hinders:
            propertiesDiv.append(mk_hinders_properties());
            break;
        case edge_types.limits:
            propertiesDiv.append(mk_limits_properties());
            break;
        case edge_types.produces:
            propertiesDiv.append(mk_produces_properties());
            break;
        case 'none':
            break;
        default:
            console.log(`${selected_type_str} is not a know node_type!`);
            break;
    }


}



/*  node type dialog properties  */

function mk_qaf_drop_down_options() {
    return `
    <label> qaf: </label>
    <select id="qaf_selection" name="qaf_type">
        <option value="q_max" > q_max </option>
        <option value="q_min" > q_min </option>
        <option value="q_sum" > q_sum </option>
        <option value="q_sum_all" > q_sum_all </option>
        <option value="seq_min" > seq_min </option>
        <option value="seq_max" > seq_max </option>
        <option value="seq_sum" > seq_sum </option>
        <option value="seq_last" > seq_last </option>
        <option value="q_exactly_one" > q_exactly_one </option>
        <option value="q_last" > q_last </option>
        <option value="q_sigmoid" > q_sigmoid </option>
    </select>
    `;
}

function mk_task_group_dialog_properties() {
    return `
            <label> Agent: </label>
            <input type="text" name="agent">
            <br>
           ` + mk_qaf_drop_down_options() + `
            <br>
            <label> Arrival Time: </label>
            <input type="number">
            <br>
            <label> Earliset Start Time: </label>
            <input type="number">
            <br>
            <label> Deadline: </label>
            <input type="number">
            `;
}


function mk_task_dialog_properties() {
    return `
            <label> Agent: </label>
            <input type="text">
            <br>
           ` + mk_qaf_drop_down_options() + `
            <br>
            <label> Arrival Time: </label>
            <input type="number">
            <br>
            <label> Earliset Start Time: </label>
            <input type="number">
            <br>
            <label> Deadline: </label>
            <input type="number">
            `;
}

function mk_method_dialog_properties() {
    return `
            <label> Agent: </label>
            <input type="text">
            <br>
           ` + mk_qaf_drop_down_options() + `
            <br>
            <label> Arrival Time: </label>
            <input type="number">
            <br>
            <label> Earliset Start Time: </label>
            <input type="number">
            <br>
            <label> Deadline: </label>
            <input type="number">
            <br>
            <label> Start Time: </label>
            <input type="number">
            <br>
            <label> Finish Time: </label>
            <input type="number">
            <br>
            <label> Accrued Time: </label>
            <input type="number">
            <br>
            <label> Nonlocal Flag: </label>
            <input type="number">
            `;
}
function mk_consumable_resource_dialog_properties() {
    return `
            <label> Agent: </label>
            <input type="text">
            <br>
           ` + mk_qaf_drop_down_options() + `
            <br>
            <label> Arrival Time: </label>
            <input type="number">
            <br>
            <label> State: </label>
            <input type="number">
            <br>
            <label> Depleted At: </label>
            <input type="number">
            <br>
            <label> Overloaded At: </label>
            <input type="number">        
            `;
}

function mk_none_consumable_resource_dialog_properties() {
    return `
            <label> Agent: </label>
            <input type="text">
            <br>
           ` + mk_qaf_drop_down_options() + `
            <br>
            <label> Arrival Time: </label>
            <input type="number">
            <br>
            <label> State: </label>
            <input type="number">
            <br>
            <label> Depleted At: </label>
            <input type="number">
            <br>
            <label> Overloaded At: </label>
            <input type="number">        
            `;
}

/**
 *
 * @param form_dialog_id_str "#id-name"
 * @param selected_type_str   a node_type str
 */
function build_node_type_properties_dialog(
    form_dialog_id_str,
    selected_type_str
) {
    // get and empty out the properties dialog
    const propertiesDiv = $(form_dialog_id_str);
    propertiesDiv.empty();
    // base on selected type append the dialogs
    //TODO: get the current values of the node
    // if it is a new node we do not care since it
    // should be default blank
    switch (selected_type_str) {
        case node_types.task_group:
            propertiesDiv.append(mk_task_group_dialog_properties());
            break;
        case node_types.task:
            propertiesDiv.append(mk_task_dialog_properties());
            break;
        case node_types.method:
            propertiesDiv.append(mk_method_dialog_properties());
            break;
        case node_types.consumable_resource:
            propertiesDiv.append(mk_consumable_resource_dialog_properties());
            break;
        case node_types.none_consumable_resource:
            propertiesDiv.append(mk_none_consumable_resource_dialog_properties());
            break;
        default:
            console.log(`${selected_type_str} is not a know node_type!`);
            break;
    }




}



















