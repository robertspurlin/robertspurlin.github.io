import React from 'react';
import PageHeader from '../components/PageHeader';
import { Col } from 'react-bootstrap';

export default () => (
  <PageHeader>
    <Col xs='12' className='text-center'>
      <h1>404</h1>
      <p>No page found. If you think this was in error, <a href='mailto:robertspurlin1996@gmail.com'>email Robert.</a></p>
    </Col>
  </PageHeader>
)
