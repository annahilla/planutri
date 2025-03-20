import { useEffect, useState } from "react";

interface UseOverflowProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

const useOverflow = ({ containerRef }: UseOverflowProps) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [scrollEnd, setScrollEnd] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(false);

  const checkOverflow = () => {
    const container = containerRef.current;
    if (container) {
      setIsOverflowing(container.scrollWidth > container.clientWidth);
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const isAtEnd =
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth - 1;
      setScrollEnd(isAtEnd);
      setScrollLeft(container.scrollLeft > 0);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    containerRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      containerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleArrowClick = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 200;
      const currentScroll = containerRef.current.scrollLeft;
      const targetScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      containerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return { isOverflowing, scrollEnd, scrollLeft, checkOverflow, handleArrowClick };
};

export default useOverflow;