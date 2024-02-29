import Navbar from "@/Components/Misc/Navbar";
import { useState, useRef } from "react";

// Get server side props
// Check if the user is logged in
// if Yes show the page
// else redirect to index page

export const getServerSideProps = async ({ req }) => {
  const { token } = req.cookies;

  // // console.log(token);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default function mainPage() {
  return (
    <>
      <section className="h-svh w-full">
        <Navbar />
      </section>
      <section className="h-svh w-full"></section>
    </>
  );
}
