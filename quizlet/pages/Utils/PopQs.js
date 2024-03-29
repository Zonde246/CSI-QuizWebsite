import Navbar from "@/Components/Misc/Navbar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

// ! Doesnt Work in Production :shrug:
// ! Probably should use getServerSideProps to directly connect to the database instead of using the API.
// export const getServerSideProps = async (context) => {
//   const Data = await fetch("/api/utils/GetQs", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({}),
//   }).then((res) => res.json());
//   console.log(Data);

//   return {
//     props: { Data: Data }, // will be passed to the page component as props
//   };
// };

export default function PopQs() {
  const [Data, setData] = useState([]);
  // * Get all the popular Quizes from the database
  useEffect(() => {
    fetch("/api/utils/GetQs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  // * Router
  const router = useRouter();
  return (
    <div className="h-svh w-full absolute">
      <Navbar />
      <div className="relative flex flex-col justify-center items-center gap-8 mt-4">
        {Data.map((quiz) => {
          return (
            <div
              key={quiz._id}
              className="border-2 border-primary w-1/2 h-1/2 flex flex-col hover:shadow-2xl hover:shadow-accent hover:translate-y-4 transition-all duration-500"
              onClick={() => {
                router.push(`/Take/Quiz/${quiz._id}`);
              }}
            >
              <h3>Title : {quiz.Questions[0].Title}</h3>
              <h3>Creator : {quiz.Creator}</h3>
              <h3>Number of Questions : {quiz.Questions[0].NoQs}</h3>
              <h3>{quiz.NoOfTakers}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
