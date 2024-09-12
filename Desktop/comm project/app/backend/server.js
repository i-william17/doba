import express, { application } from "express"
import cors from "cors"
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import itemRoute from "./routes/itemRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import mpesaRouter from "./routes/mpesaRoute.js";
import orderRouter from "./routes/orderRoute.js";

console.log(process.env.JWT_SECRET)


//app config 
const app = express();
const port = 3500;


//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());  

//Database
connectDB();

//Api endpoint
app.use("/api/item", itemRoute)
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/mpesa",mpesaRouter)
app.use("/api/order",orderRouter)

 
app.get("/",(req,res)=>{
    res.send("API on toes")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

//mongo