// ! IMPORTANT
// ! THIS API ROUTE IS NOT USED IN THE FINAL VERSION
// ! REPLACED BY GETSERVERSIDEPROPS IN THE PAGES/TAKE/QUIZ/[QuizID].JS FILE

import { Quizes } from "@/mongod/mongod";
export default async function handler(req, res) {
  // console.log(req.body.ID);

  // ? Get the ID from the request body
  // const id = req.body.ID;

  // * Find the quiz with the ID
  // const data = await Quizes.findById(id);
  // console.log(data);
  // * Return the data
  // res.status(200).json(data);
  // res.status(200).json({ ok: true });

  //  ! DEPRECATION
  res.status(200).json({ ok: false, message: "This API route is deprecated" });
}
