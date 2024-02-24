import React, { useState } from "react";

const Game = () => {
  let [value, setValue] = useState();
  let [message, setMessage] = useState("");
  let isValid = value >= 0;

  return (
    <div>
      <h1 className="text-7xl text-center">Hello World!</h1>

      <label className="bg-red-200 text-3xl font-bold underline">
        Enter any number between 0 and 10 <br></br>
        <input
          type="number"
          value={value}
          className="border-2"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
      </label>
      <p>{isValid ? "The number is valid." : "The number is not valid."}</p>
      <button className="p-2 bg-black text-white rounded-md">Submit</button>
    </div>
  );
};

export default Game;
