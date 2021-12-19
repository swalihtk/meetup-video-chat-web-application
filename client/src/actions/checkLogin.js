import axios from 'axios';
import loginCheckConstants from '../redux/constants/loginCheck';

function checkUserLogedIn(){
    return async (dispatch)=>{
        try{
            dispatch({type:loginCheckConstants.CHECK_LOGIN_FETCH});
            let response=await axios.get("/auth/check_login");
            let data=response.data;
            if(data.error){
                dispatch({type:loginCheckConstants.CHECK_LOGIN_ERROR, payload:data.error});
                return;
            }
            

            dispatch({type:loginCheckConstants.CHECK_LOGIN_SUCCESS, payload:data});
            
        }catch(e){
            dispatch({type:loginCheckConstants.CHECK_LOGIN_ERROR, payload:e.message});
        }
    }
}

export default checkUserLogedIn;