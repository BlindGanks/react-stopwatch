"use client";
import { useEffect, useState } from "react";

// Function to convert milliseconds to hours, minutes, seconds, and milliseconds
function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;
  return { ms, secs, mins, hrs };
}

// Stopwatch component
const Stopwatch = () => {
  // State variables
  const [isRunning, setIsRunning] = useState(false); // Indicates whether the stopwatch is running or not
  const [millisPassed, setMillisPassed] = useState(0); // Total milliseconds passed
  const time = msToTime(millisPassed); // Convert milliseconds to hours, minutes, seconds, and milliseconds
  let interval;

  useEffect(() => {
    // Start or stop the stopwatch based on the 'isRunning' state
    if (isRunning) {
      // Start the interval to update milliseconds every 10 milliseconds
      interval = setInterval(() => setMillisPassed(millisPassed + 10), 10);
    }

    // Clean up the interval when the component unmounts or 'isRunning' changes
    return () => clearInterval(interval);
  }, [isRunning, millisPassed]);

  // Function to reset the timer and stop the stopwatch
  function resetTimer() {
    clearInterval(interval); // Clear the interval
    setMillisPassed(0); // Reset the milliseconds to zero
    setIsRunning(false); // Set 'isRunning' state to false
  }

  return (
    <div className="w-full max-w-3xl space-y-12">
      <div className="flex flex-row justify-between">
        <Card text="Min" time={time.mins} /> {/* Display minutes */}
        <Card text="Sec" time={time.secs} /> {/* Display seconds */}
        <Card time={time.ms / 10} /> {/* Display milliseconds */}
      </div>
      <div className="flex flex-row justify-center space-x-6">
        {/* Button to start the stopwatch */}
        <button
          className="bg-[#88F917] px-8 py-2 rounded-lg cursor-pointer hover:brightness-75 font-bold"
          onClick={() => setIsRunning(true)}
        >
          start
        </button>{" "}
        {/* Button to stop the stopwatch */}
        <button
          className="bg-[#F94017] px-8 py-2 rounded-lg cursor-pointer hover:brightness-75 font-bold"
          onClick={() => setIsRunning(false)}
        >
          stop
        </button>{" "}
        {/* Button to reset the stopwatch */}
        <button
          className="bg-[#179AF9] px-8 py-2 rounded-lg cursor-pointer hover:brightness-75 font-bold"
          onClick={resetTimer}
        >
          reset
        </button>{" "}
      </div>
    </div>
  );
};

// Card component for displaying time
const Card = ({ time, text = "" }) => (
  <div className="w-[75px] h-[68px] md:w-[115px] md:h-[108px] lg:h-[163px] lg:w-[170px] xl:h-[210px] xl:w-[233px] bg-redPrimary text-center flex flex-col justify-center text-[#F99417] bg-gray-600 rounded-md">
    <span className="block font-futura text-4xl md:text-[3.25rem] lg:text-[6.6rem] md:leading-[3rem] lg:leading-[6.25rem]">
      {time}
    </span>
    <span className="font-helvetica text-[0.5rem] md:text-[1rem] lg:text-2xl text-gray-200">
      {text}
    </span>
  </div>
);

export default Stopwatch;
