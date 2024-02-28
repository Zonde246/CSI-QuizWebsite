import { Quizes } from "@/mongod/mongod";
import mongoose from "mongoose";
export default async function handler(req, res) {
  // console.log(req.body.ID);
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const id = req.body.ID;

  const data = await Quizes.findById(id);
  // console.log(data);
  res.status(200).json(data);
  // res.status(200).json({ ok: true });
  res.status(500).json({ ok: false });
}
