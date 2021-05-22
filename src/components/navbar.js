import React, { Component } from "react";
import {
  Button,
  Navbar,
  Nav,
  Form,
  FormControl,
  NavDropdown,
  Container
} from "react-bootstrap";
import { connect } from "react-redux";
import { setSearchInput } from "../redux/actions";
import styled from "styled-components";

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  submitSearchInput = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      this.handleSearchInput();
    }
  }

  handleSearchInput = () => {
    const searchInput = this.refs.searchInput.value;
    this.props.setSearchInput(searchInput);
    this.forceUpdate();
  }

  render() {
    const {
      recentSearches
    } = this.props;

    return(
      <NewContainer id="navbar">
        <NewNavbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Art-Supply-Bot</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <NewNav className="mr-auto">
              <Nav.Link href="#home">Favorites</Nav.Link>
              <NavDropdown title="Recent Searches" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">{recentSearches[0]}</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">{recentSearches[1]}</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">{recentSearches[2]}</NavDropdown.Item>
              </NavDropdown>
            </NewNav>
            <Form onKeyDown={this.submitSearchInput} inline>
              <NewFormControl type="text" placeholder="Copic marker" ref="searchInput" />
              <NewButton variant="outline-success" onClick={this.handleSearchInput}>Search</NewButton>
            </Form>
          </Navbar.Collapse>
        </NewNavbar>
      </NewContainer>
    );
  }
}

const NewContainer = styled(Container)`
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding-left: 0;
  padding-right: 0;
`;

const NewNavbar = styled(Navbar)`
  width: calc(15px + 100%);
  border-bottom: 2px solid #eee;
`;

const NewNav = styled(Nav)`
  margin-left: 50%;
`;

const NewFormControl = styled(FormControl)`
  &:active, &:focus {
    border: 1px solid blueviolet !important;
  }
`;

const NewButton = styled(Button)`
  color: blueviolet;
  margin-left: 5px;
  margin-right: 15px;
  border: 1px solid blueviolet;
  &:hover, &:active, &:focus {
    background-color: blueviolet !important;
    border: 1px solid blueviolet !important;
    box-shadow: none !important;
  }
`;

const mapDispatchToProps =  {
  setSearchInput: setSearchInput
};

const mapStateToProps = (state) => ({
  recentSearches: state.recentSearches
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);