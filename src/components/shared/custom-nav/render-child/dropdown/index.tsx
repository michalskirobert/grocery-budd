import React from "react";
import { NavDropdown } from "react-bootstrap";

export const Dropdown = ({ content, options }) => {
  return (
    <NavDropdown {...{ id: content, title: content }}>
      {options.map(({ content, eventKey }) => (
        <NavDropdown.Item {...{ eventKey }}>{content}</NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};
