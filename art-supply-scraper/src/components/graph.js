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
      <NewContainer>
        <XYPlot height={200} width={200} colorType="category" colorDomain={[0]} colorRange={["blueviolet"]}>
          <VerticalBarSeries data={this.props.graphData}></VerticalBarSeries>
        </XYPlot>
      </NewContainer>
    );
  }
}

const NewContainer = styled(Container)`
  width: 50%;
  max-width: 50%;
`;

const mapStateToProps = (state) => ({
  graphData: state.graphData
})

export default connect(mapStateToProps)(Graph);