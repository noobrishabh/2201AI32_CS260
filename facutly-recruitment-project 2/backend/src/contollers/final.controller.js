import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getFinal = asyncHandler(async (req, res) => {
    const user=req.user;
    // const form1Data = await Form1.findOne({ owner:user._id });
    // console.log(form1Data);
    
    
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            {user},
            "User fetched successfully"
        ))
})



export {  getFinal }