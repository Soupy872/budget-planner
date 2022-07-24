import React, { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { AuthContext } from "../context/authContext";
import useAuth from '../hooks/useAuth';

const PageNavbar = () => {
    const [state, dispatch] = useContext(AuthContext);
    const { logout } = useAuth();

    return (
        <>
            <Navbar bg="dark" variant="dark" className="navbar">
                <Container>
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                
                <Navbar.Collapse className="justify-content-end me-4">
                    {state?.username ? (
                        <Nav>
                            <NavDropdown title={state?.username} id="basic-nav-dropdown">
                                <NavDropdown.Item id='logout' href="/login" onClick={async () => await logout()}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        
                    ) : (
                        <Nav>
                            <Nav.Link id='login' href="/login">Login</Nav.Link>
                            <Nav.Link id='register' href="/register">Register</Nav.Link>
                        </Nav>  
                    )}
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default PageNavbar;