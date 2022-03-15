import React from 'react';
import { useRouteData } from 'react-static';
import PageHeader from '../components/PageHeader';
import {
  Container,
  Row, 
  Col 
} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { Link } from '@reach/router';

const Post = () => {
  const { post } = useRouteData();
  return (
    <div className='post'>
      <PageHeader>
        <Col xs='12' className='text-center'>
          <h1>{ post.data.title }</h1>
        </Col>
      </PageHeader>
      <Container className='small-container'>
        <Row>
          <Col xs='12' className='my-3'>
          <Link to='/blog'>&lt; Back to Blog</Link>
          </Col>
          <Col xs='12' className='mb-3'>
            <ReactMarkdown children={ post.content } />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Post;
