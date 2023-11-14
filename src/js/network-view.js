let current_node = null;
let current_edge = null;

const current_mouse_network_pos = {
    top: 0 + 'px', left: 0 + 'px'
};

// visjs shapes ellipse, circle, box, diamond, dot, star, triangle, triangleDown, square
const node_types = {
    task_group:'Task_Group',
    task_group_shape:'box',
    task:'Task',
    task_shape:'ellipse',
    method:'Method',
    method_shape:'ellipse',
    consumable_resource:'Consumable_Resource',
    consumable_resource_shape:'triangleDown',
    none_consumable_resource:'None_Consumable_Resource',
    none_consumable_resource_shape:'triangleDown',
};

const edge_types = {
    consumes: "Consumes",
    enables: "Enables",
    disables: "Disables",
    facilitates: "Facilitates",
    hinders1: "Hinders1",
    limits: "Limits",
    produces: "Produces",
};


let network;

function startNetwork(data) {
    const container = document.getElementById("network-view");
    // https://visjs.github.io/vis-network/docs/network/layout.html#
    const options = {
        layout: {
            hierarchical: {
                enabled: true,
                levelSeparation: 150,
                nodeSpacing: 100,
                treeSpacing: 400,
                blockShifting: false,
                edgeMinimization: false,
                parentCentralization: true,
                direction: 'UD',        // UD, DU, LR, RL
                sortMethod: 'hubsize',  // hubsize, directed
            }
        }, // physics: false
        physics: {
            hierarchicalRepulsion: {
                centralGravity: 0.0, springLength: 200, springConstant: 0.01, nodeDistance: 120, damping: 0.09
            }
        }
    };
    network = new vis.Network(container, data, options);
    network.on("click", function (params) {
        if (params.nodes.length) {
            let nodeId = params.nodes[0];
            let nodeData = network.body.data.nodes.get(nodeId);
            console.log(`current_node selected: ${nodeId}`);
        }
    })
    network.on("stabilized", function (params) {
        if (params.iterations > 0) {
            console.log("The network is stabilized after " + params.iterations + " iterations");
            // Disable physics after initial stabilization
            network.setOptions({physics: false});
            network.setOptions({layout: {hierarchical: {enabled: false}}});
        }
    })
    network.on("oncontext", function (params) {
        console.log("right click!");
        params.event.preventDefault();
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            current_node = nodeId;
            console.log("Right-clicked on node:", nodeId);
            // figure out where in the network out mouse is and save it
            const networkRect = container.getBoundingClientRect();
            current_mouse_network_pos.top = (networkRect.top + window.scrollY + params.pointer.DOM.y) + 'px';
            current_mouse_network_pos.left = (networkRect.left + window.scrollX + params.pointer.DOM.x) + 'px';
            // show the context menu
            show_node_context_menu_at(current_mouse_network_pos.top, current_mouse_network_pos.left);
        } else if (params.edges.length > 0) {
            const edgeId = params.edges[0]; // Get the first edge's ID
            // const edgeData = edges.get(edgeId);
            // console.log("Right-clicked on edge:", edgeData);
            console.log("Right-clicked on edge:", edgeId);
            current_edge = edgeId
            // figure out where in the network out mouse is and save it
            const networkRect = container.getBoundingClientRect();
            current_mouse_network_pos.top = (networkRect.top + window.scrollY + params.pointer.DOM.y) + 'px';
            current_mouse_network_pos.left = (networkRect.left + window.scrollX + params.pointer.DOM.x) + 'px';
            // show the context menu
            show_edge_context_menu_at(current_mouse_network_pos.top, current_mouse_network_pos.left);
        }
    })
}

// set up nodes and edges
const nodes = new vis.DataSet([
    {id: "node-0", label: "node-0", obj: { type: "Task_Group"}},
]);


// https://visjs.github.io/vis-data/data/dataset.html
nodes.on('*', function (event, properties, senderId) {
    console.log('event:', event, 'properties:', properties, 'senderId:', senderId);
});

const edges = new vis.DataSet([]);
edges.on('*', function (event, properties, senderId) {
    console.log('event:', event, 'properties:', properties, 'senderId:', senderId);
});


const nodesView = new vis.DataView(nodes, {});
const edgesView = new vis.DataView(edges, {});

refresh_nodes_types();
startNetwork({nodes: nodesView, edges: edgesView});

// buttons for the network

// upload json file btn
const upload_network_json_file = document.getElementById('upload-network-json-file');
upload_network_json_file.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    let json = {}
    reader.onload = function (e) {
        json = JSON.parse(e.target.result);
        //TODO: load up the nodes and edges
        console.log(json);
    };
    reader.readAsText(file);
})

// save current network as networkx json file
function save_network_btn() {
    console.log(nodes)
    const networdXData = {
        directed: true, multigraph: true, graph: {}, nodes: nodes.get(), links: edges.get()
    };
    const json = JSON.stringify(networdXData, null, 4);
    console.log(json);
    const blob = new Blob([json], {type: 'text'})
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'download.json'
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// turn the physics back on to realign network
function toggle_physics_btn() {
    network.setOptions({physics: {enabled: true}})
    network.setOptions({
        layout: {
            hierarchical: {
                enabled: true,
                levelSeparation: 150,
                nodeSpacing: 100,
                treeSpacing: 400,
                blockShifting: false,
                edgeMinimization: false,
                parentCentralization: true,
                direction: 'UD',        // UD, DU, LR, RL
                sortMethod: 'hubsize',  // hubsize, directed
            }
        }
    });
}


function refresh_nodes_types() {
    nodes.forEach(node => {

        switch (node.obj.type) {
            case node_types.task_group:
                node.shape = node_types.task_group_shape;
                break;
            case node_types.task:
                node.shape = node_types.task_shape;
                break;
            case node_types.method_shape:
                node.shape = node_types.method_shape;
                break;
            case node_types.consumable_resource:
                node.shape = node_types.consumable_resource_shape;
                break;
            case node_types.none_consumable_resource:
                node.shape = node_types.none_consumable_resource_shape;
                break;
            default:
                node.shape = node_types.task_shape;
                break;
        }
        // if (node.obj.type === node_types.task_group) {
        //     node.shape = node_types.task_group_shape;
        // } else if (node.obj.type === node_types.consumable_resource) {
        //     node.shape = node_types.consumable_resource_shape;
        // } else if (node.obj.type === node_types.none_consumable_resource) {
        //     node.shape = node_types.none_consumable_resource_shape;
        // } else {
        //     node.shape = node_types.task_shape;
        // }
        nodes.update(node);
    });
}