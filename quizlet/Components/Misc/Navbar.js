import { useRouter } from "next/router";

export default function Navbar() {
  return (
    <nav className="h-16 w-full bg-indigo-500 z-50  flex">
      <NavButton Redirect={"/Utils/PopQs"}>Popular Quizzes</NavButton>
      {/* <NavButton Redirect={"Utils/NewQs"}>New Quizes</NavButton> */}{" "}
      {/* Scrapped due to time constraints */}
      <NavButton Redirect={"/Utils/PrimSearch"}>Search by user</NavButton>
      <NavButton Redirect={"/Utils/crtQuiz"}>Create a Quiz</NavButton>
    </nav>
  );
}

export function NavButton({ children, Redirect }) {
  const router = useRouter();
  return (
    <div
      className="h-16 w-full relative flex justify-center items-center transition-all hover:-translate-y-1 hover:text-accent"
      onClick={() => router.push(`/${Redirect}`)}
    >
      {children}
    </div>
  );
}
