import { users } from "@/mongod/mongod";
import bcrypt from "bcrypt";
import { setCookie } from "cookies-next";

// ! Stack overflow answer. I don't know what it does.
// ! Without the code, Get false-positive error on no response being sent.
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
  users.findOne({ name }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result) {
          setCookie(
            "token",
            {
              name: user.name,
              QuizIDs: user.Qids,
              NQs: user.NoOfQuizes,
            },
            {
              req,
              res,
              maxAge: 60 * 60 * 24, // 1 day
              path: "/",
              secure: true,
              sameSite: "strict",
            }
          );
          return res.status(200).json({ name: user.name, Qids: user.QuizIDs });
        } else {
          return res.status(400).json({ error: "Invalid credentials" });
        }
      });
    }

    // res.status(200).json({ name: user.name, Qids: user.QuizIDs });
  });
}
