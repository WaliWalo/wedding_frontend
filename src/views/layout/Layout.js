import { Outlet, Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { Container, NavDropdown, Navbar } from "react-bootstrap";
const Layout = () => {
  return (
    <>
      {/* <Navbar className="mainBgColour p-2 d-flex justify-content-between">
          <Nav className="" activeKey="/home">
            <Nav.Item>
              <Link to="/" className="text-decoration-none secondaryFontColor active font-weight-bold">Home</Link>
            </Nav.Item>
            <Nav.Item className="mx-2">
              <Link to="/gallery" className="text-decoration-none secondaryFontColor font-weight-bold">Gallery</Link>
            </Nav.Item>
          </Nav>
      </Navbar> */}
      <Container className="p-3">
        <Outlet />
      </Container>
    </>
  )
};

export default Layout;