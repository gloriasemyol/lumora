// A simple controller to handle contact form submissions
export const sendMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // You can add email sending or database saving logic here later.
    // For now, it successfully acknowledges receipt.
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    next(error);
  }
};