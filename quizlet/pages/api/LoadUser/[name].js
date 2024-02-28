import { Quizes } from "@/mongod/mongod";

export default async function handler(req, res) {
  try {
    const data = await Quizes.find({ Creator: req.query.name });
    // console.log(data);
    res.status(200).json(data);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ ok: false });
  }
}
