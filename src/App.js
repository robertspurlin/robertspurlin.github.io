import React from 'react';
import { Root, Routes } from 'react-static';
import { Router } from "@reach/router";

import './scss/index.scss';
import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomHead from "./components/CustomHead";

import { 
  Container,
  Row,
  Col,
  Spinner 
} from "react-bootstrap";

const Loading = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs='12' className='text-center my-5'>
          <Spinner animation="border" variant="secondary" />
        </Col>
      </Row>
    </Container>
  )
}

const App = () => {
  return (
    <Root>
      <CustomHead />
      <Header />
      <div className="content">
        <React.Suspense fallback={<Loading />}>
          <Router>
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </div>
      <Footer />
    </Root>
  )
}

export default App;
