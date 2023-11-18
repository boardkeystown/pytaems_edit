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
}

/**
 * @param dialog_id_name_str "#id-name"
 * @param top_px_str         "123px"
 * @param left_px_str        "123px"
 */
function show_dialog_at(dialog_id_name_str, top_px_str, left_px_str) {
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

const node_type_properties_key_names = {
    agent: "agent",
    qaf: "qaf",
    arrival_time: "arrival_time",
    earliest_start_time: "earliest_start_time",
    deadline: "deadline",
    start_time: "start_time",
    finish_time: "finish_time",
    accrued_time: "accrued_time",
    nonlocal_flag: "nonlocal_flag",
    state: "state",
    depleted_at: "depleted_at",
    overloaded_at: "overloaded_at",

};

const qaf_type_properties_key_names = {
    q_max: "q_max",
    q_min: "q_min",
    q_sum: "q_sum",
    q_sum_all: "q_sum_all",
    seq_min: "seq_min",
    seq_max: "seq_max",
    seq_sum: "seq_sum",
    seq_last: "seq_last",
    q_exactly_one: "q_exactly_one",
    q_last: "q_last",
    q_sigmoid: "q_sigmoid",
};

function mk_selected(key1, key2) {
    let result = (key1 === key2) ? `selected` : ``;
    return result;
}

function mk_qaf_drop_down_options(sno) {
    let qaf_type = null;
    if (sno && sno.hasOwnProperty("obj")) {
        qaf_type = get_value(sno.obj, "qaf");
    }
    return `
    <div class="form-group row text-center node-dialog-form-padding">
        <label class=" col-5 col-form-label font-weight-bold"> qaf </label>
        <div class="col-7">
            <select class="custom-select text-center" id="qaf_selection" name="qaf">
                <option value="q_max"         ${mk_selected(qaf_type_properties_key_names.q_max, qaf_type)}  > q_max                  </option>
                <option value="q_min"         ${mk_selected(qaf_type_properties_key_names.q_min, qaf_type)}  > q_min                  </option>
                <option value="q_sum"         ${mk_selected(qaf_type_properties_key_names.q_sum, qaf_type)}  > q_sum                  </option>
                <option value="q_sum_all"     ${mk_selected(qaf_type_properties_key_names.q_sum_all, qaf_type)}  > q_sum_all          </option>
                <option value="seq_min"       ${mk_selected(qaf_type_properties_key_names.seq_min, qaf_type)}  > seq_min              </option>
                <option value="seq_max"       ${mk_selected(qaf_type_properties_key_names.seq_max, qaf_type)}  > seq_max              </option>
                <option value="seq_sum"       ${mk_selected(qaf_type_properties_key_names.seq_sum, qaf_type)}  > seq_sum              </option>
                <option value="seq_last"      ${mk_selected(qaf_type_properties_key_names.seq_last, qaf_type)}  > seq_last            </option>
                <option value="q_exactly_one" ${mk_selected(qaf_type_properties_key_names.q_exactly_one, qaf_type)}  > q_exactly_one  </option>
                <option value="q_last"        ${mk_selected(qaf_type_properties_key_names.q_last, qaf_type)}  > q_last                </option>
                <option value="q_sigmoid"     ${mk_selected(qaf_type_properties_key_names.q_sigmoid, qaf_type)}  > q_sigmoid          </option>
            </select>
        </div>
    </div>
    `;
}

/**
 * @param value
 * @returns {string} html input tag value or empty str
 */
function mk_input_value(value) {
    let result = '';
    if (value !== null &&
        value !== undefined &&
        value !== '') {
        result = `value=${value}`;
    }
    return result;
}

/**
 * get value of dict or return some default value
 * @param dict
 * @param key
 * @param default_value
 * @returns {*|null}
 */
function get_value(
    dict,
    key,
    default_value = null
) {
    return dict.hasOwnProperty(key) ? dict[key] : default_value;
}

/**
 * @param sno selected node object
 * @param object_key
 * @param key
 * @param default_value
 * @returns {string}  return html tag input=value or empty strings
 */
function sno_value_to_html_input_tag(sno,object_key,key,default_value=null) {
    return mk_input_value(
        (sno && sno.hasOwnProperty(object_key)) ?
            get_value(sno[object_key],key) : default_value
    );
}


function mk_input_label_pattern(input_name, set_input_as, label_name) {
    return `
    <div class="form-group row text-center node-dialog-form-padding">
        <label class="col-5 col-form-label col-form-label-sm font-weight-bold"> ${label_name} </label>
            <div class="col-7">
                <input  
                        class="form-control form-control"
                        type="text" 
                        name=${input_name}
                        ${set_input_as}
                        pattern="^\\w+(-\\w+)*$"
                >
            </div>                 
    </div>
    `;
}

function mk_input_number(input_name,set_input_as, label_name) {
    return `
    <div class="form-group row text-center node-dialog-form-padding">
        <label class="col-5 col-form-label col-form-label-sm font-weight-bold"> ${label_name} </label>
        <div class="col-7">
            <input  class="form-control form-control-sm"
                    type="number"
                    step="any"
                    name=${input_name}
                    ${set_input_as}
            >    
        </div>                 
    </div>
    `;
}

function mk_task_group_dialog_properties(sno) {
    const set_input_as = {
        agent: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.agent),
        arrival_time: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.arrival_time),
        earliest_start_time: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.earliest_start_time),
        deadline: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.deadline),
    };
    return `
            ${mk_input_label_pattern(node_type_properties_key_names.agent,set_input_as.agent,"agent")}
            ${mk_qaf_drop_down_options(sno)} 
            ${mk_input_number(node_type_properties_key_names.arrival_time,set_input_as.arrival_time, "arrival time")}
            ${mk_input_number(node_type_properties_key_names.earliest_start_time,set_input_as.earliest_start_time, "earliest start time")}
            ${mk_input_number(node_type_properties_key_names.deadline,set_input_as.deadline, "deadline")}
            `;
}

