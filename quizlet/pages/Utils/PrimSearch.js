import { useRouter } from "next/router";
import { useState } from "react";
export default function PrimSearch() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState(false);

  const router = useRouter();

  return (
    <div>
      <h1>Search by user</h1>
      <input
        type="text"
        className="text-black"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch("/api/LoadUser/" + document.querySelector("input").value)
            .then((res) => res.json())
            .then((data) => {
              setData(data);
              setSearch(true);
              // console.log(data);
            });
        }}
      >
        Search
      </button>
      {search
        ? data.map((quiz) => {
            return (
              <div
                key={quiz._id}
                onClick={() => router.push(`/Take/Quiz/${quiz._id}`)}
                className="border-2 border-primary w-1/2 h-1/2 flex flex-col hover:shadow-2xl hover:shadow-accent hover:translate-y-4 transition-all duration-500"
              >
                <h3>Title : {quiz.Title}</h3>
                <h3>Creator : {quiz.Creator}</h3>
                <h3>Number of Questions : {quiz.Questions[0].NoQs}</h3>
                <h3>Number of takers : {quiz.NoOfTakers}</h3>
              </div>
            );
          })
        : null}
    </div>
  );
}
