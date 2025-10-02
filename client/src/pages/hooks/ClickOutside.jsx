import { useEffect, useRef } from "react";

export function useClickOutside(handler) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(event) {
      
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [handler]);

  return ref;
}
