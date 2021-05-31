import React, { Component } from "react";
import {
  Form,
  FormControl,
  Button,
  Container
} from "react-bootstrap";
import { MdDone } from "react-icons/md";
import { connect } from "react-redux";
import { setEmailInput } from "../redux/actions";
import styled from "styled-components";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.emailInputRef = React.createRef();
  }

  handleEmailInput = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      this.handleEmail();
    }
  }

  submitEmailInput = () => {
    const emailInput = this.emailInputRef.current.value;
    this.props.setEmailInput(emailInput);
  }

  render() {
    let success;
    if (this.props.emailInputSuccess) {
      success = <MdDone />
    }

    return (
      <NewContainer id="contact">
        <Form onKeyDown={this.handleEmailInput} inline>
          <NewFormControl type="email" placeholder="Enter email" ref={this.emailInputRef} />
          {success}
        </Form>
        <NewButton variant="outline-success" onClick={this.submitEmailInput}>
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
  setEmailInput: setEmailInput
};

const mapStateToProps = (state) => ({
  emailInputSuccess: state.emailInputSuccess
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);