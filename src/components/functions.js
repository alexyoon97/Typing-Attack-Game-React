export const backgroundChange = (e) => {
  if (e.target.value === e.target.name) {
    e.target.style.backgroundColor = "#4caf50";
    if (e.target.style.backgroundColor === "#4caf50") {
      return;
    }
  } else {
    if (e.target.name === " ") {
      e.target.style.backgroundColor = "#ffb74d";
    } else {
      e.target.style.backgroundColor = "#e1e1e1";
    }
  }
};
export const InputFocus = (e, iChar, iSent, inputRef, wordArray) => {
  return inputRef.current.find((input) => {
    if (e.key === "Backspace") {
      if (0 > iChar - 1) {
        return input.id === `${iSent - 1} ${wordArray[iSent - 1].length - 1}`;
      } else {
        return input.id === `${iSent} ${iChar - 1}`;
      }
    }
    if (wordArray[iSent].length - 1 <= iChar) {
      return input.id === `${iSent + 1} ${0}`;
    } else {
      return input.id === `${iSent} ${iChar + 1}`;
    }
  });
};


export const SplitSentence = (sentenceArray, sentence, setWordArray,setBInvalidStr) => {
  sentenceArray = sentence.split(" ").map((word) => word.trim().toLowerCase());
  sentenceArray = sentenceArray.map((char, index) =>
    index !== sentenceArray.length - 1 ? char + " " : char
  );
  sentenceArray = sentenceArray.map((char) => char.split(""))
  setWordArray(sentenceArray);
};
export const CheckNextRound = (inputRef,setBBtn) => {
    if(inputRef.current.every(ref=> ref.value === ref.name)){
        setBBtn(true);
    }
};
