import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [queues, setQueues] = useState<number[][]>([[], [], [], [], []]);

  const [input, setInput] = useState("");

  function pushNumberToQueue() {
    const numberToPush = parseInt(input);
    if (numberToPush) {
      let minAmount = Infinity;
      let arrayIndex = 0;

      queues.forEach((queue, index) => {
        const sum = queue.reduce((acc, cur) => acc + cur, 0);
        if (sum < minAmount) {
          minAmount = sum;
          arrayIndex = index;
        }
      });

      setQueues((prev) => {
        return prev.map((queue, index) => {
          return index === arrayIndex ? [...queue, numberToPush] : queue;
        });
      });
    }
    setInput("");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setQueues((prev) => {
        return prev.map((queue) => {
          let firstNum = queue[0];

          if (firstNum === 1) {
            return queue.slice(1);
          }
          if (firstNum > 1) {
            return [firstNum - 1, ...queue.slice(1)];
          }

          return [];
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="input-container">
        <input
          className="queue-input"
          placeholder="Type number"
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => pushNumberToQueue()}>Add to queue</button>
      </div>
      <div className="queues-container">
        {queues.map((queue, index) => {
          return (
            <div key={index} className="queue">
              {queue.map((number, index) => (
                <p key={index}>{number}</p>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
