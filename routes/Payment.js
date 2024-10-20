import express from "express";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const paymentRouter = express.Router();
paymentRouter.post("/checkout",async (req,res)=>{
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.FE_URL/payment-success`,
      cancel_url: `${process.env.FE_URL}/payment-cancel`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default paymentRouter;
