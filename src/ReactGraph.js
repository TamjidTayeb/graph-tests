import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';

class ReactGraph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creatingLink : false,
      startingNode : "",
      data: {
        nodes: [
          {id: 'Harry'},
          {id: 'Saly'},
          {id: 'aly'}
        ],
        links: [
          // {source: 'Harry', target: 'Madarchod'},
          {source: 'Harry', target: 'Saly'},
        ]
      },
      myConfig: {
        collapsible: false,
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

 // Callback to handle click on the graph.
  // @param {Object} event click dom event
  onClickGraph = function(event) {
    console.log('Clicked the graph background');
  };

  onClickNode = (nodeId) => {
    let start = this.state.startingNode;
    console.log(start)
    let tempData = this.state.data;
    let link = {source: start, target: nodeId};
    if (this.state.creatingLink && start !== nodeId) {
      tempData.links.push(link);
      this.setState({data:tempData});
      this.setState({creatingLink:false})
      this.setState({startingNode:""})
    }
    this.changeColour();
  };

  onDoubleClickNode = (nodeId) => {
    console.log("node double clicked  = " + nodeId)
    this.setState({creatingLink:true});
    // this.setState({startingNode: nodeId})
    this.setState({startingNode: nodeId}, () => {
      this.changeColour();
    })
  }

  changeColour = () => {
    let nodeId = this.state.startingNode;
    let modData = { ...this.state.data };
    let nodes = modData.nodes;
    nodes.forEach(item => {
      console.log(item.color)
      if (item.id === nodeId) { 
        item.color = "green";
      } else {
        item.color = "lightgreen";
      }  
    });
    this.setState({ data: modData });
  }

  onRightClickNode = (event, nodeId) => {
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
    if (this.state.data.nodes.length>1) {
      this.setState({ data: {
        nodes: [{id: 'Blank'}],
        links: []
      }})
    }
  }
  render() {
    console.log(this.state.myConfig)
    return (
        <div>
        <button onClick={this.clearGraph}>Clear Graph</button>
        <Graph
          id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
          data={this.state.data}
          config={this.state.myConfig}
          onClickGraph={this.onClickGraph}
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