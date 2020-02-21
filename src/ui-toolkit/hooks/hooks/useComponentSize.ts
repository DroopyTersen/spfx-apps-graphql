import React, { useLayoutEffect, useCallback, useState, useEffect } from "react";

function getSize(el) {
  if (!el) {
    return {
      width: 0,
      height: 0,
    };
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
}

export default function useComponentSize(ref) {
  let [componentSize, setComponentSize] = useState(getSize(ref ? ref.current : {}));

  const handleResize = useCallback(() => {
    if (ref.current) {
      setComponentSize(getSize(ref.current));
    }
  }, [ref]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref.current]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const onClicked = () => {
      let prevSize = getSize(ref.current);
      setTimeout(() => {
        let currentSize = getSize(ref.current);
        if (JSON.stringify(currentSize) !== JSON.stringify(prevSize)) {
          handleResize();
        }
      }, 300);
    };
    document.addEventListener("click", onClicked);

    return () => {
      document.removeEventListener("click", onClicked);
    };
  }, [ref.current]);

  return componentSize;
}
