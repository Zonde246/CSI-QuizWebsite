import { useState } from "react";
import Box from "@/Components/Index/Box";
import { useRouter } from "next/router";
import React from "react";
// import { BackgroundBeams } from "../ui/background-beams";

export default function Form({ children, Log = false }) {
  // ? Log  for managing Signin/Signup
  const [name, setName] = useState(""); // * States for Name and Password
  const [password, setPassword] = useState("");

  const router = useRouter(); // ? For routing

  async function SignUpHandler(e) {
    // * Run when User is registering
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    }).then((res) => res.json());
    // console.log(res);
    if (res.error) {
      // * If there is an error, alert the user
      alert(res.error);
    } else {
      // * If there is no error, alert the user and redirect to the Log in page
      alert("Welcome!");
      router.push(`/Login`);
    }
  }

  async function LoginHandler(e) {
    // * Run when User is logging in
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    }).then((res) => res.json());
    // console.log(res);
    if (res.error) {
      // * If there is an error, alert the user
      alert(res.error);
    } else {
      // * If there is no error, alert the user and redirect to the main page
      alert("Welcome!");
      router.push(`/Main`);
    }
  }

  return (
    <div className="bg-gif  h-svh w-full flex flex-col justify-center items-center">
      <form
        className="bg-black/50 rounded-xl h-1/2 w-1/2 flex flex-col justify-center items-center gap-8"
        onSubmit={Log ? LoginHandler : SignUpHandler}
      >
        <label htmlFor="name" className="">
          Name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="text-black w-1/2 text-3xl"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="text-black w-1/2 text-3xl"
        />
        <button className="">Submit</button>
      </form>
      {Log ? (
        <Box Link={"Register"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path d="M8.5 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 13c.552 0 1.01-.452.9-.994a5.002 5.002 0 0 0-9.802 0c-.109.542.35.994.902.994h8ZM12.5 3.5a.75.75 0 0 1 .75.75v1h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0v-1h-1a.75.75 0 0 1 0-1.5h1v-1a.75.75 0 0 1 .75-.75Z" />
          </svg>
          Register
          <span className="absolute group-hover:translate-y-[200%] group-hover:opacity-100 transition-all duration-700 opacity-0">
            <h5>New to the site, Amigo? Sign up Right now</h5>
          </span>
        </Box>
      ) : (
        <Box Link={"Login"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          Login
          <span className="absolute group-hover:translate-y-[200%] group-hover:opacity-100 transition-all duration-700 opacity-0">
            <h5>Already a user? Login here.</h5>
          </span>
        </Box>
      )}
    </div>
  );
}
