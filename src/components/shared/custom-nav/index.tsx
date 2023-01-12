import { Nav } from "react-bootstrap";
import { Col, Label, Row } from "reactstrap";
import { RenderChild } from "./render-child";

export const CustomNav = ({ nav, handleButtons }) => {
  return (
    <Nav
      {...{
        variant: "pills",
        className: "justify-content-center",
        activeKey: "search",
        onSelect: (action) => handleButtons(action),
      }}
    >
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
