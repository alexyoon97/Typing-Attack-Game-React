import React from 'react'

const Keyboard = (props) =>{
    return(
        <div className="keyboard-container">
        {props.wordArray ? (
          props.wordArray.map((word, isent) => {
            return (
              <div key={word} className="word-row">
                {word.map((char, ichar) => {
                  if (char === " ") {
                    return (
                      <div key={isent + ichar} className="word-char space">
                        <input
                          maxLength={1}
                          ref={ props.addToRef}
                          id={`${isent} ${ichar}`}
                          onKeyUp={(e) =>  props.changeFocus(ichar, isent, e)}
                          name={char}
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={isent + ichar} className="word-char">
                      <input
                        maxLength={1}
                        ref={ props.addToRef}
                        id={`${isent} ${ichar}`}
                        name={char}
                        onKeyUp={(e) => props.changeFocus(ichar, isent, e)}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <div></div>
        )}
        <button id="btn-next" onClick={() =>  props.NextRound()} hidden={ props.bBtn?false:true}>Next</button>
      </div>
    )
}

export default Keyboard