import React from 'react'
import {Navbar, Button, Nav, Container} from 'react-bootstrap';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GoogleAuthentication from '../components/GoogleAuthentication';

function NavigationBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
            <Navbar.Brand href="#home">Meet-up</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
                
                <Button variant="outline-primary" style={{marginLeft:"10px", marginTop:"5px"}}>
                <ExitToAppIcon/> Join Meeting
                </Button>
                <Button style={{marginLeft:"10px", marginTop:"5px"}}>
                Create Meeting
                </Button>
            </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;
