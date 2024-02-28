import { Quizes } from "@/mongod/mongod";
export default async function handler(req, res) {
  // sort the quizes by the number of times they have been taken
  // if (req.method !== "GET") {
  //   return res.status(405).json({ message: "Method not allowed" });
  // }
  try {
    const resp = await Quizes.find({})
      .sort({ NoOfTakers: -1 })
      .limit(20)
      .then((data) => {
        res.status(200).json(data);
      });
  } catch (error) {
    res.status(500).json({ error, ok: false });
  }
}
