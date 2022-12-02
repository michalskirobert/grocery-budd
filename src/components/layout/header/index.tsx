import { Navbar, Container, Offcanvas, Nav } from "react-bootstrap";

import Select from "react-select";
import { useHeaderService } from "./service";
import { setNav } from "./utils";

import * as S from "./styles";

export const Menu = () => {
  const { configApp, user } = useHeaderService();
  return !!user ? (
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
                <S.Avatar src={`${user?.profilePicture}`} />
                {user?.email}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {setNav(!!user?.accessToken).map(({ path, title }) => (
                  <Nav.Link key={title} href={path}>
                    {title}
                  </Nav.Link>
                ))}
              </Nav>
              <Select
                {...{
                  options: configApp?.languages || [],
                  value: user?.language || configApp?.languages[0],
                  onChange: (option) => console.log(option),
                }}
              />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  ) : null;
};
