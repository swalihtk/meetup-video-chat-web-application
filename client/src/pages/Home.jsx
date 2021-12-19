import React, { useEffect, useState } from 'react'
import NavigationBar from '../layouts/NavigationBar';
import {Button, Container, Spinner} from 'react-bootstrap';
import VideocamIcon from '@material-ui/icons/Videocam';
import PowerInputIcon from '@material-ui/icons/PowerInput';
import "../styles/Home.css";
import GoogleAuthentication from '../components/GoogleAuthentication';
import { useDispatch, useSelector } from 'react-redux';
import checkUserLogedIn from "../actions/checkLogin";
import roomAction from "../actions/roomAction";
import { useNavigate } from 'react-router';

function Home() {

    // checking user logedin or not
    let {loading, userInfo, error, logedin}=useSelector(state=>state.logedIn);
    let dispatch=useDispatch();

    useEffect(()=>{
        dispatch(checkUserLogedIn());
    }, [])

    // join, create action
    let navigate=useNavigate();
    let [joinId, setJoinId]=useState("");

    function handleCreateRoom(){
        if(!logedin){
            return;
        }
        roomAction.createMeeting(navigate);
    }
    function handleJoinRoom(){
        if(!logedin){
            return;
        }
        if(joinId.length<9){
            return;
        }

        roomAction.joinMeeting(navigate, joinId);
    }

    // ************** RENDER PAGE *********
    if(loading){
        return (
            <div className='page__loading'>
                <div>
                <Spinner animation="grow" variant="info"/>
                <p>loading..</p>
                </div>
            </div>
        )
    }
    return (
        <>
        <NavigationBar />
        <div className='home'>
            <Container>
                <div className='row'>
                    <div className="col-12 col-md-6 home_leftside">
                        <h1>Premium video meetings for everyone.</h1>
                        <p>We re-engineered the service that we built for secure, high-quality business meetings, Google Meet, to make it available for all, on any device.</p>

                        {/* <div className='home__googleLogin'>
                            <GoogleAuthentication style={{padding:"5px 30px"}}/>
                        </div> */}
                        <div className='home__btns'>
                            <div>
                            <Button onClick={handleCreateRoom}><VideocamIcon/> Start Meeting</Button>
                            </div>
                            <span style={{fontWeight:"500"}}>or</span>
                            <div className='join__div'>
                            <div className='join_input'>
                                <PowerInputIcon/>
                                <input type="text" placeholder='Meeting Code' value={joinId} onChange={e=>setJoinId(e.target.value)}/>
                            </div>
                            <Button onClick={handleJoinRoom} variant='light' style={{fontWeight:"500"}}>Join</Button>
                            </div>
                        </div>
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
