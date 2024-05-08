import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";
import logo from "../images/logo2.png";

function Header() {
  return (
    <MainHeader>
      <NavLink to="/">
        <img src={logo} alt="logo img" className="logo" />
      </NavLink>
      <Nav />
    </MainHeader>
  );
}

const MainHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 5rem;
  height: 8rem;
  background-color: ${({ theme }) => theme.colors.bg};

  .logo {
    height: 5rem;
    mix-blend-mode: darken;
  }
`;

export default Header;
