import React from "react";

const TimerComponent = React.memo(({ timer }) => {
  return <div>{timer}</div>;
});

export default TimerComponent;
