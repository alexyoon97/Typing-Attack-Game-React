import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import WordScrambler from "./components/WordScrambler";
import "../src/App.css";
import Keyboard from "./Screen/keyboard";
import {
  backgroundChange,
  InputFocus,
  SplitSentence,
  CheckNextRound,
} from "./components/functions";

function App() {
  const [counter, setCounter] = useState(1);
  const [sentence, setSentence] = useState("");
  const [wordArray, setWordArray] = useState([]);
  const [bBtn, setBBtn] = useState(false);
  const [bInvalidStr, setBInvalidStr] = useState(false)
  const [score, setScore] = useState(0);
  const inputRef = useRef([]);
  let sentenceArray = "";
  let inputRefIndex = 0;

  const FetchSentenceData = () => {
    axios
      .get(`https://api.hatchways.io/assessment/sentences/${counter}`)
      .then((data) => setSentence(data.data.data.sentence))
      .then(SplitSentence(sentenceArray, sentence, setWordArray, setBInvalidStr))
      .catch((err) => console.log("Error: " + err));
      
  };

  const addToRef = (el) => {
    if (el && !inputRef.current.includes(el)) {
      inputRef.current[inputRefIndex] = el;
    }
    if (!bBtn) {
      if (inputRef.current.length) {
        inputRef.current[0].focus();
      }
    }
    inputRefIndex++;
  };
  const NextRound = (
    ) => {
      setBBtn(false);
      setCounter(counter + 1);
      setScore(score + 1);
      setSentence("");
      inputRefIndex = 0;
    };

  const changeFocus = (iChar, iSent, e) => {
    if (
      (iChar === 0 && iSent === 0 && e.key === "Backspace") ||
      (iSent === wordArray.length - 1 &&
        iChar === wordArray[wordArray.length - 1].length - 1 &&
        e.key !== "Backspace")
    ) {
      CheckNextRound(inputRef,setBBtn);
      backgroundChange(e);
      if (e.key === "Enter" && bBtn) {
        NextRound();
      }
      return;
    }

    e.target.value = "";
    if (e.key.length > 1 && e.key !== "Backspace" && e.key !== "Enter") {
      return;
    }

    //iSent = sentence index, iChar = char index since using 2D array
    if (e.key !== "Backspace") {
      e.target.value = e.key;
    } 
    else {
      InputFocus(e, iChar, iSent, inputRef, wordArray).value = "";
      InputFocus(e, iChar, iSent, inputRef, wordArray).style.backgroundColor =
        "#e1e1e1";
    }
    InputFocus(e, iChar, iSent, inputRef, wordArray).focus();
    backgroundChange(e);
  };

  useEffect(() => {
    FetchSentenceData();
  }, [sentence]);

  return (
    <div className="main-container">
      {score !== 10 && !bInvalidStr ? (
        <div>
          <WordScrambler text={sentence} setBInvalidStr={setBInvalidStr}/>
          <h3>Guess The Sentence! Starting typing</h3>
          <h3>The yellow blocks are meant for spaces</h3>
          <span>Score {score}</span>
          <Keyboard
            wordArray={wordArray}
            addToRef={addToRef}
            changeFocus={changeFocus}
            NextRound={NextRound}
            bBtn={bBtn}
          />
        </div>
      ) : (
        <div className="GameOver">{bInvalidStr ? <div>Invalid String</div>: <div>You Win!</div>}</div>
      )}
    </div>
  );
}

export default App;
