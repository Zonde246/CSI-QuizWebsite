import { Quizes } from "@/mongod/mongod";

export default async function handler(req, res) {
  const { questionData, Creator } = req.body;

  console.log(Creator);

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
    const newQuiz = await new Quizes({
      QuizID: Creator + Generator(),
      Questions: questionData,
      Creator: "123",
      NoOfTakers: 0,
    });

    newQuiz.save();
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error, ok: false });
  }
}
