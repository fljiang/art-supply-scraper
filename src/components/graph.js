import React, { Component } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import {
  XYPlot,
  VerticalBarSeries
} from "react-vis";
import { connect } from "react-redux";

class Graph extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <NewContainer id="graph">
        <XYPlot height={200} width={200} colorType="category" colorDomain={[0]} colorRange={["#6200ea"]}>
          <VerticalBarSeries data={this.props.graphData}></VerticalBarSeries>
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

const mapStateToProps = (state) => ({
  graphData: state.graphData
})

export default connect(mapStateToProps)(Graph);