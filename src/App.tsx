import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
function genearetColor() {
  const digits = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  const color = new Array(6)
    .fill("")
    .map(() => digits[Math.floor(Math.random() * digits.length)])
    .join("");
  return `#${color}`;
}

enum Result {
  Correct,
  Wrong,
}
function App() {
  const [color, setColor] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Result | undefined | null>(undefined);

  
  function pickColor(){
    const actualColor = genearetColor();
      setColor(actualColor);
      setAnswers([actualColor,genearetColor(),genearetColor()].sort(() => 0.5 - Math.random()));
  }

  useEffect(() => {
    pickColor();
  }, []);

  function handlerAnswerClicked(answer: string) {
    if (answer === color) {
      setResult(Result.Correct);
      pickColor();
    } else {
      setResult(Result.Wrong);
    }
  }
  return (
    <div className="App">
      <div>
        
        <div className="guess-me" style={{ background: color }}></div>
        {answers.map((answer) => (
          <button onClick={() => handlerAnswerClicked(answer)} key={answer}>
            {answer}
          </button>
        ))}
        {result === Result.Wrong && <div className="wrong">Wrong</div>}
        {result === Result.Correct && <div className="correct">Correct</div>}
      </div>
    </div>
  );
}

export default App;
