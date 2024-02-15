const edit_outcomes_dialog = document.getElementById("edit-edit-outcome-input-form")

// for the edit dialog edit outcomes
edit_outcomes_dialog.addEventListener('submit', function (e){
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
    let cur_code = nodes.get(current_node);

    if (cur_code.obj.outcomes.hasOwnProperty(current_outcome)) {
        delete cur_code.obj.outcomes[current_outcome];
    }
    cur_code.obj.outcomes[outcome_properties.label] = outcome_properties;

    // update dropdown
    $("#outcome_selection_edit_dialog").empty();
    $("#outcome_selection_edit_dialog").html(mk_outcomes_options(cur_code).join(' '));
    $("#outcome_selection_edit_dialog").val(outcome_properties.label)

    edit_outcomes_dialog.reset();
    $("#edit-edit-outcome-dialog").toggle();
})

build_outcomes_properties(
    "#edit-edit-outcome-properties",
     current_outcome,
     null
);

$(function () {
    $("#edit-edit-outcome-dialog").draggable();
    $("#close-edit-edit-outcome-dialog").on("click", (e) => {
        $("#edit-edit-outcome-dialog").toggle();
    });

    // press the edit button
    $(document).on("click", "#edit_outcome_edit_dialog", (e) => {
        let selectedOutcome = $("#outcome_selection_edit_dialog").val();
        current_outcome = selectedOutcome;
        // can not open dialog if we do not have a selectedOutCome!
        if (current_outcome === null) return;
        show_dialog_at(
            "#edit-edit-outcome-dialog",
            current_mouse_network_pos.top,
            current_mouse_network_pos.left
        );
        build_outcomes_properties(
            "#edit-edit-outcome-properties",
            current_outcome,
            nodes.get(current_node)
        );
    });

    // change outcome drop down of the edit node page
    $(document).on("change", "#outcome_selection_edit_dialog", (e)=> {
        let selectedOutcome = $("#outcome_selection_edit_dialog").val();
        current_outcome = selectedOutcome;
        build_outcomes_properties(
            "#edit-edit-outcome-properties",
            current_outcome,
            nodes.get(current_node),
            "edit_dialog"
        );
    })

})