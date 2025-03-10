import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import useClickOutside from "@/hooks/useClickOutside";
import { useRef } from "react";

describe("useClickOutside", () => {
  const callback = jest.fn();

  beforeEach(() => {
    callback.mockClear();
  });

  const TestComponent = () => {
    const ref = useRef(null!);
    useClickOutside(ref, callback);
    return <div ref={ref}>Inside</div>;
  };

  test("Call callback function when click outside the ref", () => {
    render(<TestComponent />);
    fireEvent.mouseDown(document.body);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("Don't call callback when click inside the ref", () => {
    const { getByText } = render(<TestComponent />);
    getByText("Inside").click();
    expect(callback).not.toHaveBeenCalled();
  });

  test("Don't call callback when click inside the excludeRef", () => {
    const TestComponentWithExclude = () => {
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

    const { getByText } = render(<TestComponentWithExclude />);
    getByText("Excluded").click();
    expect(callback).not.toHaveBeenCalled();
  });

  test("Delete event listener when unmount component", () => {
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");
    const { unmount } = render(<TestComponent />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
  });
});
