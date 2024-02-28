import { useEffect, useState } from "react";
// export async function getServerSideProps({ params }) {
//   const Data = await fetch(`/api/Load/${params.QuizID}`).then((res) =>
//     res.json()
//   );
//   // console.log(Data);

//   return {
//     props: { Data: Data }, // will be passed to the page component as props
//   };
// }

export function Timer({ Time, setFin }) {
  const [time, setTime] = useState(Time);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time - 1);
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

export default function Quiz() {
  const [Data, setData] = useState({});

  useEffect(() => {
    fetch(`/api/Load/${params.QuizID}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  if (Object.keys(Data).length == 0) {
    return <h1>Loading...</h1>;
  }
  return <Module Data={Data} />;
}

export function Module({ Data }) {
  const ImportantData = Object.values(Data.Questions[0]);
  ImportantData.forEach((element) => {
    if (typeof element != "object") {
      ImportantData.splice(ImportantData.indexOf(element), 1);
    }
  });
  // console.log(ImportantData.shift());
  const [Questions, setQuestions] = useState(ImportantData);
  const [userAnswers, setUserAnswers] = useState([]);
  const [CurrentQ, setCurrentQ] = useState(0);

  const [choseOption, setChoseOption] = useState(-1);

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
