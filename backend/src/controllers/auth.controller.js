import * as authService from "../services/auth.service.js";

export const signup = async (req, res) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = async (_req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};