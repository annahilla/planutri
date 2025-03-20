import useOverflow from "@/hooks/useOverflow";
import { useEffect, useRef, type ReactNode } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const OverflowContainer = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    isOverflowing,
    scrollEnd,
    scrollLeft,
    handleArrowClick,
    checkOverflow,
  } = useOverflow({
    containerRef: containerRef,
  });

  useEffect(() => {
    checkOverflow();
  }, []);

  return (
    <div className="flex gap-2 justify-between items-center w-full">
      {isOverflowing && scrollLeft && (
        <button
          className="cursor-pointer"
          onClick={() => handleArrowClick("left")}
        >
          <IoIosArrowBack />
        </button>
      )}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto snap-start snap-x snap-mandatory no-scrollbar invisible-scrollbar"
      >
        {children}
      </div>
      {isOverflowing && !scrollEnd && (
        <button
          className="cursor-pointer"
          onClick={() => handleArrowClick("right")}
        >
          <IoIosArrowForward />
        </button>
      )}
    </div>
  );
};

export default OverflowContainer;
