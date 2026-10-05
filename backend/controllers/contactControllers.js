import Message from "../models/Message.js";

const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const sendMessage = async (req, res) => {
  const { name, email, message } = req.body || {};

  if ([name, email, message].some((v) => typeof v !== "string") || !name.trim() || !email.trim() || !message.trim()) {
    return res.status(400).json({ message: "Name, email and message are required" });
  }
  if (!emailOk.test(email.trim())) {
    return res.status(400).json({ message: "Please enter a valid email address" });
  }
  if (name.length > 100 || email.length > 150 || message.length > 3000) {
    return res.status(400).json({ message: "Your message is too long" });
  }

  // 1) Save to the database FIRST (so a message is never lost)
  const saved = await Message.create({
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  });

  // 2) Then email it to you (best effort: if email fails, the message is still saved)
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Lumora <onboarding@resend.dev>",
          to: [process.env.CONTACT_TO_EMAIL],
          reply_to: saved.email,
          subject: `New portfolio message from ${saved.name}`,
          text: `From: ${saved.name} <${saved.email}>\n\n${saved.message}`,
        }),
      });
      if (!r.ok) console.error("Resend error:", await r.text());
    } catch (e) {
      console.error("Email failed:", e.message);
    }
  }

  res.status(201).json({ message: "Message sent! I'll get back to you soon." });
};