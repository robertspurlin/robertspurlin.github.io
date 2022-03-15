import React from 'react';
import {
  Row,
  Col,
  Image
} from 'react-bootstrap';

const Project = ({ project }) => {
  return (
    <article className='my-5'>
      <Row>
        <Col xs='12' md='4' className='text-center mb-3'>
          <a href={ project.url } target='_blank'>
            <Image src={ project.image } fluid='true' />
          </a>
        </Col>
        <Col xs='12' md='8'>
          <a href={ project.url } target='_blank'>
            <h2>{ project.name }</h2>
          </a>
          <a href={ project.url } target='_blank'>{ project.url }</a>
          <p className='mt-3'>{ project.date }</p>
          <p>{ project.description }</p>
        </Col>
        <Col xs='12' className='mt-5 mb-3'>
          <hr />
        </Col>
      </Row>
    </article>
  )
}

export default Project;