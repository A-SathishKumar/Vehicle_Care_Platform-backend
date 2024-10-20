import express from "express";
import { db } from '../db-utils/db.connections.js';
import { mailoptions, transporter } from "../utils/mail-utils.js";
import { v4 } from 'uuid';

const BookingRouter = express.Router();
const BookingCollections = db.collection("Booking");

BookingRouter.post('/addbooking', async (req, res) => {
    const { serviceName, carBrand, carModel, date, timeSlot, email, vehicle, price, status, phone, name } = req.body;
    try {
        await BookingCollections.insertOne({
            id: v4(),
            serviceName,
            carBrand,
            carModel,
            vehicle,
            price,
            date,
            timeSlot,
            email,
            status,
            phone,
            bookedAt: new Date()
        });
        await transporter.sendMail({
            ...mailoptions,
            to: email,
            subject: `Booking Confirmation - ${serviceName}`,
            text: `Hello ${name} \n Thank you for booking with us! Your appointment for ${serviceName} has been confirmed. \n Appointment Details: \n
Date: ${date} \n
Time: ${timeSlot} \n
Service: ${serviceName} \n
Vehicle: ${vehicle} \n
Price: ${price} \n
We look forward to providing you with excellent service. Should you need to make any changes or have any questions, feel free to contact us. `
        });
        res.status(200).json({ msg: "Booking Added Successfully", success: true });
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Some Internal Issus, Please Try after some times", e, success: false })
    }
});



BookingRouter.post('/fetchBookings', async (req, res) => {
    const { email } = req.body;
    try {
        const response = await BookingCollections.find({ email }).toArray(); // Convert the cursor to an array
        if (response.length > 0) {
            res.status(200).json(response); // Return the results as a JSON response
        } else {
            res.status(404).json({ msg: "No Data Found" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error fetching data", error: error.message });
    }
});

export default BookingRouter;