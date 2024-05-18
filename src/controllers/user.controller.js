import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler( async (req, res)=> {
    //1. get user details from front end
    //2. validation - not empty
    //3. check if user already exist through email or username
    //4. check for images,check for avatar(compulsary)
    //5. upload them on cloudinary
    //6. create user object- create entry in db
    //7. remove password and refresh token from response
    //8. check for user creation
    //9. return response

    //1
    const {fullname, email, username, password} = req.body
    console.log("email: ", email)

    //2
    if (
        [fullname, email, username, password].some((field) =>
        field?.trim === "")
    ) {
        throw new ApiError(400, "all fields are required")
    }

    //3
    const existedUser = User.findOne({
        $or: [{ username },{ email }]
    })
    if (existedUser) {
        throw new ApiError(409, " user already exists ")
    }

    //4
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path
    if (!avatarLocalPath) {
        throw new ApiError(400, " Avatar file is required ")
    }

    //5
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(400, " Avatar file is required ")
    }

    //6
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase()
    })
    
    //7
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    //8
    if(!createdUser){
        throw new ApiError(500, "Something went wrong")
    }

    //9




})

export { registerUser }