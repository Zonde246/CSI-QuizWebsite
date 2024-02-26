import { users } from "@/mongod/mongod";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

mongoose.connect("mongodb://localhost:27017/Quizlet");

// ! Stack overflow answer. I don't know what it does.
// ! Without the code, Get false-positive error on no response being sent.
export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function signup(req, res) {
  if (req.method === "POST") {
    // * Check if post request, Helps avoid Unauthorized access
    const { name, password } = req.body; // * Unpack the request body
    const salts = 10; // * Salts for hashing

    const thing = await bcrypt.hash(password, salts, async (err, hash) => {
      if (err) {
        return res.status(500).json("Internal Server Error");
      } else {
        // res.status(200).json("Welcome!");
        const resp = await users.create({ name: name, password: hash }); // * Create a new user
        if (resp) {
          return res.status(200).json("Welcome!");
        } else {
          return res.status(500).json("Internal Server Error");
        }
      }
    });
  } else {
    res.status(405).json("Method Not Allowed");
  }
}
