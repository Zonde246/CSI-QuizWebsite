import Navbar from "@/Components/Misc/Navbar";
import { useRouter } from "next/router";
import { useState } from "react";

export const getServerSideProps = async ({ req }) => {
  const { token } = req.cookies;

  // // console.log(JSON.parse(token));

  if (!token) {
    return {
      redirect: {
        destination: "/Main",
        permanent: false,
      },
    };
  }
  return {
    props: {
      tok: JSON.parse(token),
    },
  };
};

export default function QuizCreator({ tok }) {
  const [questionData, setQuestionData] = useState({
    NoQs: 1,
    Title: "",
    TimeLimit: 1000,
    Question1: {
      question: "",
      options: ["", "", "", ""],
      answer: 0,
    },
  });
  const [CurrentQ, setCurrentQ] = useState(1);
  const [Qview, setQview] = useState(false);

  const router = useRouter();

  function isValid() {
    for (let i = 1; i <= questionData.NoQs; i++) {
      if (
        questionData["Question" + i].question === "" ||
        questionData["Question" + i].options.includes("")
      ) {
        return false;
      }
    }
    return true;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (isValid()) {
      // console.log(questionData);
      const res = await fetch("/api/utils/createQuiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionData: questionData,
          Creator: tok.name,
        }),
      });
      if (res.ok) {
        alert("Quiz Created");
        router.push("/Main");
      } else {
        alert("An error occured");
      }
    } else {
      alert("Please fill all the fields");
    }
  }

  return (
    <>
      <Navbar />
      <section className="h-svh w-full bg-background flex justify-center items-center">
        <div className=" h-3/4 w-1/2 bg-purple-700/25 relative">
          <div className="flex justify-center items-center h-full gap-8">
            {!Qview ? (
              <>
                <div className="flex flex-col">
                  <label htmlFor="Title">Title</label>
                  <input
                    type="text"
                    value={questionData.Title}
                    onChange={(e) =>
                      setQuestionData({
                        ...questionData,
                        Title: e.target.value,
                      })
                    }
                    className="text-black text-xl"
                  />
                  <label htmlFor="NoQs">Number of Questions</label>
                  <input
                    type="number"
                    value={questionData.NoQs}
                    onChange={(e) =>
                      setQuestionData({ ...questionData, NoQs: e.target.value })
                    }
                    className="text-black text-xl"
                  />
                  <label htmlFor="Time">Time</label>
                  <input
                    type="number"
                    value={questionData.TimeLimit}
                    onChange={(e) =>
                      setQuestionData({
                        ...questionData,
                        TimeLimit: e.target.value,
                      })
                    }
                    className="text-black text-xl"
                  />
                </div>
                <button
                  className="h-1/6 w-1/6 bg-secondary hover:bg-purple-300/50 transition-all duration-300 text-black text-2xl"
                  onClick={() => {
                    const temp = { ...questionData };
                    for (let i = 1; i <= questionData.NoQs; i++) {
                      if (!temp["Question" + i]) {
                        temp["Question" + i] = {
                          question: "",
                          options: ["", "", "", ""],
                          answer: 0,
                        };
                      }
                    }
                    setQuestionData(temp);
                    setCurrentQ(1);
                    setQview(true);
                  }}
                >
                  <h3>Next {"->"}</h3>
                </button>
              </>
            ) : (
              <>
                <form
                  className="h-full w-full flex flex-col justify-center items-center gap-4"
                  onSubmit={handleSubmit}
                >
                  <h3>Question {CurrentQ}</h3>
                  <label htmlFor="question">Question</label>
                  <input
                    type="text"
                    value={questionData["Question" + CurrentQ].question}
                    onChange={(e) =>
                      setQuestionData({
                        ...questionData,
                        ["Question" + CurrentQ]: {
                          ...questionData["Question" + CurrentQ],
                          question: e.target.value,
                        },
                      })
                    }
                    className="text-black text-xl w-full"
                    required
                  />
                  <h3>Options</h3>
                  {questionData["Question" + CurrentQ].options.map(
                    (option, i) => (
                      <div key={i} className="flex gap-4">
                        <label htmlFor={"option" + i}>Option {i + 1}</label>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const temp =
                              questionData["Question" + CurrentQ].options;
                            temp[i] = e.target.value;
                            setQuestionData({
                              ...questionData,
                              ["Question" + CurrentQ]: {
                                ...questionData["Question" + CurrentQ],
                                options: temp,
                              },
                            });
                          }}
                          className="text-black text-xl"
                          required
                        />
                      </div>
                    )
                  )}
                  <label htmlFor="answer">Answer</label>
                  <input
                    type="number"
                    value={questionData["Question" + CurrentQ].answer}
                    onChange={(e) => {
                      if (e.target.value < 4 && e.target.value >= 0) {
                        setQuestionData({
                          ...questionData,
                          ["Question" + CurrentQ]: {
                            ...questionData["Question" + CurrentQ],
                            answer: e.target.value,
                          },
                        });
                      } else {
                        alert("Answer should be between 0 and 3");
                        setQuestionData({
                          ...questionData,
                          ["Question" + CurrentQ]: {
                            ...questionData["Question" + CurrentQ],
                            answer: 0,
                          },
                        });
                      }
                    }}
                    className="text-black text-xl"
                  />
                  <div className=" w-full h-full flex justify-center items-center gap-4">
                    <button
                      type="button"
                      className="h-1/6 w-1/6 bg-secondary hover:bg-purple-300/50 transition-all duration-300 text-black text-2xl"
                      onClick={() => {
                        if (CurrentQ > 1) {
                          setCurrentQ(CurrentQ - 1);
                          // setQview(true);
                        } else {
                          setQview(false);
                        }
                      }}
                    >
                      <h3>{!CurrentQ > 1 ? "Next ->" : "<- Back"}</h3>
                    </button>
                    <button
                      type="button"
                      className="h-1/6 w-1/6 bg-secondary hover:bg-purple-300/50 transition-all duration-300 text-black text-2xl"
                      onClick={() => {
                        if (CurrentQ < questionData.NoQs) {
                          setCurrentQ(CurrentQ + 1);
                          setQview(true);
                        } else {
                          setQview(false);
                        }
                      }}
                    >
                      <h3>
                        {CurrentQ < questionData.NoQs ? "Next ->" : "<- Back"}
                      </h3>
                    </button>
                  </div>
                  <button
                    className="bg-black w-1/4 h-1/4 absolute bottom-0 right-0 hover:bg-stone-500/50 transition-all duration-300"
                    // onClick={(e) => handleSubmit()}
                  >
                    <h3>Submit</h3>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
