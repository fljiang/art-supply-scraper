import {
  withStyles,
  createMuiTheme,
  ThemeProvider
 } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { Component } from "react";
import {
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Container
} from "react-bootstrap";
import { connect } from "react-redux";
import { setSearchInput } from "../redux/actions";
import styled from "styled-components";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();
  }

  handleSearchInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.submitSearchInput();
    }
  }

  submitSearchInput = () => {
    const searchInput = this.searchInputRef.current.value;
    this.props.setSearchInput(searchInput);
    this.forceUpdate();
  }

  render() {
    const {
      recentSearches,
      searchOptions
    } = this.props;

    return(
      <NewContainer id="navbar">
        <NewNavbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Art-Supply-Scraper</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Favorites</Nav.Link>
              <NavDropdown title="Recent Searches" id="basic-nav-dropdown">
                <NewNavDropdownItem href="#action/3.1">{recentSearches[0]}</NewNavDropdownItem>
                <NewNavDropdownItem href="#action/3.2">{recentSearches[1]}</NewNavDropdownItem>
                <NewNavDropdownItem href="#action/3.3">{recentSearches[2]}</NewNavDropdownItem>
              </NavDropdown>
            </Nav>
            <ThemeProvider theme={theme}>
              <StyledAutocomplete
                id="search-options"
                options={searchOptions}
                getOptionLabel={(searchOption) => searchOption.name}
                renderInput={(params) =>
                  <NewTextField
                    {...params}
                    onKeyDown={this.handleSearchInput}
                    inputRef={this.searchInputRef}/>}
                renderOption={(searchOption) => (
                  <NewNavDropdownItem>{searchOption.name}</NewNavDropdownItem>
                )}
              />
            </ThemeProvider>
            <NewButton variant="outline-success" onClick={this.submitSearchInput}>Search</NewButton>
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

const NewNavDropdownItem = styled(NavDropdown.Item)`
  color: #7e57c2; !important;
  &:hover, &:active, &:focus {
    color: white;
    background-color: #7e57c2 !important;
  }
`;

const NewTextField = styled(TextField)`
  width: 150% !important;
`;

const NewButton = styled(Button)`
  color: #7e57c2;
  height: 50%;
  margin-right: 15px;
  border: 1px solid #7e57c2;
  &:hover, &:active, &:focus {
    background-color: #7e57c2 !important;
    border: 1px solid #7e57c2 !important;
    box-shadow: none !important;
  }
`;

const StyledAutocomplete = withStyles({
  root: {
    marginRight: 150,
    padding: 10,
    height: 50,
    width: 300
  },
  inputRoot: {
    color: "#7e57c2"

  },
  option: {
    "&:hover": {
      backgroundColor: "#7e57c2"
    }
  }
})(Autocomplete);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7e57c2",
    }
  }
});

const mapDispatchToProps = {
  setSearchInput: setSearchInput
};

const mapStateToProps = (state) => ({
  recentSearches: state.recentSearches,
  searchOptions: state.searchOptions
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);