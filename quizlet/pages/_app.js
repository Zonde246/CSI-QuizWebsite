import "@/styles/globals.css";

export const getServerSideProps = async ({ req }) => {
  console.log(req);
};

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
