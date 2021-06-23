import React from "react";

const WordScrambler = (props) => {
  const res = Scramble(props.text, props.setBInvalidStr)
  
  return(
      <h1 className="Scrambled_Sentence">{res? res.map(word=> word + ' '): <div></div>}</h1>
  )
};

function Scramble(text, setBInvalidStr){
    const wordArray = text.split(" ").map((word) => word.trim().toLowerCase())
    const scrambledArray = []
    let scrambledWord = []
    let usedIndex = []
    
    if(wordArray.length > 5 || text.includes("  ")){
        return setBInvalidStr(true)
    }
    wordArray.map((word,index)=>{
        if(word.length < 2 || word.length > 15){
            if(word.length<2){
                return scrambledArray.push(word)
            }
            return setBInvalidStr(true)
        }

        let min = 1
        let max = word.length - 1

        for(var i = 0; i < word.length; i++){
            if(i === 0 || i === word.length -1){
                scrambledWord[i] = word[i]
                continue
            }

            let randomNum = parseInt(Math.random() * (max - min) + min)

            while(usedIndex.includes(randomNum)){ //randomNum === i || 
                randomNum = parseInt(Math.random() * (max - min) + min)
            }
            usedIndex.push(randomNum)
            scrambledWord[randomNum] = word[i]

        }
        scrambledArray.push(scrambledWord.join(""))
        if(index + 1 !== wordArray.length){
            scrambledArray.push(" ")
        }
        scrambledWord = []
        usedIndex = []
    })
    return scrambledArray
}
export default WordScrambler;
