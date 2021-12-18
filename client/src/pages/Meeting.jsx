import React from 'react'
import "../styles/Meeting.css";
import {Container} from "react-bootstrap";
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import MicNoneIcon from '@material-ui/icons/MicNone';
import MicOffIcon from '@material-ui/icons/MicOff';
import CallEndIcon from '@material-ui/icons/CallEnd';
import ChatIcon from '@material-ui/icons/Chat';

function Meeting() {
    return (
        <div className="meet__main">
            <Container>
                <div className="row">
                    <div className="col-12 meet__video">
                        <div className='video'>
                            <img src="https://elements-cover-images-0.imgix.net/821208ca-2d4e-414c-92f6-e4994160d7c1?auto=compress%2Cformat&fit=max&w=710&s=36db30049345a05b33b7226f94fd3db4" alt="" />
                        </div>
                    </div>
                    <div className="col-12 meet__footer">
                        <div className="meet__details">
                            <p>Swalih | klsldklsdk</p>
                        </div>
                        <div className='meet__options'>
                            <VideocamOffIcon/>
                            <MicOffIcon />
                            <CallEndIcon style={{color:"red"}}/>
                        </div>
                        <div className='meet__chat'>
                            <ChatIcon />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Meeting
