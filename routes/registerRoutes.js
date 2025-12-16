const express = require('express');
const { registerEvent,getRegisteredEvents } = require('../controllers/registeredController');

const router = express.Router();


router.post('/register-event', registerEvent);
router.get('/registered-events', getRegisteredEvents);//endpoints:http://localhost:5000/api/registerd/registered-events?user_id=12345

module.exports = router;
