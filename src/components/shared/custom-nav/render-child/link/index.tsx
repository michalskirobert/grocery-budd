import { Nav } from "react-bootstrap";

export const Link = ({ content, eventKey }) => {
  return (
    <Nav.Item>
      <Nav.Link {...{ eventKey }}>{content}</Nav.Link>
    </Nav.Item>
  );
};
