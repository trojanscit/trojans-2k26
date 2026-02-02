const Registered = require("../models/Registered");

const registerEvent = async (req, res) => {
  try {
    const {
      user_id,
      event_name,
      name,
      gender,
      college_name,
      year,
      department,
      phone_number,
      referral_code,
      participation,
      team_name,
      team_members,
    } = req.body;
    if (!user_id || !event_name) {
      return res
        .status(400)
        .json({ message: "Network Error. Refresh and Try again" });
    }

    let user = await Registered.findOne({ user_id });

    if (user) {
      // Update team fields if provided
      if (team_name) user.team_name = team_name;
      if (team_members) user.team_members = team_members;

      if (!user.events.includes(event_name)) {
        user.events.push(event_name);
        await user.save();
        return res
          .status(200)
          .json({ message: "Event added successfully.", user: user });
      } else {
        await user.save(); // Save changes to team fields even if event already exists
        return res
          .status(200)
          .json({ message: "Event already registered (team info updated).", user: user });
      }
    } else {
      const newUser = new Registered({
        user_id,
        name: name || null,
        gender: gender || null,
        college_name: college_name || null,
        year: year || null,
        department: department || null,
        phone_number: phone_number || null,
        referral_code: referral_code || null,
        participation: participation || null,
        team_name: team_name || null,
        team_members: team_members || null,
        events: [event_name],
      });

      await newUser.save();
      return res
        .status(201)
        .json({ message: "User registered successfully.", user: newUser });
    }
  } catch (error) {
    console.error("Error registering event:", error);
    return res.status(500).json({ message: "Internal server error.", error });
  }
};
const getRegisteredEvents = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ message: "user_id is required." });
    }

    // Find the user by user_id
    const user = await Registered.findOne({ user_id });

    if (user) {
      return res.status(200).json({
        events: user.events,
        name: user.name,
        gender: user.gender,
        department: user.department,
        college_name: user.college_name,
        year: user.year,
        phone_number: user.phone_number,
        referral_code: user.referral_code,
        team_name: user.team_name,
        team_members: user.team_members,
      });

    } else {
        return res.status(200).json({
          events: [],
          name: "",
          gender: "",
          department: "",
          college_name: "",
          year: "",
          phone_number: "",
          referral_code: "",
          team_name: "",
          team_members: "",
        });
    }
  } catch (error) {
    console.error("Error fetching registered events:", error);
    return res.status(500).json({ message: "Internal server error.", error });
  }
};

module.exports = {
  registerEvent,
  getRegisteredEvents,
};
