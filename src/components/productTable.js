import React, { Component } from "react";
import {
  Table,
  Container
 } from "react-bootstrap";
import { MdDone } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";

class ProductTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <NewContainer id="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Favorite</th>
              <th>Product Name</th>
              <th>Store</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><MdDone /></td>
              <td>{ this.props.searchInput }</td>
              <td>Todo</td>
              <td>Todo</td>
              <td>Todo</td>
            </tr>
            <tr>
              <td><MdDone /></td>
              <td>{ this.props.searchInput }</td>
              <td>Todo</td>
              <td>Todo</td>
              <td>Todo</td>
            </tr>
            <tr>
              <td><MdDone /></td>
              <td>{ this.props.searchInput }</td>
              <td>Todo</td>
              <td>Todo</td>
              <td>Todo</td>
            </tr>
          </tbody>
        </Table>
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
  searchInput: state.searchInput
});

export default connect(mapStateToProps)(ProductTable);