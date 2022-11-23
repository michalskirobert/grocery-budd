import { MENU_HELPER } from "@store/utils";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Navbar,
} from "reactstrap";

export const Navigation = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const toggle = () => setIsNavOpen(!isNavOpen);
  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="me-auto">
          Grocery budd
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="me-2" />
        <Collapse isOpen={isNavOpen} navbar>
          <Nav navbar>
            {MENU_HELPER.map(({ path, title }) => (
              <NavItem>
                <NavLink {...{ to: path }}>{title}</NavLink>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
