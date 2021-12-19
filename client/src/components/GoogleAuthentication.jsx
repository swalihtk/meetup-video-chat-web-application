import React from 'react'
import GoogleLogin from 'react-google-login';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

function GoogleAuthentication(props) {

    let {btnText, styleColor}=props;

    async function responseGoogle(res){
        if(!res.profileObj){
            swal("something went wrong!!", "ok", "error");
            return;
        }
        let data=res.profileObj;
        let body={
            email:data.email,
            profileImage:data.imageUrl,
            firstName:data.givenName,
            lastName:data.familyName
        };

        try{
            let response=await axios.post("/auth/login", body);
            let result=response.data;
            if(result.error){
                swal("something went wrong!!", "ok", "error");
            }else{
                window.location.reload();
            }
        }catch(e){
            swal("something went wrong!!", "ok", "error");
            return;
        }
    }

    return (
        // <GoogleLogin
        // clientId="996666068144-dnpe7vti8mlruvc4mtiqflkvjq5vrhnq.apps.googleusercontent.com"
        // buttonText="Login"
        // onSuccess={responseGoogle}
        // onFailure={responseGoogle}
        // cookiePolicy={'single_host_origin'}
        // />
        <GoogleLogin
            clientId="996666068144-dnpe7vti8mlruvc4mtiqflkvjq5vrhnq.apps.googleusercontent.com"
            render={renderProps => (
            <Button onClick={renderProps.onClick} disabled={renderProps.disabled} variant={styleColor} style={{fontWeight:"600"}}>{btnText}</Button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default GoogleAuthentication;
