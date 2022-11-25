import { MENU_HELPER } from "@store/utils";
import { Navbar, Container, Offcanvas, Nav } from "react-bootstrap";

import Select from "react-select";

export const Menu = () => {
  return (
    <div>
      <Navbar bg="light" expand={false} className="mb-3" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/">Grocery budd</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {MENU_HELPER.map(({ path, title }) => (
                  <Nav.Link key={path} href={path}>
                    {title}
                  </Nav.Link>
                ))}
              </Nav>
              <Select
                {...{
                  options: [{ label: "English", value: "Eng" }],
                  value: { label: "English", value: "Eng" },
                }}
              />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
};
