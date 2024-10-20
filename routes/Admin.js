import express from "express";
import { db } from '../db-utils/db.connections.js';
import { mailoptions,transporter } from "../utils/mail-utils.js";
const AdminRouter = express.Router();
const userCollections = db.collection("Users");
const BookingCollections = db.collection("Booking");

AdminRouter.get('/fetchusers', async (req, res) => {
    try {
        const response = await userCollections.find().toArray(); // Convert the cursor to an array
        if (response.length > 0) {
            res.status(200).json(response); // Return the results as a JSON response
        } else {
            res.status(404).json({ msg: "No Data Found" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error fetching data", error: error.message });
    }
});
// Bookings API - Get all bookings
AdminRouter.get('/fetchbookings', async (req, res) => {
    const { email, sortBy } = req.query; // For filtering and sorting

    try {
        let query = {};

        if (email) {
            query.email = { $regex: email, $options: 'i' }; // Case-insensitive search by email
        }

        let bookings = await BookingCollections.find(query).toArray();

        if (sortBy === 'status') {
            bookings = bookings.sort((a, b) => a.status.localeCompare(b.status));
        } else if (sortBy === 'date') {
            bookings = bookings.sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
        }

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
});

AdminRouter.post('/editstatus', async (req, res) => {
    const { bookingId } = req.body;
    try {
        await BookingCollections.updateOne({ id: bookingId }, { $set: { status: "Completed" } });
        res.status(200).json({ msg: "Booking Marked as Completed" });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
});

AdminRouter.post('/notification/send', async (req, res) => {
    const { subject, content } = req.body;
    try {
        // Get the list of users from your database
        const users = await userCollections.find().toArray(); // Adjust according to your DB structure
        const emailPromises = users.map((user) => {
            return transporter.sendMail({
                ...mailoptions,
                to: user.email,
                subject: subject,
                text: content,
            });
        });

        await Promise.all(emailPromises); // Send emails in parallel
        res.status(200).json({ message: 'Notifications sent successfully!',ok:true});
    } catch (error) {
        res.status(500).json({ message: 'Error sending notifications', error });
    }
});
export default AdminRouter;