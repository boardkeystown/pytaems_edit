function reverseEdgeBtn() {
    edgeContextMenu.style.display = 'none';
    let cur_edge = edges.get(current_edge);
    let from_node = cur_edge.from;
    let to_node = cur_edge.to;
    cur_edge.from = to_node;
    cur_edge.to = from_node;
    edges.update(cur_edge);
}