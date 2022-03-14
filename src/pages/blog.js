import React from 'react';
import { useRouteData } from 'react-static';
import PageHeader from '../components/PageHeader';
import { 
  Container, 
  Row, 
  Col 
} from 'react-bootstrap';
import { Link } from '@reach/router';

const Blog = () => {
  const { posts } = useRouteData();
  return (
    <div className='blog'>
      <PageHeader>
        <Col xs='12' className='text-center'>
          <h1>Blog</h1>
          <p className='mt-3'>My thoughts, now on the internet.</p>
        </Col>
      </PageHeader>
      <Container>
        <Row>
          {
            posts.map(post => (
              <Col key={post.slug} xs='12'>
                <Link to={`/blog/post${post.slug}/`}>{post.data.title}</Link>
              </Col>
            ))
          }
        </Row>
      </Container>
    </div>
  )
}

export default Blog;
