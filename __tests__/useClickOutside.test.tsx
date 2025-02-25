import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import useClickOutside from "@/hooks/useClickOutside";
import { useRef } from "react";

describe("useClickOutside", () => {
  test("Call callback function when click outside the ref", () => {
    const callback = jest.fn();

    const TestComponent = () => {
      const ref = useRef(null!);
      useClickOutside(ref, callback);
      return <div ref={ref}>Inside</div>;
    };

    render(<TestComponent />);

    fireEvent.mouseDown(document.body);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("Don't call callback when click inside the ref", () => {
    const callback = jest.fn();

    const TestComponent = () => {
      const ref = useRef(null!);
      useClickOutside(ref, callback);
      return <div ref={ref}>Inside</div>;
    };

    const { getByText } = render(<TestComponent />);

    getByText("Inside").click();

    expect(callback).not.toHaveBeenCalled();
  });

  test("Don't call callback when click inside the excludeRef", () => {
    const callback = jest.fn();

    const TestComponent = () => {
      const ref = useRef(null!);
      const excludeRef = useRef(null!);
      useClickOutside(ref, callback, excludeRef);
      return (
        <div>
          <div ref={ref}>Inside</div>
          <div ref={excludeRef}>Excluded</div>
        </div>
      );
    };

    const { getByText } = render(<TestComponent />);

    getByText("Excluded").click();

    expect(callback).not.toHaveBeenCalled();
  });

  test("Delete event listener when unmount component", () => {
    const callback = jest.fn();
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const TestComponent = () => {
      const ref = useRef(null!);
      useClickOutside(ref, callback);
      return <div ref={ref}>Inside</div>;
    };

    const { unmount } = render(<TestComponent />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
  });
});
