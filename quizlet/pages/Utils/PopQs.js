export const getServerSideProps = async (context) => {
  const Data = await fetch("http://localhost:3000/api/GetQs").then((res) =>
    res.json()
  );

  return {
    props: {}, // will be passed to the page component as props
  };
};

export default function PopQs({ props }) {
  return <></>;
}
