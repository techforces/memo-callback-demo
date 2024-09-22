import { useCallback, useEffect, useState } from "react";
import "./App.css";

function List({ getArray, label }) {
  const [state, setState] = useState([]);

  useEffect(() => {
    setState(getArray());
    console.log("Updating " + label);
  }, [getArray]);

  return (
    <p>
      {label}: [{state.join(", ")}]
    </p>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("dark");

  const getArray = () => {
    return [count, count + 1, count + 2];
  };

  const getArray2 = useCallback(() => {
    return [count + 2, count + 1, count];
  }, [count]);

  return (
    <>
      <h1>useCallback() demo</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setTheme(theme == "dark" ? "light" : "dark")}>
          Trigger
        </button>

        <List getArray={getArray} label="Array" />
        <List getArray={getArray2} label="Reversed array" />
        <p>
          Trigger should update only the "Array", the reversed one should stay
          unchanged. UseCallback will have no side effects on Reversed Array.
          Check console to see the difference
        </p>
      </div>
    </>
  );
}

export default App;
