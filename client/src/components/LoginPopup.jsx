import React from 'react'
import { Modal } from 'react-bootstrap';
import GoogleAuthentication from './GoogleAuthentication';

function LoginPopup() {
    return (
        <Modal
        show={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Please login to continue!!</h4>
        <div className='text-center mt-3'>
        <GoogleAuthentication btnText="Login" style={{padding:"3px 70px"}}/>
        </div>
      </Modal.Body>
    </Modal>
    )
}

export default LoginPopup;
