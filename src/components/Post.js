import React from 'react';
import {
  Row,
  Col,
  Image
} from 'react-bootstrap';
import { Link } from '@reach/router';

const truncateString = (str) => {
  return str.length > 175 ? str.substring(0, 175) + "..." : str;
}

const getDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: "UTC"
  });
}

const Post = ({ post }) => {
  return (
    <article className='my-5'>
      <Row>
        <Col xs='12' md='4' className='text-center mb-3'>
          <Link to={`/blog/post${post.slug}/`}>
            <Image src={ post.data.thumbnail_path } fluid='true' />
          </Link>
        </Col>
        <Col xs='12' md='8'>
          <Link to={`/blog/post${post.slug}/`}>
            <h2>{ post.data.title }</h2>
          </Link>
          <p>{ getDate(post.date) }</p>
          <p>{ truncateString(post.content) }</p>
          <Link to={`/blog/post${post.slug}/`}>Continue Reading &gt;</Link>
        </Col>
        <Col xs='12' className='mt-5 mb-3'>
          <hr />
        </Col>
      </Row>
    </article>
  )
}

export default Post;