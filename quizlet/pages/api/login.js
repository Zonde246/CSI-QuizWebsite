import { mongod } from "@/mongod/mongod";
import bcrypt from "bcryptjs";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function login(req, res) {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }
  mongod.user.findOne({ name }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result) {
          return res.status(200).json({ name: user.name, Qids: user.QuizIDs });
        } else {
          return res.status(400).json({ error: "Invalid credentials" });
        }
      });
    }

    // res.status(200).json({ name: user.name, Qids: user.QuizIDs });
  });
}
