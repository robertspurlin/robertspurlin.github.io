import React from 'react';
import { 
  Container, 
  Row
} from 'react-bootstrap';

const PageHeader = ({ children }) => {
	return (
    <Container fluid>
      <Row className='bg-light no-gutters border py-5'>
        { children }
      </Row>
    </Container>
  )
}

export default PageHeader;