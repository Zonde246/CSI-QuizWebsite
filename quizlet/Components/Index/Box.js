import { useRouter } from "next/router";

// Children is the Raw HTML that will be rendered inside the Box
// Link is the link to which the Box will redirect
// Absolute is a boolean to check if the link is an external link
export default function Box({ children, Link, Absolute = false }) {
  // Router object for implementing the routing
  const router = useRouter();
  return (
    <div
      onClick={() =>
        Absolute ? (window.location.href = Link) : router.push(`./${Link}`)
      }
      className="group z-10 backdrop-blur-lg h-16 w-1/6 box-border border-2 border-primary border-opacity-40 flex justify-center items-center hover:border-8 transition-all duration-100"
    >
      {children}
    </div>
  );
}
