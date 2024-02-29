import { Quizes } from "@/mongod/mongod";

export default async function handler(req, res) {
  // * Get data from the request body
  const { questionData, Creator } = req.body;

  // console.log(Creator);
  // console.log(questionData.Title);

  // * Generate Random Numbers for ID
  function Generator() {
    let i = 0;
    let dicrim = "xxx";
    while (i < 10) {
      dicrim += Math.floor(Math.random() * 100000);
      i++;
    }
    return dicrim;
  }

  try {
    // * Create a new Quiz
    const newQuiz = await new Quizes({
      Title: questionData.Title,
      QuizID: Creator + Generator(),
      Questions: questionData,
      Creator: Creator,
      NoOfTakers: 0,
    });
    // * Save the new Quiz
    newQuiz.save();
    res.status(200).json({ ok: true });
  } catch (error) {
    // * If there is an error return a 500 status code
    res.status(500).json({ error, ok: false });
  }
}
