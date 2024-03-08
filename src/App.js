import { Route, Routes } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import BookContextProvider from "./context/BookContextProvider";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <BookContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Detail />} />
        </Routes>
      </BookContextProvider>
      <ToastContainer />
    </>
  );
};

export default App;
