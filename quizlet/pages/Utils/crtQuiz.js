export const getServerSideProps = async ({ req }) => {
  const { token } = req.cookies;

  // console.log(token);

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

export default function QuizCreator() {
  return <></>;
}
