import React from 'react'
import GoogleLogin from 'react-google-login';

function GoogleAuthentication() {

    function responseGoogle(res){
        console.log(res);
    }

    return (
        <GoogleLogin
        clientId="996666068144-dnpe7vti8mlruvc4mtiqflkvjq5vrhnq.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        />
    )
}

export default GoogleAuthentication;
