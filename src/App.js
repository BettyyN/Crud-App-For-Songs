import React from "react";
import Home from "./Components/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Edit from "./Components/edit"
import Delete from "./Components/delete";
import Update from "./Components/update";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
