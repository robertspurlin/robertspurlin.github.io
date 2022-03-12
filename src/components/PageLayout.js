import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const PageLayout = () => {
	return (
    <Container fluid>
      <Outlet />
    </Container> 
	)
}

export default PageLayout;