const Booking = require('../models/Booking');
const axios = require('axios');

exports.createBooking = async (req, res, next) => {
  try {
    const bookingData = {
      user: req.user._id,
      ...req.body
    };

    const booking = await Booking.create(bookingData);

    res.status(201).json({
      success: true,
      booking
    });
  } catch (error) {
    next(error);
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    next(error);
  }
};

exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to access this booking' });
    }

    let weatherData = null;
    try {
      const weatherResponse = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=demo&q=${booking.location}&dt=${booking.date.toISOString().split('T')[0]}`
      );
      weatherData = {
        condition: weatherResponse.data.forecast.forecastday[0].day.condition.text,
        temp: weatherResponse.data.forecast.forecastday[0].day.avgtemp_c
      };
    } catch (weatherError) {
      weatherData = null;
    }

    res.status(200).json({
      success: true,
      booking,
      weather: weatherData
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBooking = async (req, res, next) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this booking' });
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this booking' });
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Booking deleted'
    });
  } catch (error) {
    next(error);
  }
};
