// import { useState } from "react";
// import "./App.css";
// import { Routes, Route } from "react-router-dom";
// // import Navbar from "./Component/Navbar";
// import Home from "./Component/Home";
// import SignUp from "./Component/SignUp";
// import SignIn from "./Component/SignIn";
// import Navbar from "./Component/Navbar";

// function App() {
//   return (
//     <div>
//       {/* <Navbar /> */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<SignUp />} />
//         <Route path="/register" element={<SignIn />} />
//       </Routes>
//       {/* <Footer /> */}
//     </div>
//   );
// }

// export default App;

import React from "react";
import ChatWindow from "./Component/ChatWindow/ChatWindow";

function App() {
  return (
    <div className="App">
      <ChatWindow />
    </div>
  );
}

export default App;