function mk_task_dialog_properties(sno) {
    const set_input_as = {
        agent: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.agent),
        arrival_time: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.arrival_time),
        earliest_start_time: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.earliest_start_time),
        deadline: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.deadline),
    };
    return `
            ${mk_input_label_pattern(node_type_properties_key_names.agent,set_input_as.agent,"agent")}
            ${mk_qaf_drop_down_options(sno)}
            ${mk_input_number(node_type_properties_key_names.arrival_time,set_input_as.arrival_time, "arrival time")}
            ${mk_input_number(node_type_properties_key_names.earliest_start_time,set_input_as.earliest_start_time, "earliest start time")}
            ${mk_input_number(node_type_properties_key_names.deadline,set_input_as.deadline, "deadline")}
            `;
}


function mk_method_dialog_properties(sno) {
    const set_input_as = {
        agent: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.agent),
        arrival_time: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.arrival_time),
        earliest_start_time: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.earliest_start_time),
        deadline: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.deadline),
        start_time:  sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.start_time),
        finish_time:  sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.finish_time),
        accrued_time:  sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.finish_time),
        nonlocal_flag: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.nonlocal_flag),
    };
    return `
            ${mk_input_label_pattern(node_type_properties_key_names.agent,set_input_as.agent,"agent")}
            ${mk_input_number(node_type_properties_key_names.arrival_time,set_input_as.arrival_time, "arrival time")}
            ${mk_input_number(node_type_properties_key_names.earliest_start_time,set_input_as.earliest_start_time, "earliest start time")}
            ${mk_input_number(node_type_properties_key_names.deadline,set_input_as.deadline, "deadline")}
            ${mk_input_number(node_type_properties_key_names.start_time,set_input_as.start_time, "start time")}
            ${mk_input_number(node_type_properties_key_names.finish_time,set_input_as.finish_time, "finish time")}
            ${mk_input_number(node_type_properties_key_names.accrued_time,set_input_as.accrued_time, "accured time")}
            ${mk_input_number(node_type_properties_key_names.nonlocal_flag,set_input_as.nonlocal_flag, "nonlocal flag")}
        `;
}

function mk_consumable_resource_dialog_properties(sno) {
    const set_as_input = {
        agent: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.agent),
        arrival_time: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.arrival_time),
        state: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.state),
        depleted_at: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.depleted_at),
        overloaded_at : sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.overloaded_at),
    };
    return `
            ${mk_input_label_pattern(node_type_properties_key_names.agent,set_as_input.agent,"agent")}
            ${mk_qaf_drop_down_options()}
            ${mk_input_number(node_type_properties_key_names.arrival_time,set_as_input.arrival_time, "arrival time")}
            ${mk_input_number(node_type_properties_key_names.state,set_as_input.state, "state")}
            ${mk_input_number(node_type_properties_key_names.depleted_at,set_as_input.depleted_at, "depleted at")}
            ${mk_input_number(node_type_properties_key_names.overloaded_at,set_as_input.overloaded_at, "overloaded at")}
            `;
}

function mk_none_consumable_resource_dialog_properties(sno) {
    const set_as_input = {
        agent: sno_value_to_html_input_tag(sno, "obj", node_type_properties_key_names.agent),
        arrival_time: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.arrival_time),
        state: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.state),
        depleted_at: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.depleted_at),
        overloaded_at: sno_value_to_html_input_tag(sno,"obj",node_type_properties_key_names.overloaded_at),
    };
    return `
            ${mk_input_label_pattern(node_type_properties_key_names.agent,set_as_input.agent,"agent")}
            ${mk_qaf_drop_down_options()}
            ${mk_input_number(node_type_properties_key_names.arrival_time,set_as_input.arrival_time, "arrival time")}
            ${mk_input_number(node_type_properties_key_names.state,set_as_input.state, "state")}
            ${mk_input_number(node_type_properties_key_names.depleted_at,set_as_input.depleted_at, "depleted at")}
            ${mk_input_number(node_type_properties_key_names.overloaded_at,set_as_input.overloaded_at, "overloaded at")}
            `;
}

/**
 *
 * @param form_dialog_id_str "#id-name"
 * @param selected_type_str   a node_type str
 * @param selected_node_object   a network node
 */
function build_node_type_properties_dialog(
    form_dialog_id_str,
    selected_type_str,
    selected_node_object=null,
) {
    // get and empty out the properties dialog
    const propertiesDiv = $(form_dialog_id_str);
    propertiesDiv.empty();
    // base on selected type append the dialogs
    switch (selected_type_str) {
        case node_types.task_group:
            propertiesDiv.append(mk_task_group_dialog_properties(selected_node_object));
            break;
        case node_types.task:
            propertiesDiv.append(mk_task_dialog_properties(selected_node_object));
            break;
        case node_types.method:
            propertiesDiv.append(mk_method_dialog_properties(selected_node_object));
            break;
        case node_types.consumable_resource:
            propertiesDiv.append(mk_consumable_resource_dialog_properties(selected_node_object));
            break;
        case node_types.none_consumable_resource:
            propertiesDiv.append(mk_none_consumable_resource_dialog_properties(selected_node_object));
            break;
        default:
            console.log(`${selected_type_str} is not a know node_type!`);
            break;
    }


}



















