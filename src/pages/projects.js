import React from 'react';
import { useRouteData } from 'react-static';
import PageHeader from '../components/PageHeader';
import {
  Container,
  Col
} from 'react-bootstrap';
import Project from '../components/Project';

const Projects = () => {
  const { projects } = useRouteData();
  return (
    <div className='blog'>
      <PageHeader>
        <Col xs='12' className='text-center'>
          <h1>Projects</h1>
          <p className='mt-3'>A small collection of my personal work.</p>
        </Col>
      </PageHeader>
      <Container className='small-container'>
        {
          projects.data.map(project => (
            <Project key={project.name} project={project} />
          ))
        }
      </Container>
    </div>
  )
}

export default Projects;
