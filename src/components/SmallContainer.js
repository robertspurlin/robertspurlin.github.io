import React from 'react';
import { Container } from 'react-bootstrap';

const SmallContainer = ({ children }) => {
  return (
    <Container className='small-container'>
      { children }
    </Container>
  )
}

export default SmallContainer;