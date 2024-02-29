import { Quizes } from "@/mongod/mongod";

export default async function handler(req, res) {
  // * This API route is Dynamic. It will return all the quizes created by the user with the name in the query i.e. The ID spcified in the path to this files
  try {
    // * Find all the quizes with the creator name in the query
    const data = await Quizes.find({ Creator: req.query.name });
    // console.log(data);
    res.status(200).json(data);
  } catch (error) {
    // console.log(error);\
    // * If there is an error return a 500 status code
    res.status(500).json({ ok: false });
  }
}
