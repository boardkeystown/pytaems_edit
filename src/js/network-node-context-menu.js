const nodeContextMenu = document.getElementById('node-context-menu');

/**
 * @param style_pos_top px
 * @param style_pos_left px
 */
function show_node_context_menu_at(style_pos_top, style_pos_left) {
    nodeContextMenu.style.top = style_pos_top;
    nodeContextMenu.style.left = style_pos_left;
    nodeContextMenu.style.display = 'block';
}

nodeContextMenu.addEventListener('mouseleave', function () {
    nodeContextMenu.style.display = 'none';
});


