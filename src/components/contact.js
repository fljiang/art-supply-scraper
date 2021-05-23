import React, { Component } from "react";
import {
  Form,
  FormControl,
  Button,
  Container
} from "react-bootstrap";
import { MdDone } from "react-icons/md";
import { connect } from "react-redux";
import { setEmail } from "../redux/actions";
import styled from "styled-components";

class Contact extends Component {
  constructor(props) {
    super(props);
  }

  submitEmail = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      this.handleEmail();
    }
  }

  handleEmail = () => {
    const email = this.refs.email.value;
    this.props.setEmail(email);
  }

  render() {
    let success;
    if (this.props.emailSuccess) {
      success = <MdDone />
    }

    return (
      <NewContainer id="contact">
        <Form onKeyDown={this.submitEmail} inline>
          <NewFormControl type="email" placeholder="Enter email" ref="email" />
          {success}
        </Form>
        <NewButton variant="outline-success" onClick={this.handleEmail}>
            Submit
        </NewButton>
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

const NewFormControl = styled(FormControl)`
  &:active, &:focus {
    border: 1px solid #7e57c2 !important;
  }
`;

const NewButton = styled(Button)`
  color: #7e57c2;
  border: 1px solid #7e57c2;
  margin-top: 5px;
  &:hover, &:active, &:focus {
    background-color: #7e57c2 !important;
    border: 1px solid #7e57c2 !important;
    box-shadow: none !important;
  }
`;

const mapDispatchToProps = {
  setEmail: setEmail
};

const mapStateToProps = (state) => ({
  emailSuccess: state.emailSuccess
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);