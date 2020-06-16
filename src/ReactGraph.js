import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';

class ReactGraph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeNode: '',
      nodes: [
        {id: 'System 1', x: 50, y: 50, 'color': 'black', size: 500},
        {id: 'System 2', x: 50, y: 100 },
        {id: 'System 3',  x: 50, y: 150, },
        {id: 'System 4',  x: 50, y: 200, },
        {id: 'aly',  x: 0, y: 300},
        {id: 'abbu',  x: 50, y: 300},
        {id: 'bakur', 'color': 'black',  x: 100, y: 300}
      ],
      main: [
        'System 1',
        'System 2',
        'System 3',
        'System 4'
      ],
      links: [
        {source: 'System 1', target: 'System 2'},
        {source: 'System 2', target: 'System 3'},
        {source: 'System 3', target: 'System 4'},
        {source: 'System 4', target: 'aly'},
        {source: 'System 4', target: 'abbu'},
        {source: 'System 4', target: 'bakur'},
      ],
      myConfig: {
        staticGraphWithDragAndDrop: true,
        collapsible: true,
        nodeHighlightBehavior: true,
        node: {
          color: 'lightgreen',
          size: 120,
          highlightStrokeColor: 'green'
        },
        link: {
          highlightColor: 'lightgrey'
        }
      }
    }
  }

  componentWillMount() {
    // this.changeColour()
  }

 // Callback to handle click on the graph.
  // @param {Object} event click dom event
  onClickGraph = function(event) {
    console.log('Clicked the graph background');
    console.log(event)
  };

  onRightClickGraph = function(event) {
    console.log('Clicked the graph background');
  };

  onClickNode = (nodeId) => {
    console.log(nodeId)
  };

  onDoubleClickNode = (nodeId) => {
    console.log('double clicked ' + nodeId)
  }

  collapse = (nodeId) => {
    this.setState( {activeNode: nodeId} )
  }

  changeColour = () => {
    let nodeId = this.state.startingNode;
    let nodes =  [...this.state.nodes];
    nodes.forEach(item => {
      console.log(item)
      if (item.id === nodeId) { 
        item.color = "green";
      } else if ( this.state.main.includes(item.id) ) {
        item.color = "red"
      } else {
        item.color = "lightgreen";
      }  
    });
    this.setState({ nodes: nodes });
  }

  onRightClickNode = (event, nodeId) => {
    console.log(event)
    console.log('Right clicked node ${nodeId}');
  };

  onMouseOverNode = (nodeId) => {
    // console.log(`Mouse over node ${nodeId}`);
  };

  onMouseOutNode = (nodeId) => {
    // console.log(`Mouse out node ${nodeId}`);
  };

  onClickLink = (source, target) => {
    console.log(`Clicked link between ${source} and ${target}`);
  };

  onRightClickLink = (event, source, target) => {
    console.log(`Right clicked link between ${source} and ${target}`);
  };

  onMouseOverLink = (source, target) => {
    // console.log(`Mouse over in link between ${source} and ${target}`);
  };

  onMouseOutLink = (source, target) => {
    // console.log(`Mouse out link between ${source} and ${target}`);
  };

  onNodePositionChange = (nodeId, x, y) => {
    console.log(`Node ${nodeId} moved to new position x= ${x} y= ${y}`);
  };

  clearGraph = () => {
    if (this.state.nodes.length > 1) {
      this.setState({
        nodes: [{id: 'Blank'}],
        links: []
      })
    }
  }

  addNode = () => {
    const node = { id: Math.random(1000).toString() }
    this.setState( { nodes : [...this.state.nodes, node]} )
  }

  render() {
    return (
      <div>
        <button onClick={this.addNode}>Add Node</button>
        <button onClick={this.clearGraph}>Clear Graph</button>
        <Graph
          id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
          data={{nodes: this.state.nodes, links: this.state.links}}
          config={this.state.myConfig}
          onClickGraph={this.onClickGraph}
          onRightClickGraph={this.onRightClickGraph}
          onClickNode={this.onClickNode}
          onDoubleClickNode={this.onDoubleClickNode}
          onRightClickNode={this.onRightClickNode}
          onClickLink={this.onClickLink}
          onRightClickLink={this.onRightClickLink}
          onMouseOverNode={this.onMouseOverNode}
          onMouseOutNode={this.onMouseOutNode}
          onMouseOverLink={this.onMouseOverLink}
          onMouseOutLink={this.onMouseOutLink} />
      </div>
    );
  }
}

export default ReactGraph;