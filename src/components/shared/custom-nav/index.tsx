import { Nav } from "react-bootstrap";
import { Col, Label, Row } from "reactstrap";
import { RenderChild } from "./render-child";

export const CustomNav = ({ nav }) => {
  return (
    <Nav variant="pills" className="justify-content-center" activeKey="1">
      <Row>
        {nav.map(({ content, type, label, eventKey, options }) => (
          <Col>
            <Label>{label || ""}</Label>
            <RenderChild
              key={content}
              {...{ content, type, eventKey, options }}
            />
          </Col>
        ))}
      </Row>
    </Nav>
  );
};
