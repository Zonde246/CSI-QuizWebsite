export async function getServerSideProps({ params }) {
  const Data = await fetch(
    `http://localhost:3000/api/Load/${params.QuizID}`
  ).then((res) => res.json());
  console.log(Data);

  return {
    props: { Data: Data }, // will be passed to the page component as props
  };
}

export function Timer({ Time }) {
  const [time, setTime] = useState(Time);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);
  return <h1>{time}</h1>;
}

export default function Quiz({ Data }) {
  return;
}
