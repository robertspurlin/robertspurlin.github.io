import React from 'react';
import { useRouteData } from 'react-static';
import PageHeader from '../components/PageHeader';
import {
  Container,
  Col
} from 'react-bootstrap';
import Post from '../components/Post';

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
      <Container className='small-container'>
        {
          posts.map(post => (
            <Post key={post.slug} post={post} />
          ))
        }
      </Container>
    </div>
  )
}

export default Blog;
