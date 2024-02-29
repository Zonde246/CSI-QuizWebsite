import Form from "@/Components/Form/Form";

// ? Get server side props
// ? Check if the user is logged in
// ? if Yes redirect to Main
// ? else show the page
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

export default function signup() {
  // * Load Form Component and indicate that this is for Registering
  return <Form Log={false} />;
}
