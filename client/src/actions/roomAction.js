import axios from "axios";

const helpers={
    createMeeting:async function(navigate){
        try{
            let response=await axios.get("/peer/roomId");
            let responseData=response.data;

            if(!responseData.videoId){
                return;
            }

            window.location.assign(`/room/${responseData.videoId}`);
            // navigate(`/room/${responseData.videoId}`);
        }catch(e){
            return;
        }
    },

    joinMeeting:async function(navigate, joinId){
        try{
            // navigate(`/room/${joinId}`);
            window.location.assign(`/room/${joinId}`);
        }catch(e){
            return;
        }
    }
}

export default helpers;