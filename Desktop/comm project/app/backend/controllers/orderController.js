import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    // Validate request body
    const { userId, items, amount, address } = req.body;
    if (!userId || !items || !amount || !address) {
      return res.status(400).json({ success: false, message: "Invalid input data" });
    }

    // Create a new order
    const newOrder = new orderModel({
      userId:req.body.userId,
      items:req.body.items,
      amount:req.body.amount,
      address:req.body.address,
    });

    await newOrder.save();

    // Clear the user's cart
    await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});

    // Create line items for Stripe
    /*
    const line_items = items.map((item) => ({
      price_data: {
        currency: "ksh",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "ksh",
        product_data: { name: "Delivery Charges" },
        unit_amount: 2 * 135,
      },
      quantity: 1,
    });

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
    */
  } catch (error) {
    console.log("Error placing order:", error);
    res.json({ success: false, message: " Error" });
  }
    

};

const verifyOrder = async (req,res) => {
  const { orderId,success } = req.body;

  try {
    if (success==="true") {
      await orderModel.findByIdAndUpdate(orderId, {payment:true});
      res.json({success:true, message:"Paid Successfully"});

    } else {
      await orderModel.findByIdAndUpdate(orderId);
      res.json({success:false, message:"Payment Failed"});
    }
  }

  catch (error) {
    console.log("Error verifying order:", error);
    res.json({ success: false, message: "Error" });
  }
}

const userOrders = async (req,res) => {

  try {
    const orders = await orderModel.find({userId:req.body.userId});
    res.json({success:true, data:orders});
  }

  catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}


export { placeOrder,verifyOrder,userOrders};
 