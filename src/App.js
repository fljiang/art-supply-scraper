import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Navigation from "./components/navbar";
import ProductTable from "./components/productTable";
import Graph from "./components/graph";
import Contact from "./components/contact";
import styled from "styled-components";

function App() {
  return (
    <Wrapper>
      <Navigation></Navigation>
      <NewContainer>
        <Graph></Graph>
        <ProductTable></ProductTable>
      </NewContainer>
      <NewContainer>
        <Contact></Contact>
      </NewContainer>
      <p>The current time is </p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const NewContainer = styled(Container)`
  width: 100%;
  max-width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: row;
`;

export default App;