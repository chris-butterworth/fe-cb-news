import "./App.css";
import Contents from "./components/Contents";
import Header from "./components//HeaderBar/Header";
import { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");

  return (
    <div className="main-container">
      <Header topic={topic} setTopic={setTopic} />
      <Contents topic={topic} />
    </div>
  );
}

export default App;
