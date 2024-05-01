import React from "react";
import "./Home.css";
const Home = () => {
  return (
    <div>
      <main>
        <h4>AI ChatBot App.js</h4>
        <div className="search-bar">
          <input type="text" name="search" id="search" />
          <input type="button" value="btn" />
        </div>
      </main>
    </div>
  );
};

export default Home;
