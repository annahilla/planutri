import { RefObject, useEffect } from "react";

const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void, excludeRef: RefObject<HTMLElement> | null = null) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            ref.current &&
            !ref.current.contains(event.target as Node) &&
            (!excludeRef || excludeRef?.current && !excludeRef.current.contains(event.target as Node))
          ) {
            callback();
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [callback, excludeRef]);
}

export default useClickOutside;