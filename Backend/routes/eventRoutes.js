router.post('/:id/register', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user is already registered
    if (event.registeredUsers.includes(req.user._id)) {
      return res.status(400).json({ message: "You are already registered for this event" });
    }

    // Check event capacity
    if (event.registeredUsers.length >= event.capacity) {
      return res.status(400).json({ message: "Event is already full" });
    }

    // Add user to registered users
    event.registeredUsers.push(req.user._id);
    await event.save();

    res.status(200).json({ message: "Successfully registered for event" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}); 