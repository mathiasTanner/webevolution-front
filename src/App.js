import "./App.css";
import Task from "./Components/Task";
import List from "./Components/List";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">To do list</h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/list">
                Lists
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/task">
                Tasks
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/list" element={<List />} />
          <Route path="/task" element={<Task />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
