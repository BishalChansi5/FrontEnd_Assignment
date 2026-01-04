import React from "react";
import UserPages from "./pages/UserPages";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <UserPages />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default App;
