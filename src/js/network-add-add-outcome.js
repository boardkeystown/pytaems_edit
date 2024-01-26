const add_add_outcomes_dialog = document.getElementById("add-add-outcome-input-form")

// for the edit dialog edit outcomes
add_add_outcomes_dialog.addEventListener('submit', function (e){
    e.preventDefault();
    let formData = new FormData(e.target);
    let outcome_properties = {
        label: "",
        density: 0,
        quality_distribution: [],
        duration_distribution: [],
        cost_distribution: []
    };
    for (let pair of formData.entries()) {
        let key = pair[0];
        let value = pair[1];
        switch (key) {
            case 'label':
                outcome_properties.label = value;
                break;
            case 'density':
                outcome_properties.density = value
                break;
            case 'quality_distribution':
                outcome_properties.quality_distribution = value.split(',').map((e) => {
                    return parseFloat(e);
                }).filter((e)=> {
                    return !isNaN(e);
                });
                break;
            case 'duration_distribution':
                outcome_properties.duration_distribution = value.split(',').map((e) => {
                    return parseFloat(e);
                }).filter((e)=> {
                    return !isNaN(e);
                });
                break;
            case 'cost_distribution':
                outcome_properties.cost_distribution = value.split(',').map((e) => {
                    return parseFloat(e);
                }).filter((e)=> {
                    return !isNaN(e);
                });
                break;
            default:
                console.log(`${key}  - ${value}`);
                break;
        };
    }

    new_node_outcome.obj.outcomes[outcome_properties.label] = outcome_properties;

    // // if you already have outcomes because you are already method
    // let cur_code = nodes.get(current_node);
    //
    // cur_code.obj.outcomes[outcome_properties.label] = outcome_properties;
    //
    // // update dropdown
    $("#outcome_selection_add_dialog").empty();
    $("#outcome_selection_add_dialog").html(mk_outcomes_options(new_node_outcome).join(' '));
    $("#outcome_selection_add_dialog").val(outcome_properties.label)
    //
    // edit_add_outcomes_dialog.reset();
    // $("#edit-add-outcome-dialog").toggle();
})


build_outcomes_properties(
    "#edit-add-outcome-properties",
    null,
    null,
);

$(function () {
    $("#add-add-outcome-dialog").draggable();
    $("#close-add-add-outcome-dialog").on("click", (e) => {
        $("#add-add-outcome-dialog").toggle();
    });

    // press the add button
    $(document).on("click", "#add_outcome_add_dialog", (e) => {
        show_dialog_at(
            "#add-add-outcome-dialog",
            current_mouse_network_pos.top,
            current_mouse_network_pos.left
        );
        build_outcomes_properties(
            "#add-add-outcome-properties",
            null,
            null
        );
    });
})