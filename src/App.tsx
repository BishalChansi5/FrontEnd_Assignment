import React from "react";
import UserPages from "./pages/UserPages";
import { ToastContainer } from "react-toastify";
import { Form } from "formik";
import { From } from "./users/components/From";

const App = () => {
  return (
    <div>
      <UserPages />
      {/* <From /> */}
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
