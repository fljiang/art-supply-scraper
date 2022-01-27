import React, { Component } from "react";
import { Container } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
// import { MdDone } from "react-icons/md";
import { connect } from "react-redux";
import { setProductId } from "../redux/actions";
import styled from "styled-components";

const columns = [{
  dataField: "favorite",
  text: "Favorite"
}, {
  dataField: "name",
  text: "Name"
}, {
  dataField: "store",
  text: "Store"
}, {
  dataField: "stock",
  text: "Stock"
}, {
  dataField: "price",
  text: "Price"
}];

class ProductTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rowEvents = {
      onClick: (e, row) => {
        this.props.setProductId(row.productId);
      }
    };

    return(
      <NewContainer id="table">
        <BootstrapTable keyField="id" data={this.props.tableData} columns={columns} rowEvents={rowEvents}/>
      </NewContainer>
    );
  }
}

const NewContainer = styled(Container)`
  width: 50%;
  margin: 0;
  padding-left: 0;
  padding-right: 0;
`;

const mapDispatchToProps = {
  setProductId: setProductId
};

const mapStateToProps = (state) => ({
  tableData: state.tableData
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);