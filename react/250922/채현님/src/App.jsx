import { useState } from "react";

function App() {
  const [state, setState] = useState();

  function clickState() {
    if (state === "") {
      setState("like");
    } else {
      setState("");
    }
  }
  return (
    <>
      <button onClick={clickState}> like </button>
      <span>{state}</span>
    </>
  );
}

export default App;
