import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <h1>Welcome to the Homepage</h1>

      {/* Rest of your homepage content */}
    </div>
  );
}

export default Home;
