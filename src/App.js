import React, { useState } from "react";
import "./App.css";

const boardTypes = [
  {
    value: "",
    text: "Select a board",
  },
  {
    value: "empty",
    text: "empty",
  },
  {
    value: "random",
    text: "random",
  },
];

function App() {
  let [board, setBoard] = useState([]);
  let [boardSize, setBoardSize] = useState("20");
  const [boardType, setBoardType] = useState("");

  const changeBoardSize = (e) => setBoardSize(e.target.value);
  const chooseBoardType = (e) => setBoardType(e.target.value);

  function handleCreate(e) {
    e.preventDefault();
    fetch("http://localhost:3001/board")
      .then((res) => res.json())
      .then((result) => {
        setBoard(result);
        console.log(result);
      });
  }

  function handleRun(e) {
    e.preventDefault();
    console.log(`Clicked ${e.target.value}`);
  }

  function handlePrev(e) {
    e.preventDefault();
    console.log(`Clicked ${e.target.value}`);
  }

  function handleNext(e) {
    e.preventDefault();
    console.log(`Clicked ${e.target.value}`);
  }

  return (
    <div className="App">
      <main>
        <h1 className="title">
          <a
            href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life"
            target="_blank"
          >
            👾 Conway's Game of Life 👾
          </a>
        </h1>

        <form onSubmit={handleCreate}>
          <label for="boardSize">Size of board:</label>
          <input
            type="number"
            value={boardSize}
            onChange={changeBoardSize}
          ></input>

          <select onChange={chooseBoardType}>
            {boardTypes.map((btype) => {
              return (
                <option key={btype.value} value={btype.value}>
                  {btype.text}
                </option>
              );
            })}
          </select>

          <br />
          <br />

          <button
            className="create"
            type="submit"
            value="createGame"
            disabled={boardType.length === 0}
          >
            <span>Create Board 🆕</span>
          </button>
        </form>

        <label for="secs">Seconds/Iteration:</label>
        <input type="text"></input>

        <label for="nOfIterations"># of Iterations (0 for infinite):</label>
        <input type="text"></input>

        <br />

        <div className="controls">
          <button className="run" value="run" onClick={handleRun}>
            Run 🏃‍♂️
          </button>

          <button className="previous" value="previous" onClick={handlePrev}>
            ◀ Previous Iteration
          </button>

          <button className="next" value="next" onClick={handleNext}>
            Next Iteration ▶
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
