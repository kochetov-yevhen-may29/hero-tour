import React from "react";
import { Link } from "react-router-dom";

function App() {
  const title = "Tour of Heroes";

  return (
    <div className="flex justify-center">
      <div className="mt-4">
        <h1 className="text-4xl text-center text-sky-800 uppercase">{title}</h1>
        <nav className="flex mt-5 mx-3">
          <Link 
            className="mr-5 px-3 py-5 text-center rounded-md text-slate-50
            w-32 h-16 md:w-52 lg:w-64 bg-gray-600"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link className="px-3 py-5 text-center rounded-md text-slate-50
            w-32 h-16 md:w-52 lg:w-64 bg-gray-600" 
            to="/heroes"
          >
            Heroes
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default App;
