import Box from "@/Components/Index/Box";
import { useRef } from "react";

export const getServerSideProps = async ({ req }) => {
  const { token } = req.cookies;

  if (token) {
    return {
      redirect: {
        destination: "/Main",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Page() {
  const Intro = useRef(null);
  return (
    <>
      <section className="h-svh w-full">
        <div className="h-svh w-full flex flex-col justify-center items-center center ">
          <h1 className="text-text flex">
            Hello There 👋! Welcome Quizlet!
            <span
              className="animate-bounce m-4 cursor-default"
              onClick={() => {
                Intro.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-12 h-12"
              >
                <path
                  fillRule="evenodd"
                  d="M8 2a.75.75 0 0 1 .75.75v8.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.22 3.22V2.75A.75.75 0 0 1 8 2Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </h1>
        </div>
      </section>
      <section
        ref={Intro}
        className="h-svh w-full flex flex-col justify-center items-center"
      >
        <h3 className="text-center">
          <span className="text-accent">Quizlet</span> is a place where you can
          learn and share knowledge.
        </h3>
        <div className="h-1/4 w-full flex justify-center items-center gap-8">
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
          <Box
            Link={"https://github.com/Zonde246/CSI-QuizWebsite"}
            Absolute={true}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 64 64"
              className="h-12 w-12 invert"
            >
              <path d="M32,10c12.15,0,22,9.85,22,22c0,9.768-6.369,18.045-15.179,20.916c0.002-0.008,0.006-0.021,0.006-0.021	s-1.485-0.696-1.453-1.938c0.035-1.367,0-4.556,0-5.727c0-2.01-1.272-3.434-1.272-3.434s9.977,0.112,9.977-10.533	c0-4.107-2.147-6.245-2.147-6.245s1.128-4.385-0.39-6.245c-1.701-0.184-4.749,1.626-6.05,2.472c0,0-2.062-0.846-5.492-0.846	c-3.43,0-5.492,0.846-5.492,0.846c-1.301-0.846-4.348-2.656-6.05-2.472c-1.518,1.86-0.39,6.245-0.39,6.245s-2.147,2.137-2.147,6.245	c0,10.645,9.977,10.533,9.977,10.533s-1.005,1.136-1.225,2.806c-0.696,0.236-1.721,0.528-2.549,0.528	c-2.165,0-3.812-2.105-4.416-3.078c-0.595-0.96-1.815-1.766-2.953-1.766c-0.749,0-1.115,0.375-1.115,0.803s1.05,0.727,1.743,1.521	c1.461,1.674,1.435,5.438,6.641,5.438c0.565,0,1.719-0.139,2.588-0.256c-0.005,1.185-0.007,2.436,0.012,3.167	c0.031,1.242-1.453,1.938-1.453,1.938s0.004,0.012,0.006,0.021C16.369,50.045,10,41.768,10,32C10,19.85,19.85,10,32,10z"></path>
            </svg>
            Github
            <span className="absolute group-hover:translate-y-[200%] group-hover:opacity-100 transition-all duration-700 opacity-0">
              <h5>Interested in the source code? Step right up !</h5>
            </span>
          </Box>
        </div>
      </section>
    </>
  );
}
