import { Quizes } from "@/mongod/mongod";
import mongoose from "mongoose";
export default async function handler(req, res) {
  console.log(req.body.ID);

  await Quizes.findOne({ _id: req.body.ID })
    .then((data) => {
      res.status(200).json(data);
    })
    .then((data) => {
      res.status(500).json({ ok: false });
    });

  res.status(500).json({ ok: false });
}
