const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');
const { validateBooking } = require('../middleware/validation');

router.post('/', protect, validateBooking, createBooking);
router.get('/', protect, getBookings);
router.get('/:id', protect, getBooking);
router.put('/:id', protect, updateBooking);
router.delete('/:id', protect, deleteBooking);

module.exports = router;
