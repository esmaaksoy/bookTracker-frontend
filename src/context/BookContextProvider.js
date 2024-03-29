import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";
import { useNavigate } from "react-router-dom";

export const BookContext = createContext();

export const useBookContext = () => {
  return useContext(BookContext);
};

const BookContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [book, setBook] = useState([]);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState({});
  const getBook = async () => {
    try {
      const { data } = await axios("https://booktracker-65mo.onrender.com/");
      setBook(data.result.rows);
    } catch (error) {}
  };

  const postBook = async (info) => {
    try {
      await axios.post("https://booktracker-65mo.onrender.com/", info);
      getBook();
      toastSuccessNotify("Added New Book");
    } catch (error) {
      toastErrorNotify("An unexpected error occurred.");
    }
  };

  const getDetail = async (id) => {
    try {
      const { data } = await axios(`https://booktracker-65mo.onrender.com/${id}`);
      setDetail(data.result);
    } catch (error) {
      toastErrorNotify("An unexpected error occurred.");
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`https://booktracker-65mo.onrender.com/${id}`);
      toastSuccessNotify("Deleted Book");
      navigate("/");
      getBook();
    } catch (error) {
      toastErrorNotify("An unexpected error occurred.");
    }
  };
  const putBook = async (id, info) => {
    try {
      await axios.put(`https://booktracker-65mo.onrender.com/${id}`, info);
      setBook(info);
      toastSuccessNotify("Edited Book.");
      getDetail(id)
    } catch (error) {
      toastErrorNotify("An unexpected error occurred.");
    }
  };
  useEffect(() => {
    getBook();
  }, []);

  return (
    <BookContext.Provider
      value={{ book, postBook, getDetail, detail, deleteBook, putBook, open, setOpen }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
