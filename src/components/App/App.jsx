import { useState } from "react";
import Preloader from "../Preloader/Preloader";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Preloader />
    </>
  );
}

export default App;
