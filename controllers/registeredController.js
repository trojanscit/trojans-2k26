const Registered = require('../models/Registered'); 

const registerEvent = async (req, res) => {
  try {
    const { user_id, event_name,name,gender, college_name, year, department, phone_number } = req.body;
    if (!user_id || !event_name) {
     
      return res.status(400).json({ message: 'user_id and event_name are required.' });
    }

    
    let user = await Registered.findOne({ user_id });

    if (user) {
     
      if (!user.events.includes(event_name)) {
        user.events.push(event_name);
        await user.save();
        return res.status(200).json({ message: 'Event added successfully.',user: user });
      } else {
        return res.status(200).json({ message: 'Event already registered.', user : user });
      }
    } else {
     
      const newUser = new Registered({
        user_id,
        name:name || null,
        gender:name || null,
        college_name: college_name || null,
        year: year || null,
        department: department || null,
        phone_number: phone_number || null,
        events: [event_name],
      });

      await newUser.save();
      return res.status(201).json({ message: 'User registered successfully.', user: newUser });
    }
  } catch (error) {
    console.error('Error registering event:', error);
    return res.status(500).json({ message: 'Internal server error.', error });
  }
};
const getRegisteredEvents = async (req, res) => {
    try {
      const { user_id } = req.query;
      if (!user_id) {
        return res.status(400).json({ message: 'user_id is required.' });
      }
  
      // Find the user by user_id
      const user = await Registered.findOne({ user_id });
  
      if (user) {
        return res.status(200).json({ events: user.events });
      } else {
        return res.status(200).json({ events: [] });
      }
    } catch (error) {
      console.error('Error fetching registered events:', error);
      return res.status(500).json({ message: 'Internal server error.', error });
    }

  };
  
module.exports = {
  registerEvent,
    getRegisteredEvents,
};
