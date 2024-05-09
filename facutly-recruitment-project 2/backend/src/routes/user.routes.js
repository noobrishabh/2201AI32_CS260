import {Router} from "express";
import { registerUser ,loginUser, logoutUser,  refreshAccessToken, changeCurrentPassword, getCurrentUser, isLoggedIn, resetUserPassword, resetUserPasswordChange} from "../contollers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"
const router =Router()


router.route("/register").post(registerUser)

router.route("/login").post((loginUser))

//secure routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/reset-password").post(resetUserPassword)
router.route("/reset-password-change/:id/:token").post(resetUserPasswordChange)
router.route("/isloggedin").post(isLoggedIn)
// router.route("/form1").post(
//     upload.fields([
//         {
//             name: "updateidproof",
//             maxCount: 1
//         }, 
//         {
//             name: "updateimage",
//             maxCount: 1
//         }
//     ]),
//     submittingForm1
// )
export default router;