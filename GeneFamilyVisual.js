// Authors: Micah Hauge
// This is a simple library to create a visual representation of nodes and edges within a Gene Family

var i, j, k;

// padding between nodes
var padding = 24;
var margin = 10;

// roundness of rectangles: should be between 1 and .5
// 0 produces a square, .5 produces a circle
var roundness = .35;
var nodeSize = 50;
var stroke = 1.5;


function main () {
  var lengthOfGraph = 17;
  var debthOfGraph = 3;

  // create a graph object
  var graph = new Graph();

  // add nodes to the graph
  // graph.addNode(1, 1);
  // graph.addNode(3, 1);
  // graph.addNode(4, 2);
  // graph.addNode(5, 1);

  // add edges to the graph
  // graph.addEdge(0, 1);
  // graph.addEdge(1, 2);
  // graph.addEdge(1, 3);

  // fills the graph with random nodes and edges
  fillWithRandom(graph, lengthOfGraph, debthOfGraph);

  // add the graph to the stage
  graph.addToStage();
}

main();


// Graph object definition
function Graph () {
  this.nodes = [];
  this.edges = [];

  // function to add a node to the graph
  this.addNode = function (x, y) {
    this.nodes.push(new Node(x, y))
  }

  // function to add an edge to the graph
  this.addEdge = function (nodeIndex1, nodeIndex2) {
    // create a path that represents an edge
    var edge = new Path()
      .moveTo(this.nodes[nodeIndex1].centerX, this.nodes[nodeIndex1].centerY)
      .lineTo(this.nodes[nodeIndex2].centerX, this.nodes[nodeIndex2].centerY)
      .stroke(getRandomColor(), 3);

    this.edges.push(edge);
  }

  // function to loop through all nodes and edges in graph and add them to stage
  this.addToStage = function () {
    // first add all edges to stage
    for (i = 0; i < this.edges.length; i++) {
      this.edges[i].addTo(stage);
    }

    // then add all nodes to stage
    for (i = 0; i < this.nodes.length; i++) {
      this.nodes[i].graphic.addTo(stage);
    }
  }

  return this;
}

// Node object definition
function Node (x, y, size) {
  this.graphic = new Rect(x*(nodeSize + padding) + margin, y*(nodeSize + padding) + margin, nodeSize, nodeSize, nodeSize * roundness);
  this.graphic.fill('#cceeff');
  this.graphic.stroke('#000000', stroke)
  this.centerX = x*(nodeSize + padding) + margin + .5 * nodeSize;
  this.centerY = y*(nodeSize + padding) + margin + .5 * nodeSize;

  // ligt up the node when the mouse hovers over it
  this.graphic.on('pointermove', function(e) {
    this.fill('lightgreen');
    console.log('mose over node');
  });

  return this;
}


// function to fill a graph with random nodes and edges
function fillWithRandom (graph, length, debth) {
  // add random nodes to the graph
  for (i = 0; i < length; i += 1) {
    for (j =0; j < getRandom(0, 3); j++) {
      graph.addNode(i, getRandom(1, debth));
    }

    roundness = getRandomFloat(.1, .5);
  }

  // add random edges to the graph
  for (i = 0; i < graph.nodes.length -2; i++) {
    graph.addEdge(i, i+2);
  }
}

function download () {
  //get svg element.
  var svg = document.getElementById("visual");

  //get svg source.
  var serializer = new XMLSerializer();
  var source = serializer.serializeToString(svg);

  //add name spaces.
  if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
      source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }

  //add xml declaration
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

  //convert svg source to URI data scheme.
  var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

  //set url value to a element's href attribute.
  // var downloadButton = document.getElementById("download");

  var downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "graph.svg";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  // document.body.removeChild(downloadLink);
  //you can download svg file by right click menu.
}

function getRandomFloat(minimum, maximum) {
  return Math.random() * (maximum - minimum) + minimum;
}

function getRandom(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function getRandomBool() {
  return Math.round(Math.random());
}

function getRandomColor () {
  return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}
