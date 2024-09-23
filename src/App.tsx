import { useCallback, useEffect, useState, useMemo } from "react";
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

function SlowButton({ number }) {
  const [theme, setTheme] = useState("dark");
  const SlowDoubleNum = () => {
    return doubleNum(number);
  };
  return (
    <button
      onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
      style={{
        backgroundColor: theme == "dark" ? "#333" : "#fff",
        color: theme == "dark" ? "#fff" : "#333",
      }}
    >
      Slow switch: {SlowDoubleNum()}
    </button>
  );
}

function FastButton({ number }) {
  const FastDoubleNum = useMemo(() => {
    return doubleNum(number);
  }, [number]);

  const [theme, setTheme] = useState("dark");
  return (
    <button
      onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
      style={{
        backgroundColor: theme == "dark" ? "#333" : "#fff",
        color: theme == "dark" ? "#fff" : "#333",
      }}
    >
      Fast switch: {FastDoubleNum}
    </button>
  );
}

const doubleNum = (num) => {
  for (let i = 0; i < 1000000000; i++) {}
  return num * 2;
};

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
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <div className="card">
        <h1>useCallback() demo</h1>
        <div>
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
      </div>

      <div className="card">
        <h1>useMemo() demo</h1>

        <div>
          <SlowButton number={count} />
          <FastButton number={count} />

          <p>
            Slow switch re-initializes expensive function while fast caches the
            result with useMemo.
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
