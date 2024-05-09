import {Router} from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {getForm1, submittingForm1} from '../contollers/form1.controller.js'
import { submittingForm2, getForm2} from '../contollers/form2.controller.js'
import {getForm3, submittingForm3} from '../contollers/form3.controller.js'
import {getForm4, submittingForm4} from '../contollers/form4.controller.js'
import {getForm5, submittingForm5} from '../contollers/form5.controller.js'
import {getForm6, submittingForm6} from '../contollers/form6.controller.js'
import {getForm7, submittingForm7} from '../contollers/form7.controller.js'
import {getForm8, submittingForm8} from '../contollers/form8.controller.js'
import {getFinal} from '../contollers/final.controller.js'
import { upload } from "../middlewares/multer.middleware.js";
const router =Router()

router.route("/gettingform1").get(verifyJWT, getForm1)
router.route("/submittingform1").post(verifyJWT,upload.fields([
    {
        name: "updateimage",
        maxCount: 1
    }, 
    {
        name: "updateidproof",
        maxCount: 1
    }
]),submittingForm1);

router.route("/gettingform2").get(verifyJWT,getForm2);
router.route("/submittingform2").post(verifyJWT,submittingForm2);

router.route("/gettingform3").get(verifyJWT,getForm3);
router.route("/submittingform3").post(verifyJWT,submittingForm3);

router.route("/gettingform4").get(verifyJWT,getForm4);
router.route("/submittingform4").post(verifyJWT,submittingForm4);

router.route("/gettingform5").get(verifyJWT,getForm5);
router.route("/submittingform5").post(verifyJWT,submittingForm5);


router.route("/gettingform6").get(verifyJWT,getForm6);
router.route("/submittingform6").post(verifyJWT,submittingForm6);


router.route("/gettingform7").get(verifyJWT,getForm7);

router.route("/gettingfinal").get(verifyJWT,getFinal);

router.route("/submittingform7").post(verifyJWT,submittingForm7);


router.route("/gettingform8").get(verifyJWT,getForm8);
router.route("/submittingform8").post(verifyJWT,upload.fields([
    {
        name: "researchpapers",
        maxCount: 1
    }, 
    {
        name: "phdcertificate",
        maxCount: 1
    },
    {
        name: "pgdocument",
        maxCount: 1
    },
    {
        name: "ugdocument",
        maxCount: 1
    },
    {
        name: "twelvedocument",
        maxCount: 1
    },
    {
        name: "tendocument",
        maxCount: 1
    },
    {
        name: "payslip",
        maxCount: 1
    },
    {
        name: "undertaking",
        maxCount: 1
    },
    {
        name: "phdexperience",
        maxCount: 1
    },
    {
        name: "anyotherdocument",
        maxCount: 1
    },
    {
        name:"signature",
        maxCount:1
    }
]),submittingForm8);



export default router;