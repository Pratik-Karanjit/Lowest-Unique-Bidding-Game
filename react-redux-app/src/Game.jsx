import React, { useState } from "react";

const Game = () => {
  let [value, setValue] = useState();
  let isValid = value >= 0 && value <= 11;

  return (
    <div>
      <label>
        Enter any number between 0 and 10 <br></br>
        <input
          type="number"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
      </label>
      <p>{isValid ? "The number is valid." : "The number is not valid."}</p>;
      <button>Submit</button>
    </div>
  );
};

export default Game;
