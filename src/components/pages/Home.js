import {
  Row,
  Col,
  Image
} from 'react-bootstrap';

import '../../scss/components/pages/home.scss';

const Home = () => {
  return (
    <Row className='bg-light no-gutters border py-5'>
      <Col xs='12' className='text-center'>
        <Image src='/images/robert_spurlin.jpeg' className='profile-image' />
        <h1>Robert Spurlin</h1>
        <h2 className='sub-title'>Software Developer</h2>
      </Col>
    </Row>
  )
}

export default Home;