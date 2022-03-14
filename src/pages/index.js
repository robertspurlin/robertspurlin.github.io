import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import {
  Row,
  Col,
  Image
} from 'react-bootstrap';

import SmallContainer from '../components/SmallContainer';
import PageHeader from '../components/PageHeader';

import '../scss/pages/home.scss';

export default () => (
  <div className='home-page'>
    <PageHeader>
      <Col xs='12' className='text-center'>
        <Image src='/images/robert_spurlin.jpeg' className='profile-image' />
        <h1>Robert Spurlin</h1>
        <h2 className='sub-title'>Software Developer</h2>
      </Col>
    </PageHeader>
    <SmallContainer>
      <Row className='py-5'>
        <Col xs='12' md='9'>
          <h3 className='mb-3'>About Me</h3>
          <p>Robert Spurlin loves programming, problem solving, and sleeping in on Saturdays. He is currently a developer at <a href='https://www.quavered.com' target='_blank'>QuaverEd</a>, a company that provides SaaS educational resources to pre-secondary teachers.</p>
          <p>Robert was also a web developer at James E. Walker Library of Middle Tennessee State University (MTSU) and Titan Digital.</p>
          <p>He earned his Bachelors of Business Administration in Marketing from MTSU in 2018.</p>
        </Col>
        <Col xs='12' md='3'>
          <h3 className='mb-3'>Contact</h3>
          <a href='https://www.linkedin.com/in/spurlinrobert' target='_blank' className='contact'>
            <Row className='d-flex align-items-center m-0'>
              <Col xs='auto' className='p-0 m-0'>
                <FontAwesomeIcon icon={faLinkedin} size='2x' />
              </Col>
              <Col xs='auto'>
                <p className='mb-1'>LinkedIn</p>
              </Col>
            </Row>
          </a>
          <a href='https://www.github.com/robertspurlin' target='_blank' className='contact'>
            <Row className='d-flex align-items-center m-0'>
              <Col xs='auto' className='p-0 m-0'>
                <FontAwesomeIcon icon={faGithubSquare} size='2x' />
              </Col>
              <Col xs='auto'>
                <p className='mb-1'>GitHub</p>
              </Col>
            </Row>
          </a>
          <a href='mailto:robertspurlin1996@gmail.com' target='_blank' className='contact'>
            <Row className='d-flex align-items-center m-0'>
              <Col xs='auto' className='p-0 m-0'>
                <FontAwesomeIcon icon={faSquareEnvelope} size='2x' />
              </Col>
              <Col xs='auto'>
                <p className='mb-1'>Email</p>
              </Col>
            </Row>
          </a>
        </Col>
      </Row>
    </SmallContainer>
  </div>
)