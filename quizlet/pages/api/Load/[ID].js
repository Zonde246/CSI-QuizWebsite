import { Quizes } from "@/mongod/mongod";

export default async function handler(req, res) {
  // console.log(req.query.ID);

  await Quizes.findOne({ _id: req.query.ID })
    .then((data) => {
      res.status(200).json(data);
    })
    .then((data) => {
      res.status(500).json({ ok: false });
    });

  res.status(200).json({ ok: true });
}
