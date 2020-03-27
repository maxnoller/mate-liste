import React, {Component} from 'react';
import {render} from 'react-dom';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class NavBar extends Component {
    
    render() {
      return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Navbar.Brand href="#home">
            <img alt="" src={"/static/newlogo.png"} width="30" height="30" className="d-inline-block align-top" />{' '}
            MateListe
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <LinkContainer to="/login/">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
      );
      
    }
    
  }
  
  export default NavBar;