import React, { Component } from "react";
import { Container } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
// import { MdDone } from "react-icons/md";
import { connect } from "react-redux";
import { setProductId } from "../redux/actions";
import styled from "styled-components";

const columns = [
  {
    dataField: "favorite",
    text: "Favorite",
    style: {
        width: "15%",
    }
  }, {
    dataField: "name",
    text: "Name",
    style: {
      width: "30%",
    }
  }, {
    dataField: "store",
    text: "Store",
    style: {
      width: "20%",
    }
  }, {
    dataField: "stock",
    text: "Stock",
    style: {
      width: "20%",
    }
  }, {
    dataField: "price",
    text: "Price",
    style: {
      width: "15%",
    }
  }
];

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