import {ApiResponse} from "../utils/api-response.js";
const healtcheck=(req,res)=>{
    try {
        res.status(200).json(
           new ApiResponse(200,{message:"server is running"})
        )
    } catch (error) {
        
    }
}
export {healtcheck};