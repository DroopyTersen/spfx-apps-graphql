import { useState, useEffect } from "react";
import useInterval from "./useInterval";
import useHover from "./useHover";
import usePaging from "./usePaging";

export default function useAutoPaging(totalPages: number, delay = 5000, defaultPage = 1) {
  let { currentPage, goForward, goBack, goTo } = usePaging(totalPages, defaultPage);
  let [pageDelay, setPageDelay] = useState(delay);

  useEffect(() => {
    setPageDelay(delay);
  }, [delay]);

  useInterval(goForward, pageDelay);

  const start = () => setPageDelay(delay);
  const stop = () => setPageDelay(0);

  return {
    currentPage,
    goForward,
    goBack,
    pauseEvents: {
      onMouseEnter: stop,
      onMouseLeave: start,
    },
    startPaging: start,
    stopPaging: stop,
    goTo,
  };
}
