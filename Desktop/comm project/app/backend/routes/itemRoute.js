import express from "express"
import { addItem, listItems, removeItem } from '../controllers/itemController.js'
import multer from 'multer'

const itemRoute = express.Router();

//image storage eng
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})
   
itemRoute.post("/add",upload.single("image"),addItem);
itemRoute.get("/list",listItems);
itemRoute.post("/remove", removeItem);


export default itemRoute;

