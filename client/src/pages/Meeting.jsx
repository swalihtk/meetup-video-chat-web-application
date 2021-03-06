import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react'
import "../styles/Meeting.css";
import {Container, Spinner} from "react-bootstrap";
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import MicNoneIcon from '@material-ui/icons/MicNone';
import MicOffIcon from '@material-ui/icons/MicOff';
import CallEndIcon from '@material-ui/icons/CallEnd';
import ChatIcon from '@material-ui/icons/Chat';
import Peer from 'peerjs';
import socketIoClient from 'socket.io-client';

import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import checkUserLogedIn from "../actions/checkLogin";
import LoginPopup from '../components/LoginPopup';
import RoomChat from '../components/RoomChat';
import swal from 'sweetalert';

function Meeting() {   


    // ******************* Login Check *********
    let {loading, userInfo, error, logedin}=useSelector(state=>state.logedIn);
    let [camLoading, setCamLoading]=useState(false);
    let dispatch=useDispatch();

    useEffect(()=>{
        dispatch(checkUserLogedIn());
    }, [])

    // ************** Video CAll Setup *********
    let videoGrid=useRef();
    let [myVideoStream, setMyVideoStream]=useState(undefined);
    let [videoOn, setVideoOn]=useState(false);
    let [muteOn, setMuteOn]=useState(false);
    let [callState, setCallState]=useState(undefined);
    let [myPeerId, setMyPeerId]=useState("");
    let myVideo=document.createElement("video");

    // video call permission
    let [permissionStatus, setPermissionStatus]=useState(undefined);
    let [permissionState, setPermissionState]=useState(undefined);

    // roomId
    let {id:roomId}=useParams();
    

    // peer and socketio setup 
    let socketIo=socketIoClient("https://v1.meetup.swaliht.tech/", { transports : ['websocket'] });
    let peer=new Peer();
  
    useEffect(async()=>{
        // if(!logedin) return;
        peer.on("open", (id)=>{
            setMyPeerId(id);
            // adding id to div for remove when user disconnected
            socketIo.emit("create-room", id, roomId);
        })
    }, [])

    // setup camera permission
    navigator.permissions.query({name: "camera"}).then(response=>{
            response.addEventListener("change", ()=>{
                setPermissionState(response.state)
            })
    })

    useCallback(()=>{
        setPermissionStatus(permissionState);
    }, [permissionState])

   
   
    useEffect(async()=>{
        // if(!logedin) return;
        
            try{
                setCamLoading(true);
                let myStream=await window.navigator.mediaDevices.getUserMedia({audio:false, video:true});
                setMyVideoStream(myStream);
                setVideoOn(true);
                // answering to call
                answerToCall(myStream);
                
                // calling and socket connnection
                socketIo.on("join-user", (userId)=>{
                    callToUser(userId, myStream);
                    console.log("User Join");
                }) 
                
            }catch(e){
                return;
            }
    
    }, [permissionStatus])

    // check videogrid null or not
    let haveGrid=useCallback(()=>{
        if(!videoGrid.current) return;
        appendOwnVideoToDiv(myVideo, myVideoStream);
        setCamLoading(false);
    }, [videoGrid.current])

    useEffect(()=>{
        if(!myVideoStream) return;
        console.log(myVideoStream);
        haveGrid();
    }, [myVideoStream, haveGrid])
    

    // remove uservideo when disconnected
    useEffect(()=>{
        socketIo.on("user-disconnected", (userId)=>{
            window.location.reload();
        })
    }, [socketIo])

    // checking videos length
    function setVideoResponsive(){
        let videosLength=document.getElementsByClassName("video").length;
        if(videosLength>1){
            document.getElementById("myVideo").classList+=" minimizeVideo";
        }
    }

    // calling to user
    function callToUser(userId, mediaStream){
        // if(!mediaStream) return;
        const call = peer.call(userId,mediaStream);

        call.on("stream", stream=>{
            let video=document.createElement("video");
            appendOthersVideoToDiv(video,stream)
            setVideoResponsive();
        })
        setCallState(call);

    }

    // answering to call
    function answerToCall(mediaStream){
        peer.on('call', function(call) {
            // Answer the call, providing our mediaStream
            call.answer(mediaStream);

            call.on('stream', function(stream) {
                // `stream` is the MediaStream of the remote peer.
                // Here you'd add it to an HTML video/canvas element.
                let video=document.createElement("video");
                appendOthersVideoToDiv(video, stream);

                setVideoResponsive();
              });
          });
    }

    // function for video appending (own video)
    function appendOwnVideoToDiv(video, stream){
        let myDiv=document.createElement("div");

        // video element setup
        video.srcObject=stream;
        video.addEventListener("loadedmetadata", ()=>video.play());

        // div creation and setup
        myDiv.setAttribute("class", "video");
        myDiv.setAttribute("id", "myVideo")
        myDiv.appendChild(video);
        // div appending to parent

        if(!videoGrid.current) return;
        videoGrid.current.appendChild(myDiv);
    }

    // function for video appending (roomates video)
    function appendOthersVideoToDiv(video, stream){
        // video element setup
        video.srcObject=stream;
        video.addEventListener("loadedmetadata", ()=>video.play());

         // div creation and setup
         let div=document.createElement("div");
         div.setAttribute("class", "video");
         div.appendChild(video);
 
         // div appending to parent
         videoGrid.current.appendChild(div);
    }

    // handle video mute and audio mute
    function handleVideoMute(){

        if(!myVideoStream) return;

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
    function handleCallClose(){
        if(!callState) return;
        callState.close();
        socketIo.emit("call-end", myPeerId, roomId);
        window.location.assign("/");
    }

    // ******* chat manage ******
    let [showChatForm, setShowChatForm]=useState(false);
    
    // ************* test ******
 

    // ********** rendering ***********
    if(loading){
        return (
            <div className='page__loading'>
                <div>
                <Spinner animation="border" variant="info"/>
                <p>loading..</p>
                </div>
            </div>
        )
    }

    // if(!logedin){
    //     return (
    //         <div className='meet__main'>
    //             <LoginPopup />
    //         </div>
    //     )
    // }

    return (
        <>
        <RoomChat showChatForm={showChatForm} setShowChatForm={setShowChatForm} socketio={socketIo} username={userInfo.firstName} roomId={roomId}/>
        <div className="meet__main">
            <Container>
                <div className="row" id="demo">
                    <div className="col-12 meet__video" ref={videoGrid} id="video__grid">
                        {/* Videos appends here */}
                        {
                            camLoading&&(
                                <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"8px"}}>
                                    <Spinner animation='border' variant='danger' />
                                    <p style={{color:"white"}}>Camera Loading..</p>
                                </div>
                            )
                        }
                    </div>
                    <div className="col-12 meet__footer">
                        <div className="meet__details">
                            <p>{userInfo.firstName}  |  {roomId}</p>
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
                            
                            <CallEndIcon style={{color:"red", cursor:"pointer"}} onClick={handleCallClose}/>
                        </div>
                        <div className='meet__chat'>
                            <ChatIcon style={{cursor:"pointer"}} onClick={()=>setShowChatForm(true)}/>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
        </>
    )
}

export default Meeting
