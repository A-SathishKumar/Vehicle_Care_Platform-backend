import express from "express";
const ServiceRouter = express.Router();

//fetch Service from DB

const services = [
  {
    _id: '1',
    title: 'Oil Change',
    description: 'Comprehensive oil change service with high-quality oils.',
    price: 50,
    category: 'Maintenance',
    duration: '30 mins',
    image: 'oil-change.jpg',
    ratings: 4.5,
    reviews: 120,
    availability: 'Available'
  },
  {
    _id: '2',
    title: 'Tire Replacement',
    description: 'Tire replacement with alignment check.',
    price: 100,
    category: 'Repair',
    duration: '1 hour',
    image: 'tire-replacement.jpg',
    ratings: 4.7,
    reviews: 80,
    availability: 'Available'
  },
  {
    _id: '3',
    title: 'Brake Inspection',
    description: 'Thorough brake inspection for wear and tear.',
    price: 70,
    category: 'Inspection',
    duration: '45 mins',
    image: 'brake-inspection.jpg',
    ratings: 4.8,
    reviews: 95,
    availability: 'Available'
  },
  {
    _id: '4',
    title: 'Battery Replacement',
    description: 'Quick and reliable battery replacement service.',
    price: 120,
    category: 'Maintenance',
    duration: '30 mins',
    image: 'battery-replacement.jpg',
    ratings: 4.6,
    reviews: 110,
    availability: 'Available'
  },
  {
    _id: '5',
    title: 'AC Repair',
    description: 'Complete AC repair service, including refilling and leak check.',
    price: 150,
    category: 'Repair',
    duration: '1.5 hours',
    image: 'ac-repair.jpg',
    ratings: 4.3,
    reviews: 60,
    availability: 'Available'
  },
  {
    _id: '6',
    title: 'Wheel Alignment',
    description: 'Precision wheel alignment for smooth driving and better fuel efficiency.',
    price: 80,
    category: 'Maintenance',
    duration: '45 mins',
    image: 'wheel-alignment.jpg',
    ratings: 4.7,
    reviews: 85,
    availability: 'Available'
  },
  {
    _id: '7',
    title: 'Engine Diagnostics',
    description: 'Full engine diagnostics to identify any hidden issues.',
    price: 90,
    category: 'Inspection',
    duration: '1 hour',
    image: 'engine-diagnostics.jpg',
    ratings: 4.9,
    reviews: 70,
    availability: 'Available'
  },
  {
    _id: '8',
    title: 'Car Wash',
    description: 'Exterior and interior car wash service with wax finish.',
    price: 40,
    category: 'Cleaning',
    duration: '30 mins',
    image: 'car-wash.jpg',
    ratings: 4.4,
    reviews: 150,
    availability: 'Available'
  },
  {
    _id: '9',
    title: 'Transmission Repair',
    description: 'Detailed transmission repair and maintenance service.',
    price: 200,
    category: 'Repair',
    duration: '3 hours',
    image: 'transmission-repair.jpg',
    ratings: 4.6,
    reviews: 55,
    availability: 'Available'
  },
  {
    _id: '10',
    title: 'Headlight Restoration',
    description: 'Restoration of headlights to improve visibility and safety.',
    price: 60,
    category: 'Maintenance',
    duration: '1 hour',
    image: 'headlight-restoration.jpg',
    ratings: 4.5,
    reviews: 40,
    availability: 'Available'
  }


];

ServiceRouter.get('/fetch', async (req, res) => {

  res.status(200).json(services);
});


export default ServiceRouter;
  