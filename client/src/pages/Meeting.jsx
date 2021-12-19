import React, {useEffect, useState, useRef} from 'react'
import "../styles/Meeting.css";
import {Container} from "react-bootstrap";
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import MicNoneIcon from '@material-ui/icons/MicNone';
import MicOffIcon from '@material-ui/icons/MicOff';
import CallEndIcon from '@material-ui/icons/CallEnd';
import ChatIcon from '@material-ui/icons/Chat';
import peerjs from 'peerjs';
import socketioClient from 'socket.io-client';

function Meeting() {

    // own video
    let videoGrid=useRef();
    let [myVideoStream, setMyVideoStream]=useState(undefined);
    let myVideo=document.createElement("video");
    let [videoOn, setVideoOn]=useState(false);
    let [muteOn, setMuteOn]=useState(false);

    // setup camera
    useEffect(async()=>{
        let myStream=await window.navigator.mediaDevices.getUserMedia({audio:false, video:true});
        appendOwnVideoToDiv(myVideo, myStream);
        setMyVideoStream(myStream);
        setVideoOn(true);
        setMuteOn(true);

        let videosLength=document.getElementsByClassName("video").length;
        if(videosLength>1){
            document.getElementById("myVideo").classList+=" minimizeVideo";
        }
    }, [])

    useEffect(async()=>{

    }, [])


    // function for video appending (own video)
    function appendOwnVideoToDiv(video, stream){
        // video element setup
        video.srcObject=stream;
        video.addEventListener("loadedmetadata", ()=>video.play());
        
        // div creation and setup
        let div=document.createElement("div");
        div.setAttribute("class", "video");
        div.setAttribute("id", "myVideo")
        div.appendChild(video);

        // div appending to parent
        videoGrid.current.appendChild(div);
    }


    // handle video mute and audio mute
    function handleVideoMute(){
        if(myVideoStream.getVideoTracks()[0].enabled){
            myVideoStream.getVideoTracks()[0].enabled=false;
            setVideoOn(false);
        }else{
            myVideoStream.getVideoTracks()[0].enabled=true;
            setVideoOn(true);
        }
    }
    function handleAudioMute(){
        if(myVideoStream.getAudioTracks()[0].enabled){
            myVideoStream.getAudioTracks()[0].enabled=false;
            setMuteOn(true);
        }else{
            myVideoStream.getAudioTracks()[0].enabled=true;
            setMuteOn(false);
        }
    }


    return (
        <div className="meet__main">
            <Container>
                <div className="row">
                    <div className="col-12 meet__video" ref={videoGrid}>
                        {/* Videos appends here */}
                    </div>
                    <div className="col-12 meet__footer">
                        <div className="meet__details">
                            <p>Swalih | klsldklsdk</p>
                        </div>
                        <div className='meet__options'>
                            {
                            videoOn?
                             <VideocamOffIcon onClick={handleVideoMute} style={{cursor:"pointer"}}/>
                             :
                             <VideocamIcon onClick={handleVideoMute} style={{cursor:"pointer"}}/>
                            }
                            {
                                muteOn?
                                <MicOffIcon onClick={handleAudioMute} style={{cursor:"pointer"}}/>
                                :
                                <MicNoneIcon onClick={handleAudioMute} style={{cursor:"pointer"}}/>
                            }
                            
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
