import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

const Footer = () => {
  const date = new Date;
  const year = date.getFullYear();
  return (
    <footer>
      <Container fluid>
        <Row className='d-flex justify-content-between'>
          <Col md='auto' xs='12' className='text-center'>
            <p>&copy; { year } Robert Spurlin.</p>
          </Col>
          <Col md='auto' xs='12' className='text-center'>
            <a href='https://www.linkedin.com/in/spurlinrobert' target='_blank'>
              <FontAwesomeIcon icon={faLinkedin} size='xl' className='me-3' />
            </a>
            <a href='https://www.github.com/robertspurlin' target='_blank'>
              <FontAwesomeIcon icon={faGithubSquare} size='xl' className='me-3'/>
            </a>
            <a href='mailto:robertspurlin1996@gmail.com' target='_blank'>
              <FontAwesomeIcon icon={faSquareEnvelope} size='xl' className='me-3'/>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;