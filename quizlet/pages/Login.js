import { useEffect, useState } from "react";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {}

  return (
    <div className="bg-stone-950 h-svh w-full flex justify-center items-center z-50">
      <form
        className="bg-secondary/10 h-3/4 w-5/6 flex flex-col justify-center items-center gap-8"
        onSubmit={handleSubmit}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="text-black w-1/4 text-3xl"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          className="text-black w-1/4 text-3xl"
        />
        <button className="">Submit</button>
      </form>
    </div>
  );
}
