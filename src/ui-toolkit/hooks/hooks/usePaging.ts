import { useState } from "react";

export default function usePaging(totalPages: number, defaultPage = 1) {
  let [currentPage, setCurrentPage] = useState(defaultPage);

  let goBack = () => {
    let newPage = currentPage - 1;
    if (newPage < 1) newPage = totalPages;
    setCurrentPage(newPage);
  };
  let goForward = () => {
    let newPage = currentPage + 1;
    if (newPage > totalPages) newPage = 1;
    setCurrentPage(newPage);
  };
  let goTo = (pageNumber: number) => {
    if (pageNumber > totalPages) pageNumber = totalPages;
    if (pageNumber < 1) pageNumber = 1;
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    goForward,
    goBack,
    goTo,
  };
}
