import { useEffect, useState } from "react";
import { Quizes } from "@/mongod/mongod";
export async function getServerSideProps({ params }) {
  let Data = await Quizes.findOne({ _id: params.QuizID });
  Data = JSON.parse(JSON.stringify(Data));
  // console.log(Data);
  return {
    props: { Data }, // * will be passed to the page component as props
  };
}

// * Timer Component
export function Timer({ Time, setFin }) {
  const [time, setTime] = useState(Time);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time - 1);
      // * If the time is 0 End the quiz
      if (time == 0) {
        setFin(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [time, setFin]);
  return (
    <h1 className="absolute top-0 left-0">You have {time} Seconds left</h1>
  );
}

export default function Quiz({ Data }) {
  // * Organize the data
  const ImportantData = Object.values(Data.Questions[0]);
  ImportantData.forEach((element) => {
    if (typeof element != "object") {
      ImportantData.splice(ImportantData.indexOf(element), 1);
    }
  });
  // * Remove the Title from the data
  ImportantData.shift();
  // console.log(ImportantData);
  // * Set the state
  // * Questions is the array of questions
  const [Questions, setQuestions] = useState(ImportantData);
  // * UserAnswers is the array of the user answers
  const [userAnswers, setUserAnswers] = useState([]);
  // * CurrentQ is the current question
  const [CurrentQ, setCurrentQ] = useState(0);
  // * ChoseOption is the option that the user chose. Used to highlight the option
  const [choseOption, setChoseOption] = useState(-1);
  // * Fin is the state of the quiz. If true show the results of the quiz
  const [Fin, setFin] = useState(false);
  return (
    <>
      <div
        className={
          !Fin
            ? `h-svh w-full flex justify-center items-center flex-col`
            : "hidden"
        }
      >
        {Questions.map((question, index) => (
          // console.log(question, index, CurrentQ),
          <div
            key={index}
            className={
              CurrentQ == index
                ? "flex flex-col justify-center items-center w-full h-1/2"
                : "hidden"
            }
          >
            <h1>Question : {question.question}</h1>
            <div
              className={
                "flex flex-col justify-center items-center w-full h-svh"
              }
            >
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className={
                    choseOption == index
                      ? "bg-primary text-red-600 p-2 m-2 w-1/4 text-center translate-x-4 transition-all duration-500"
                      : "bg-white text-black p-2 m-2 w-1/4 text-center transition-all duration-500"
                  }
                  onClick={() => setChoseOption(index)}
                >
                  <h3>{option}</h3>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            let temp = userAnswers;
            temp[CurrentQ] = choseOption;
            setUserAnswers(temp);
            // console.log(userAnswers);
            setChoseOption(-1);
            setCurrentQ(CurrentQ + 1);
          }}
          className={CurrentQ < Questions.length - 1 ? "" : "hidden"}
        >
          Next
        </button>
        <Timer Time={Number(Data.Questions[0].TimeLimit)} setFin={setFin} />
        {/* Finish button */}
        <button
          type="button"
          onClick={() => {
            let temp = userAnswers;
            temp[CurrentQ] = choseOption;
            setUserAnswers(temp);
            // console.log(userAnswers);
            setFin(true);
          }}
          className={CurrentQ == Questions.length - 1 ? "" : "hidden"}
        >
          Finish
        </button>
      </div>
      <div
        className={
          Fin
            ? `flex flex-col w-full h-svh justify-center items-center p-4`
            : "hidden"
        }
      >
        <h1>Thank you for taking the quiz</h1>
        <h1>
          Your score is :{" "}
          {
            userAnswers.filter(
              (answer, index) => answer == Questions[index].answer
            ).length
          }
        </h1>
        {/* Show the user the answer of each question */}
        {Questions.map((question, index) => (
          <div
            key={index}
            className={"flex flex-col justify-center items-center w-full h-1/2"}
          >
            <h1>Question : {question.question}</h1>
            <h1>Correct Answer : {question.options[question.answer]}</h1>
            <h1>Your Answer : {question.options[userAnswers[index]]}</h1>
          </div>
        ))}
      </div>
    </>
  );
}
