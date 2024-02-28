import Form from "@/Components/Form/Form";

export const getServerSideProps = async ({ req }) => {
  const { token } = req.cookies;

  // // console.log(token);

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

export default function Login() {
  return <Form Log={true} />;
}
