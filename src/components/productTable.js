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
              <td>{ this.props.tableData[0].name }</td>
              <td>{ this.props.tableData[0].store }</td>
              <td>{ this.props.tableData[0].stock }</td>
              <td>{ this.props.tableData[0].price }</td>
            </tr>
            <tr>
              <td><MdDone /></td>
              <td>{ this.props.tableData[1].name }</td>
              <td>{ this.props.tableData[1].store }</td>
              <td>{ this.props.tableData[1].stock }</td>
              <td>{ this.props.tableData[1].price }</td>
            </tr>
            <tr>
              <td><MdDone /></td>
              <td>{ this.props.tableData[2].name }</td>
              <td>{ this.props.tableData[2].store }</td>
              <td>{ this.props.tableData[2].stock }</td>
              <td>{ this.props.tableData[2].price }</td>
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
  tableData: state.tableData
});

export default connect(mapStateToProps)(ProductTable);