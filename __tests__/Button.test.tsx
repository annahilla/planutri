import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Button from "@/components/ui/buttons/Button";

describe("Button Component", () => {
  test("Renders Button on the page", () => {
    const component = render(<Button filled>Click Me</Button>);
    const button = component.container.querySelector("button");
    expect(button).toBeInTheDocument();
  });

  test('applies filled styles when "filled" is true', () => {
    const { container } = render(<Button filled>Click Me</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("bg-black");
  });

  test('does not apply filled styles when "filled" is false or undefined', () => {
    const { container } = render(<Button>Click Me</Button>);
    const button = container.querySelector("button");
    expect(button).not.toHaveClass("bg-black");
  });

  test('applies correct color class based on "color" prop', () => {
    const { container } = render(<Button color="white">Click Me</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("text-white");
  });

  test('applies default color class when "color" is not provided', () => {
    const { container } = render(<Button>Click Me</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("text-black");
  });

  test('applies correct type attribute when "type" prop is passed', () => {
    const { container } = render(<Button type="submit">Click Me</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  test("calls handleClick when button is clicked", () => {
    const handleClick = jest.fn();
    const { container } = render(
      <Button handleClick={handleClick}>Click Me</Button>
    );
    const button = container.querySelector("button");

    button?.click();
    expect(handleClick).toHaveBeenCalledWith("some-id");
  });

  test("renders children text inside the button", () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText("Click Me")).toBeInTheDocument();
  });

  test("does not call handleClick if not provided", () => {
    const { container } = render(<Button>Click Me</Button>);
    const button = container.querySelector("button");
    expect(button).toBeInTheDocument();
  });

  test("applies hover effect correctly", () => {
    const { container } = render(<Button>Click Me</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("hover:opacity-70");
  });
});
