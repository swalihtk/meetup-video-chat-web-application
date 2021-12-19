import axios from "axios";

const helpers={
    createMeeting:async function(navigate){
        try{
            let response=await axios.get("/peer/roomId");
            let responseData=response.data;

            if(!responseData.videoId){
                return;
            }

            navigate(`/room/${responseData.videoId}`);
        }catch(e){
            return;
        }
    },

    joinMeeting:async function(navigate, joinId){
        try{
            navigate(`/room/${joinId}`);
        }catch(e){
            return;
        }
    }
}

export default helpers;