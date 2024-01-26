$(function () {
    // press the add button
    $(document).on("click", "#remove_outcome_add_dialog", (e) => {
        let selectedOutcome = $("#outcome_selection_add_dialog").val();
        current_outcome = selectedOutcome;
        // remove current node
        if (current_outcome !== null && current_outcome !== undefined) {
            let cur_code = new_node_outcome;
            delete new_node_outcome.obj.outcomes[current_outcome];
            // update dropdown
            $("#outcome_selection_add_dialog").empty();
            $("#outcome_selection_add_dialog").html(mk_outcomes_options(new_node_outcome).join(' '));
        }
    });
})