const contextMenu = document.getElementById('node-context-menu');

/**
 * @param style_pos_top px
 * @param style_pos_left px
 */
function show_context_menu_at(style_pos_top, style_pos_left) {
    contextMenu.style.top = style_pos_top;
    contextMenu.style.left = style_pos_left;
    contextMenu.style.display = 'block';
}

contextMenu.addEventListener('mouseleave', function () {
    contextMenu.style.display = 'none';
})


