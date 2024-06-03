import * as joint from 'jointjs';
import design from './design.json';


var namespace = joint.shapes;

var graph = new joint.dia.Graph({}, { cellNamespace: namespace });
window.graph = graph;

var paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: 1200,
    height: 1200,
    gridSize: 10,
    drawGrid: true,
    background: {
        color: 'rgba(0, 255, 0, 0.3)'
    },
    cellViewNamespace: namespace
});

var rect = new joint.shapes.standard.Rectangle();
rect.position(100, 30);
rect.resize(100, 40);
rect.attr({
    body: {
        fill: 'blue'
    },
    label: {
        text: 'Hello',
        fill: 'white'
    }
});
rect.addTo(graph);

var rect2 = rect.clone();
rect2.translate(300, 0);
rect2.attr('label/text', 'World!');
rect2.addTo(graph);

var link = new joint.shapes.standard.Link();
link.source(rect);
link.target(rect2);
link.addTo(graph);

link.labels([{
    attrs: {
        text: {
            text: 'Hello, World'
        },
    },
    position: {
        distance: 0.25
    }
}]);

// style the model shape and round the corners
var shape = new joint.shapes.devs.Model({
    attrs: {
        ".label": {
            text: "Model1",
        },
        ".inPorts circle": {
            fill: "#16A085",
            magnet: "passive",
            type: "input"
        },
        ".outPorts circle": {
            fill: "#E74C3C",
            type: "output"
        },
        ".body": {
            rx: 6,
            ry: 6
        }

    },
    position: {
        x: 100,
        y: 100
    },
    inPorts: ['in1', 'in2'],
    outPorts: ['out1', 'out2'],
    size: {
        width: 300,
        height: 300
    },
});

shape.addTo(graph);


console.log(shape)

// adding/removing ports dynamically
shape.addInPort('in3');
shape.removeOutPort('out1').addOutPort('out3');

console.log(graph.toJSON())


graph.fromJSON(design);