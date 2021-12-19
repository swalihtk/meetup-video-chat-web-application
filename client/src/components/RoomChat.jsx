import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import SendIcon from '@material-ui/icons/Send';

function RoomChat(props) {
    let {showChatForm, setShowChatForm, socketio, roomId, username}=props;

    let [chatText, setChatText]=useState("");
    let chatBodyRef=useRef();

    let [messages, setMessages]=useState([]);

    // setup chat reciver
    useEffect(()=>{
        let count=0;
        socketio.on("recive-chat", (username, chatText)=>{
            if(count<1){
                setMessages((prev)=>[...prev, {username, chatText}])
            }
            count++;
        })
        
    }, [socketio])

   

    function handleChat(e){
        e.preventDefault();
        if(!chatText) return;
        
        setMessages((prev)=>[...prev, {username, chatText}])
        socketio.emit("user-chat", roomId, username,chatText);
        setChatText("");
    }



    return (
        <Modal
        show={showChatForm}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={()=>setShowChatForm(false)}
        >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Chat
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='chat__main'>
        <div className='chat__body' ref={chatBodyRef}>
           {/* Chats are come here... */}
           {
               messages.map((item, index)=>{
                   return (
                       <div className='chat__message' key={index}>
                           <p><strong>{item.username}: </strong>{item.chatText}</p>
                       </div>
                   )
               })
           }
        </div>
        <div className='chat__input'>
            <form onSubmit={handleChat}>
            <input type="text" value={chatText} onChange={(e)=>setChatText(e.target.value)}/>
            <button type="submit"><SendIcon /></button>
            </form>
        </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>setShowChatForm(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default RoomChat
