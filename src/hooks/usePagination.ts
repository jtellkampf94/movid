import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(1);

  const nextPage = () => setPage(prevStatePage => prevStatePage + 1);

  const previousPage = () => setPage(prevStatePage => prevStatePage - 1);

  return { nextPage, previousPage, page };
};
