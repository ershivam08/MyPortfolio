import { useState } from "react";
import { countWords } from "../../utils/calculators/wordCounter";

const WordCounter = () => {
  const [text, setText] = useState("");

  const result = countWords(text);

  return (
    <div className="tool-box">
      <h3>Word Counter</h3>
      <textarea onChange={(e) => setText(e.target.value)} />
      <p>Words: {result.words}</p>
      <p>Characters: {result.characters}</p>
    </div>
  );
};

export default WordCounter;
