const add_edit_outcomes_dialog = document.getElementById("add-edit-outcome-input-form")

// for the edit dialog edit outcomes
add_edit_outcomes_dialog.addEventListener('submit', function (e){
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
                outcome_properties.density = parseFloat(value+"")
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
    // if you already have outcomes because you are already method


    if (new_node_outcome.obj.outcomes.hasOwnProperty(current_outcome)) {
        delete new_node_outcome.obj.outcomes[current_outcome];
    }
    new_node_outcome.obj.outcomes[outcome_properties.label] = outcome_properties;

    // update dropdown
    $("#outcome_selection_add_dialog").empty();
    $("#outcome_selection_add_dialog").html(mk_outcomes_options(new_node_outcome).join(' '));
    $("#outcome_selection_add_dialog").val(outcome_properties.label)

    add_edit_outcomes_dialog.reset();
    $("#add-edit-outcome-dialog").toggle();
    current_node = null;
})

build_outcomes_properties(
    "#add-edit-outcome-properties",
    current_outcome,
    null
);

$(function () {
    $("#add-edit-outcome-dialog").draggable();
    $("#close-add-edit-outcome-dialog").on("click", (e) => {
        $("#add-edit-outcome-dialog").toggle();
    });

    // press the edit button
    $(document).on("click", "#edit_outcome_add_dialog", (e) => {
        let selectedOutcome = $("#outcome_selection_add_dialog").val();
        current_outcome = selectedOutcome;
        // can not open dialog if we do not have a selectedOutCome!
        if (current_outcome === null) return;
        show_dialog_at(
            "#add-edit-outcome-dialog",
            current_mouse_network_pos.top,
            current_mouse_network_pos.left
        );
        build_outcomes_properties(
            "#add-edit-outcome-properties",
            current_outcome,
            new_node_outcome
        );
    });

    // change outcome drop down of the edit node page
    $(document).on("change", "#outcome_selection_add_dialog", (e)=> {
        let selectedOutcome = $("#outcome_selection_add_dialog").val();
        current_outcome = selectedOutcome;
        build_outcomes_properties(
            "#add-edit-outcome-properties",
            current_outcome,
            new_node_outcome
        );
    })

})