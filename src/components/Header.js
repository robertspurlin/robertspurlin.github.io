import "../scss/components/header.scss";
import { 
	Navbar,
	Nav,
	Container
} from 'react-bootstrap';
import { NavLink as RouterLink } from "react-router-dom";
import NavigationLink from "./NavigationLink";

const Header = () => {
	return (
		<header>
			<Navbar expand="lg" className='py-0'>
				<Container fluid>
					<RouterLink 
            to="/" 
            className='navbar-brand py-3'>
            Robert Spurlin
          </RouterLink>
					<Navbar.Toggle aria-controls="navbar-nav" />
					<Navbar.Collapse id="navbar-nav">
						<Nav className="ms-auto">
							<NavigationLink to="/projects">Projects</NavigationLink>
							<NavigationLink to="/blog">Blog</NavigationLink>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header;