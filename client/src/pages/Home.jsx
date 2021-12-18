import React from 'react'
import NavigationBar from '../layouts/NavigationBar';
import {Button, Container} from 'react-bootstrap';
import VideocamIcon from '@material-ui/icons/Videocam';
import PowerInputIcon from '@material-ui/icons/PowerInput';
import "../styles/Home.css";
import GoogleAuthentication from '../components/GoogleAuthentication';

function Home() {
    return (
        <>
        <NavigationBar />
        <div className='home'>
            <Container>
                <div className='row'>
                    <div className="col-12 col-md-6 home_leftside">
                        <h1>Premium video meetings for everyone.</h1>
                        <p>We re-engineered the service that we built for secure, high-quality business meetings, Google Meet, to make it available for all, on any device.</p>

                        <div className='home__googleLogin'>
                            <GoogleAuthentication style={{padding:"5px 30px"}}/>
                        </div>
                        {/* <div className='home__btns'>
                            <div>
                            <Button><VideocamIcon/> Start Meeting</Button>
                            
                            </div>
                            <span style={{fontWeight:"500"}}>or</span>
                            <div className='join__div'>
                            <div className='join_input'>
                                <PowerInputIcon/>
                                <input type="text" placeholder='Meeting Code'/>
                            </div>
                            <Button variant='light' style={{fontWeight:"500"}}>Join</Button>
                            </div>
                        </div> */}
                    </div>
                    <div className="col-12 col-md-6 home__rightside">
                        <img src="https://images.news18.com/ibnlive/uploads/2019/02/Skype-background-blur.png?im=Resize,width=360,aspect=fit,type=normal?im=Resize,width=320,aspect=fit,type=normal" alt="" />
                    </div>
                </div>
            </Container>
        </div>
        </>
    )
}

export default Home
