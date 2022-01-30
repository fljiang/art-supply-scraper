import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import {
  FlexibleXYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  LineSeries
} from "react-vis";
import styled from "styled-components";

class Graph extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <NewContainer id="graph">
        <FlexibleXYPlot colorType="category" colorDomain={[0]} colorRange={["#7e57c2"]} xType="ordinal">
          <NewVerticalGridLines/>
          <NewHorizontalGridLines tickTotal={5}/>
          <NewXAxis title="Date"/>
          <NewYAxis title="Price" tickTotal={5}/>
          <LineSeries data={this.props.graphData} color={0}></LineSeries>
        </FlexibleXYPlot>
      </NewContainer>
    );
  }
}

const NewContainer = styled(Container)`
  width: 50%;
  height: 600px;
  margin: 0;
  padding-left: 0;
  padding-right: 0;
`;

const NewVerticalGridLines = styled(VerticalGridLines)`
  stroke: lightgray;
`;

const NewHorizontalGridLines = styled(HorizontalGridLines)`
  stroke: lightgray;
`;

const NewXAxis = styled(XAxis)`
  stroke: lightgray;
  stroke-width: 0.5;
`;

const NewYAxis = styled(YAxis)`
  stroke: lightgray;
  stroke-width: 0.5;
`;

const mapStateToProps = (state) => ({
  graphData: state.graphData,
  dates: state.dates
})

export default connect(mapStateToProps)(Graph);