import { Quizes } from "@/mongod/mongod";
export default async function handler(req, res) {
  // console.log(req.body.ID);

  const id = req.body.ID;

  const data = await Quizes.findById(id);
  // console.log(data);
  res.status(200).json(data);
  // res.status(200).json({ ok: true });
  res.status(500).json({ ok: false });
}
