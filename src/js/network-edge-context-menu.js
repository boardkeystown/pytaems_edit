const edgeContextMenu = document.getElementById('edge-context-menu');
/**
 * @param style_pos_top px
 * @param style_pos_left px
 */
function show_edge_context_menu_at(style_pos_top, style_pos_left) {
    edgeContextMenu.style.top = style_pos_top;
    edgeContextMenu.style.left = style_pos_left;
    edgeContextMenu.style.display = 'block';
}

edgeContextMenu.addEventListener('mouseleave', function () {
    edgeContextMenu.style.display = 'none';
});

