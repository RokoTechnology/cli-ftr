import React from "react";
import { Link } from "react-daisyui";

function App() {
  return (
    <div className="container flex flex-col px-12 m-auto">
      <header className="flex flex-col items-center">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          color="accent"
        >
          Learn React
        </Link>
      </header>
    </div>
  );
}

export default App;
