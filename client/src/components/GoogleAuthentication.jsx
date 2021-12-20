import React from 'react'
import GoogleLogin from 'react-google-login';
import {Button, Spinner} from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

function GoogleAuthentication(props) {

    let {btnText, styleColor, style}=props;
    let [googleAuthSecret, setGoogleAuthSecret]=React.useState("");
    let [loading, setLoading]=React.useState(false);
    

    React.useEffect(async ()=>{
        try{   
            setLoading(true);
            let response=await axios.get("/auth/googleAuthSecret");
            let data=response.data;
            setLoading(false);
            if(data.key){
                setGoogleAuthSecret(data.key);
            }
        }catch(e){
            setLoading(false);
            return;
        }
    }, [])

    async function responseGoogle(res){
        console.log(res);
        if(!res.profileObj){
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
                return;
            }else{
                window.location.reload();
            }
        }catch(e){
            return;
        }
    }

    let demo=true;

    return (
        <>
        {
            !googleAuthSecret?
            <Spinner animation='border' variant="primary"/>
            :
            <GoogleLogin
            clientId={googleAuthSecret}
            render={renderProps => (
            <Button onClick={renderProps.onClick} disabled={renderProps.disabled} variant={styleColor} style={style}>{btnText}</Button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            />
        }
        </>
    )
}

export default GoogleAuthentication;
