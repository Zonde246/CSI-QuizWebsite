import { Quizes } from "@/mongod/mongod";
export default async function handler(req, res) {
  try {
    // * Find the top 20 quizes with the most takers
    const resp = await Quizes.find({})
      .sort({ NoOfTakers: -1 })
      .limit(20)
      .then((data) => {
        res.status(200).json(data);
      });
  } catch (error) {
    // * If there is an error return a 500 status code
    res.status(500).json({ error, ok: false });
  }
}
