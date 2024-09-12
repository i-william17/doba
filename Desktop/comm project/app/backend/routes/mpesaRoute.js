import express from "express"
import {createToken,stkPush} from "../controllers/mpesa.js"

const mpesaRouter = express.Router()
const app = express()
app.use(express.json());

mpesaRouter.post("/token",createToken,stkPush)

export default mpesaRouter 