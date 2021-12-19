import constants from "../constants/loginCheck";

const initState={
    loading:false,
    logedin:false,
    userInfo:{},
    error:""
}

const logedInCheckReducer=(state=initState, action)=>{
    switch(action.type){
        case constants.CHECK_LOGIN_FETCH:
            return {
                ...state,
                loading:true
            }

        case constants.CHECK_LOGIN_SUCCESS:
            return {
                loading:false,
                logedin:action.payload.login,
                userInfo:action.payload.user
            }

        case constants.CHECK_LOGIN_ERROR:
            return {
                loading:false,
                logedin:false,
                error:action.payload,
                userInfo:{}
            }

        default:
            return state;
    }
}

export default logedInCheckReducer;