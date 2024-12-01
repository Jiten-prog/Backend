import { Router } from "express";
import { registeruser } from "../controllers/user.js";
import { upload } from "../middlewares/fileupload.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverimage",
            maxCount: 2
        }
    ]),
    registeruser)

export default router