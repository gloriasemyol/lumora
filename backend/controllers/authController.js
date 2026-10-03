import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signAccess = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
const signRefresh = (id) => jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });

export const login = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({
    accessToken: signAccess(user._id),
    refreshToken: signRefresh(user._id),
    user: { id: user._id, name: user.name, email: user.email },
  });
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.body || {};
  if (!refreshToken) return res.status(400).json({ message: "Refresh token required" });
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    res.json({ accessToken: signAccess(decoded.id) });
  } catch {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

export const me = (req, res) => res.json(req.user);