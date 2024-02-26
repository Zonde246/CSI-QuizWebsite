import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [userData, SetuserData] = useState({});
  useEffect(() => {
    SetuserData(getCookie("token"));
  }, []);
  console.log(userData);

  return (
    <nav className="h-16 w-full bg-indigo-500 z-50 absolute top-0 flex">
      <NavButton Redirect={"PopQs"}>Popular Quizzes</NavButton>
      <NavButton Redirect={"NewQs"}>New Quizes</NavButton>
      <NavButton Redirect={"PrimSearch"}>Search by user</NavButton>
      <NavButton Redirect={"CrtQuiz"}>Create a Quiz</NavButton>
      <NavButton>View your account</NavButton>
    </nav>
  );
}

export function NavButton({ children, Redirect }) {
  const router = useRouter();
  return (
    <div
      className="h-16 w-1/4 relative flex justify-center items-center transition-all hover:-translate-y-1 hover:text-accent"
      onClick={() => router.push(`./${Redirect}`)}
    >
      {children}
    </div>
  );
}
