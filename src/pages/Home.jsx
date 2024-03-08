import { useState } from "react";
import Book from "../components/Book";
import Header from "../components/Header";
import Form from "../components/Form";
import NoData from "../components/NoData";
import { useBookContext } from "../context/BookContextProvider";

const Home = () => {
  const  {book,open,setOpen}  = useBookContext();


  return (
    <div className="p-[4rem]">
      <div className="flex gap-4 sm:gap-8 justify-center items-end sm:border-b sm:border-b-gray-800 w-[50%] m-auto">
        <Header />
      </div>
      <div className="flex mt-[2rem] justify-center lg:justify-end sm:py-4">
        <button
          className="bg-[#F6F6F6] p-3 rounded-xl border border-gray-500"
          onClick={() => setOpen(true)}
        >
          Added New Book
        </button>
      </div>
      {open && (
        <Form
        />
      )}
      <div className="flex gap-4 justify-center">
        {book?.length === 0 ? (
          <NoData />
        ) : (
          book?.map((item, index) => <Book {...item} key={index} />)
        )}
      </div>
    </div>
  );
};

export default Home;
