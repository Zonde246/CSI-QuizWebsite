export default function Box({ children }) {
  return (
    <div className="group z-10 backdrop-blur-lg h-16 w-1/6 box-border border-2 border-primary border-opacity-40 flex justify-center items-center hover:border-8 transition-all duration-100">
      {children}
    </div>
  );
}
