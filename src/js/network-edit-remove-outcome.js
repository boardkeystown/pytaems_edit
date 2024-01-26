$(function () {
    // press the add button
    $(document).on("click", "#remove_outcome_edit_dialog", (e) => {
        let selectedOutcome = $("#outcome_selection_edit_dialog").val();
        current_outcome = selectedOutcome;
        // remove current node
        if (current_outcome !== null && current_outcome !== undefined) {
            let cur_code = nodes.get(current_node);
            delete cur_code.obj.outcomes[current_outcome];
            // update dropdown
            $("#outcome_selection_edit_dialog").empty();
            $("#outcome_selection_edit_dialog").html(mk_outcomes_options(cur_code).join(' '));
        }
    });
})