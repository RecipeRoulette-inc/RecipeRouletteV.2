// libraries
import styled from "styled-components";
import { NavLink } from "react-router-dom";

//custom hooks
import useAuth from "../hooks/useAuth";

const Navigation = () => {
  const { onLogout } = useAuth();

  return (
    <Nav>
      <NavLink to='/home'>Home</NavLink>
      <NavLink to='/home'>Home</NavLink>
      {
        token && (
        <Button type='button' onClick={onLogout}>
          Sign Out
        </Button>
        )
      }
      <button>
        profile page
      </button>
    </Nav>
  );
};

const Nav = styled.nav``;

const Button = styled.button``;