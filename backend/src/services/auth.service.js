import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";

const { User, Startup } = db;

export const signup = async ({ name, email, password, role }) => {
  // Check existing user
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // If startup → create startup entity
  if (role === "STARTUP") {
    await Startup.create({
      name: `${name}'s Startup`,
      userId: user.id,
    });
  }

  return user;
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
};