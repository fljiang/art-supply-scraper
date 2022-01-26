import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import {
  XYPlot,
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
        <XYPlot height={500} width={515} colorType="category" colorDomain={[0]} colorRange={["#7e57c2"]}>
          <NewVerticalGridLines tickTotal={5}/>
          <NewHorizontalGridLines tickTotal={5}/>
          <NewXAxis title="Date" tickTotal={5} tickLabelAngle={270}/>
          <NewYAxis title="Price" tickTotal={5}/>
          <LineSeries data={this.props.graphData} color={0}></LineSeries>
        </XYPlot>
      </NewContainer>
    );
  }
}

const NewContainer = styled(Container)`
  width: 50%;
  max-width: 50%;
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
  graphData: state.graphData
})

export default connect(mapStateToProps)(Graph);