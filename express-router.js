import express from 'express';
import cors from 'cors';
import { ConnectToDB } from './db-utils/db.connections.js';
import UserRouter from './routes/Users.js';
import ServiceRouter from './routes/Service.js';
import BookingRouter from './routes/Bookings.js';
import AdminRouter from './routes/Admin.js';
import paymentRouter from './routes/Payment.js';

const server = express()
server.use(express.json());
server.use(cors());

server.use('/users',UserRouter);
server.use('/service',ServiceRouter);
server.use('/booking',BookingRouter);
server.use('/admin',AdminRouter);
server.use('/payment',paymentRouter);

const PORT = 4500;
await ConnectToDB();
server.listen(PORT,()=>{
    console.log("Server Listing on ",PORT);
});