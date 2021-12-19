import React, { useEffect, useState } from 'react'
import {Navbar, Button, Nav, Container} from 'react-bootstrap';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GoogleAuthentication from '../components/GoogleAuthentication';
import VideocamIcon from '@material-ui/icons/Videocam';
import { useSelector } from 'react-redux';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import camIcon from "../styles/cameIcon.jpeg";

function NavigationBar() {

    let {logedin, userInfo}=useSelector(state=>state.logedIn);

    let [currentDate, setCurrentDate]=useState("");

    useEffect(()=>{
        let date=new Date();
        let splitDate=date.toString().split(" ");
        let minute=(date.getMinutes()<10?'0':'')+ date.getMinutes();
        let hour=(date.getHours()<10?'0':'')+date.getHours();
        let dateFormate=hour+":"+minute+" "+splitDate[0]+", "+splitDate[2]+" "+splitDate[1];
        setCurrentDate(dateFormate);
    }, [])


    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                
            <Navbar.Brand href="#home" style={{display:"flex", alignItems:"center"}}>
                <div style={{width:"60px", height:"50px", marginRight:"10px"}}>
                    <img src={camIcon} alt="" style={{width:"100%", height:"100%"}}/>
                </div>
                <span style={{fontWeight:"600"}}>Meet-up</span>
                </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav style={{alignItems:"center"}}>
                {
                logedin?
                (
                <>
                 <Navbar.Text style={{color:"#5f6368"}}>
                    {currentDate}
                </Navbar.Text>
                <Button variant='light' style={{marginLeft:"10px", color:"#5f6368"}}>
                    <HelpOutlineOutlinedIcon />
                </Button>
                <Button variant='light' style={{marginLeft:"10px", color:"#5f6368"}}>
                    <FeedbackOutlinedIcon/>
                </Button>
                <Button variant='light' style={{marginLeft:"10px", color:"#5f6368"}}>
                    <SettingsOutlinedIcon />
                </Button>
                <div className='userImg'>
                    <img src={userInfo.profileImage} alt="" />
                </div>
                </>
                )
                :
                (
                <>
                <GoogleAuthentication styleColor="light" btnText={(<>Login</>)}/>
                <Button variant="outline-primary" style={{marginLeft:"10px", marginTop:"5px"}}>
                <ExitToAppIcon/> Join Meeting
                </Button>
                <Button style={{marginLeft:"10px", marginTop:"5px"}}>
                Create Meeting
                </Button>
                </>
                )
                }
            </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;
