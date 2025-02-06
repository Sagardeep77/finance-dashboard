import useWebSocketConnection, { ACTION } from "@/hooks/useWebsocketConnection";
import { useEffect } from "react";

export const TestComponent1 = () => {
  const { state, dispatch } = useWebSocketConnection();

  console.log("Rendering component 1", state.count);
  return (
    <div>
      <h3>Count : {state.count}</h3>

      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => {
          dispatch({ type: ACTION.INCREMENT });
        }}
      >
        increment
      </button>
    </div>
  );
};

export const TestComponent2 = () => {
//   const { state } = useWebSocketConnection();

  console.log("Rendered component 2");

  return <h2>Component 2</h2>;
};
