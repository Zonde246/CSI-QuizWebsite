import { Quizes } from "@/mongod/mongod";
export default function handler(req, res) {
  // sort the quizes by the number of times they have been taken
  Quizes.find({
    NoOfTakers: { $gt: 0 },
  })
    .sort({ NoOfTakers: -1 })
    .then((data) => {
      res.status(200).json(data);
    });
        
}
